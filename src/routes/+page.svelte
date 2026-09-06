<script lang="ts">
	import { slide } from 'svelte/transition';
	import { MapPin, Pencil } from '@lucide/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { getCity, setCity } from '$lib/local';
	import { syncPush } from '$lib/adzan';
	import { i18n, locale, t } from '$lib/i18n.svelte';

	type PrayerKey = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

	const PRAYERS: { key: PrayerKey }[] = [
		{ key: 'Fajr' },
		{ key: 'Sunrise' },
		{ key: 'Dhuhr' },
		{ key: 'Asr' },
		{ key: 'Maghrib' },
		{ key: 'Isha' }
	];

	let city = $state('Malang');
	let cityInput = $state('');
	let editing = $state(false);
	let ready = $state(false);
	let loading = $state(true);
	let failed = $state(false);
	let timings = $state<Record<PrayerKey, string> | null>(null);
	let hijri = $state('');
	let now = $state(new Date());

	$effect(() => {
		const t = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(t);
	});

	// Hydration: kota tersimpan, atau minta lokasi perangkat sekali di awal
	$effect(() => {
		const saved = getCity();
		if (saved) {
			city = saved;
			ready = true;
		} else if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					const c = await reverseCity(pos.coords.latitude, pos.coords.longitude);
					city = c ?? city;
					setCity(city);
					ready = true;
					syncPush(); // kota baru: sinkron subscription push
				},
				() => (ready = true), // ditolak: pakai kota default + input manual
				{ timeout: 10_000 }
			);
		} else {
			ready = true;
		}
	});

	$effect(() => {
		if (ready) load(city);
	});

	async function load(c: string) {
		loading = true;
		failed = false;
		try {
			const res = await fetch(
				`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(c)}&country=Indonesia&method=20`
			);
			const json = await res.json();
			if (json.code !== 200) throw new Error(json.status ?? 'gagal');
			timings = json.data.timings;
			hijri = `${json.data.date.hijri.day} ${json.data.date.hijri.month.en} ${json.data.date.hijri.year}H`;
		} catch {
			failed = true;
		}
		loading = false;
	}

	async function reverseCity(lat: number, lon: number) {
		try {
			const r = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=id`
			);
			const j = await r.json();
			return j.address?.city ?? j.address?.county ?? j.address?.state_district ?? null;
		} catch {
			return null;
		}
	}

	function saveCity(e: SubmitEvent) {
		e.preventDefault();
		const c = cityInput.trim();
		if (!c) return;
		city = c;
		setCity(c);
		editing = false;
		syncPush();
	}

	const list = $derived(
		timings ? PRAYERS.map((p) => ({ ...p, time: timings![p.key], label: t(`p.${p.key}`) })) : []
	);

	const next = $derived.by(() => {
		if (!list.length) return null;
		const h = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
		for (const p of list) {
			const [hh, mm] = p.time.split(':').map(Number);
			if (hh + mm / 60 > h) return p;
		}
		return list[0]; // semua sudah lewat -> hitung Subuh besok
	});

	const countdown = $derived.by(() => {
		if (!next) return '--:--:--';
		const [hh, mm] = next.time.split(':').map(Number);
		const target = new Date(now);
		target.setHours(hh, mm, 0, 0);
		if (target <= now) target.setDate(target.getDate() + 1);
		const diff = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${pad(Math.floor(diff / 3600))}:${pad(Math.floor((diff % 3600) / 60))}:${pad(diff % 60)}`;
	});

	const today = $derived(
		now.toLocaleDateString(locale(), {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);

	// Suasana ilustrasi mengikuti waktu sholat aktual:
	// subuh gelap, terbit agak terang, dzuhur terang, ashar senja, maghrib–isya gelap
	const scene = $derived.by(() => {
		if (!timings) return null;
		const h = now.getHours() * 60 + now.getMinutes();
		const at = (k: PrayerKey) => {
			const [hh, mm] = timings[k].split(':').map(Number);
			return hh * 60 + mm;
		};
		if (h < at('Fajr')) return { src: '/night.png', filter: '', label: t('scene.night') };
		if (h < at('Sunrise'))
			return { src: '/night.png', filter: 'brightness(1.25)', label: t('scene.dawn') };
		if (h < at('Dhuhr'))
			return { src: '/day.png', filter: 'brightness(0.85) sepia(0.2)', label: t('scene.morning') };
		if (h < at('Asr')) return { src: '/day.png', filter: '', label: t('scene.day') };
		if (h < at('Maghrib'))
			return {
				src: '/day.png',
				filter: 'sepia(0.45) brightness(0.85) saturate(1.15)',
				label: t('scene.dusk')
			};
		if (h < at('Isha'))
			return { src: '/night.png', filter: 'brightness(1.35) sepia(0.35)', label: t('scene.maghrib') };
		return { src: '/night.png', filter: '', label: t('scene.night') };
	});
</script>

<svelte:head>
	<title>{t('home.title')}</title>
	<meta name="description" content={t('home.desc')} />
</svelte:head>

<Card class="gap-0 overflow-hidden p-0">
	<!-- Kepala hijau: sapaan & lokasi -->
	<div class="pattern-star bg-primary px-5 pb-4 pt-5 text-primary-foreground">
		<div class="flex items-start justify-between gap-3">
			<div>
				<p class="font-serif text-lg font-bold">Assalamu'alaikum</p>
				<p class="mt-1 text-xs opacity-80">{today}</p>
				<p class="text-xs opacity-80">{hijri}</p>
			</div>
			<Button
				size="sm"
				variant="outline"
				class="max-w-[45%] border-white/25 bg-white/10 px-3 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
				onclick={() => {
					cityInput = city;
					editing = !editing;
				}}
			>
				<MapPin class="shrink-0" />
				<span class="truncate">{city}</span>
				<Pencil class="shrink-0" />
			</Button>
		</div>

		{#if editing}
			<form onsubmit={saveCity} transition:slide class="mt-3 flex gap-2">
				<Input
					bind:value={cityInput}
					placeholder={t('home.cityPlaceholder')}
					aria-label="Nama kota"
					class="border-white/25 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50"
				/>
				<Button type="submit" variant="secondary">{t('home.save')}</Button>
			</form>
		{/if}
	</div>

	<!-- Ilustrasi masjid + hitung mundur -->
	<div class="flex flex-col items-center py-6">
		{#if loading}
			<Skeleton class="h-36 w-64 rounded-xl" />
			<Skeleton class="mt-4 h-3.5 w-28" />
			<Skeleton class="mt-2 h-10 w-44" />
		{:else if failed}
			<p class="my-4 text-center text-sm text-muted-foreground">
				{t('home.failed')} “{city}”.
			</p>
			<Button variant="outline" size="sm" onclick={() => load(city)}>{t('home.retry')}</Button>
		{:else}
			<img
				src={scene?.src ?? '/day.png'}
				alt="Ilustrasi masjid pada suasana {scene?.label ?? 'siang'}"
				style:filter={scene?.filter}
				style="transition: filter 1s"
				class="h-36 w-auto"
			/>
			<p class="mt-3 text-sm text-muted-foreground">{t('home.until')} {next?.label}</p>
			<p class="font-serif text-5xl font-bold tracking-tight tabular-nums">{countdown}</p>
			<p class="mt-1 text-xs text-muted-foreground">{t('home.at')} {next?.time} WIB</p>
		{/if}
	</div>

	<Separator />

	<!-- Daftar waktu sholat -->
	<div class="divide-y divide-border">
		{#if loading}
			{#each Array(6) as _, i (i)}
				<div class="flex items-center justify-between px-5 py-3.5">
					<Skeleton class="h-4 w-16" />
					<Skeleton class="h-4 w-12" />
				</div>
			{/each}
		{:else}
			{#each list as p (p.key)}
				{@const isNext = next?.key === p.key}
				<div class="flex items-center justify-between px-5 py-3.5 {isNext ? 'bg-accent' : ''}">
					<div class="flex items-center gap-2 {isNext ? 'font-semibold text-accent-foreground' : ''}">
						{p.label}
						{#if isNext}<Badge>{t('home.next')}</Badge>{/if}
					</div>
					<span class="font-medium tabular-nums">{p.time}</span>
				</div>
			{/each}
		{/if}
	</div>
</Card>
