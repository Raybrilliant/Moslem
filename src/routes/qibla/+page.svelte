<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { getCity } from '$lib/local';

	const KAABA = { lat: 21.4225, lon: 39.8262 };

	let locating = $state(true);
	let located = $state(false);
	let lat = $state(0);
	let lon = $state(0);
	let heading = $state<number | null>(null);
	let denied = $state(false);
	let listening = false;

	// Arah kiblat: bearing lingkaran besar ke Ka'bah, 0° = utara sejati
	const bearing = $derived.by(() => {
		const f1 = (lat * Math.PI) / 180;
		const f2 = (KAABA.lat * Math.PI) / 180;
		const dl = ((KAABA.lon - lon) * Math.PI) / 180;
		const y = Math.sin(dl);
		const x = Math.cos(f1) * Math.tan(f2) - Math.sin(f1) * Math.cos(dl);
		return (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
	});

	const distance = $derived.by(() => {
		const R = 6371;
		const dLat = ((KAABA.lat - lat) * Math.PI) / 180;
		const dLon = ((KAABA.lon - lon) * Math.PI) / 180;
		const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos((lat * Math.PI) / 180) *
				Math.cos((KAABA.lat * Math.PI) / 180) *
				Math.sin(dLon / 2) ** 2;
		return Math.round(2 * R * Math.asin(Math.sqrt(a)));
	});

	function onOrient(e: DeviceOrientationEvent & { webkitCompassHeading?: number }) {
		const h = e.webkitCompassHeading ?? (e.alpha !== null ? 360 - e.alpha : null);
		if (h !== null) heading = h;
	}

	function listen() {
		if (listening) return;
		listening = true;
		addEventListener('deviceorientationabsolute', onOrient);
		addEventListener('deviceorientation', onOrient);
	}

	// Presisi penuh: magnetometer absolut (heading dari quaternion ENU)
	type AOSCtor = new (opts: { frequency: number }) => {
		quaternion: number[];
		addEventListener: (t: string, cb: () => void) => void;
		start: () => void;
	};
	let aos: InstanceType<AOSCtor> | null = null;

	function onReading() {
		if (!aos) return;
		const [w, x, y, z] = aos.quaternion;
		// Heading = arah sisi atas ponsel terhadap utara magnet (jam dinding)
		const h =
			(Math.atan2(2 * (x * y - w * z), 1 - 2 * (y * y + z * z)) * 180) / Math.PI;
		heading = (h + 360) % 360;
	}

	function startAbsolute(): boolean {
		if (listening) return true;
		const AOS = (
			globalThis as { AbsoluteOrientationSensor?: AOSCtor }
		).AbsoluteOrientationSensor;
		if (!AOS) return false;
		aos = new AOS({ frequency: 30 });
		aos.addEventListener('reading', onReading);
		aos.addEventListener('error', listen); // sensor gagal -> fallback
		aos.start();
		listening = true;
		return true;
	}

	async function enableCompass() {
		const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
		if (D.requestPermission) {
			// iOS wajib gesture pengguna untuk minta izin sensor
			if ((await D.requestPermission()) !== 'granted') {
				denied = true;
				return;
			}
			listen();
			return;
		}
		startAbsolute() || listen();
	}

	$effect(() => {
		if (typeof DeviceOrientationEvent === 'undefined' && !('AbsoluteOrientationSensor' in globalThis))
			return;
		const D = DeviceOrientationEvent as unknown as { requestPermission?: unknown };
		if (!D.requestPermission) startAbsolute() || listen(); // Android & desktop: tanpa izin
	});

	$effect(() => {
		if (!('geolocation' in navigator)) {
			locating = false;
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				lat = pos.coords.latitude;
				lon = pos.coords.longitude;
				locating = false;
				located = true;
			},
			async () => {
				// Lokasi ditolak: geocode kota tersimpan sebagai cadangan
				const c = getCity();
				if (c) {
					try {
						const r = await fetch(
							`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(c)}&format=json&limit=1`
						);
						const j = await r.json();
						if (j[0]) {
							lat = +j[0].lat;
							lon = +j[0].lon;
							located = true;
						}
					} catch {}
				}
				locating = false;
			},
			{ timeout: 10_000 }
		);
	});

	// Selisih sudut ponsel vs kiblat < 5° dianggap tepat
	const aligned = $derived(
		heading !== null && Math.abs(((bearing - heading + 180) % 360) - 180) < 5
	);
</script>

<svelte:head>
	<title>Moslem — Kompas Kiblat</title>
	<meta name="description" content="Kompas arah kiblat berbasis lokasi dan sensor ponsel" />
</svelte:head>

<Card class="gap-0 overflow-hidden p-0">
	<div class="pattern-star bg-primary px-5 py-4 text-primary-foreground">
		<p class="font-serif text-lg font-bold">Kompas Kiblat</p>
		<p class="mt-1 text-xs opacity-80">Hadapkan ponsel hingga panah emas menunjuk ke atas</p>
	</div>

	<div class="flex flex-col items-center gap-5 py-8">
		{#if locating}
			<Skeleton class="size-64 rounded-full" />
			<Skeleton class="h-4 w-40" />
		{:else if !located}
			<p class="max-w-xs text-center text-sm text-muted-foreground">
				Tidak bisa menentukan lokasi. Izinkan akses lokasi, lalu muat ulang halaman.
			</p>
		{:else}
			<!-- Kompas -->
			<div class="relative size-64 sm:size-72">
				<!-- Penanda arah hadap ponsel (sisi atas) -->
				<div
					class="absolute left-1/2 top-0 z-10 -translate-x-1/2 border-x-[9px] border-b-[16px] border-x-transparent border-b-gold drop-shadow"
				></div>
				<div
					class="pattern-star absolute inset-2 rounded-full border-2 bg-card transition-all duration-500 {aligned
						? 'border-gold shadow-[0_0_35px_-5px_var(--gold)]'
						: 'border-border'}"
				>
					<!-- Piringan berputar mengikuti arah utara -->
					<svg
						viewBox="-100 -100 200 200"
						class="absolute inset-0 h-full w-full"
						style="transform: rotate({-(heading ?? 0)}deg)"
					>
						<!-- Tick tiap 5°: kardinal emas, mayor 45°, minor 5° -->
						{#each Array(72) as _, i (i)}
							{@const major = i % 9 === 0}
							{@const card = i % 18 === 0}
							<line
								y1={-94}
								y2={card ? -80 : major ? -84 : -89}
								transform="rotate({i * 5})"
								stroke={card ? 'var(--gold)' : 'currentColor'}
								stroke-opacity={card ? 0.95 : major ? 0.45 : 0.18}
								stroke-width={card ? 2.4 : major ? 1.6 : 1}
							/>
						{/each}

						<!-- Huruf arah -->
						<text
							y="-68"
							text-anchor="middle"
							dominant-baseline="central"
							class="fill-gold font-serif text-[13px] font-bold"
						>
							U
						</text>
						<text
							x="68"
							text-anchor="middle"
							dominant-baseline="central"
							class="fill-current font-serif text-[13px] font-bold opacity-60"
						>
							T
						</text>
						<text
							y="68"
							text-anchor="middle"
							dominant-baseline="central"
							class="fill-current font-serif text-[13px] font-bold opacity-60"
						>
							S
						</text>
						<text
							x="-68"
							text-anchor="middle"
							dominant-baseline="central"
							class="fill-current font-serif text-[13px] font-bold opacity-60"
						>
							B
						</text>

						<!-- Kubah kaaba di pusat piringan -->
						<!-- Jarum kiblat: belah ketupat emas + ekor redup -->
						<g transform="rotate({bearing})">
							<polygon points="0,-88 6,0 0,12 -6,0" fill="var(--gold)" />
							<polygon points="0,52 6,0 0,12 -6,0" fill="currentColor" fill-opacity="0.22" />
							<circle cy="-88" r="3" fill="var(--gold)" />
						</g>

						<!-- Poros -->
						<circle r="6.5" fill="var(--gold)" />
						<circle r="2.5" fill="var(--card)" />

						<!-- Kubah kaaba di pusat, paling atas -->
						<circle r="16" fill="var(--card)" fill-opacity="0.9" />
						<text font-size="17" y="6" text-anchor="middle">🕋</text>
					</svg>
				</div>
			</div>

			{#if heading === null}
				{#if denied}
					<p class="text-sm text-muted-foreground">Izin sensor kompas ditolak.</p>
				{/if}
				<Button onclick={enableCompass}>Aktifkan Kompas</Button>
			{:else if aligned}
				<Badge>✓ Anda menghadap kiblat</Badge>
			{/if}

			<p class="text-sm text-muted-foreground">
				{#if heading !== null}Hadap {Math.round(heading)}° ·{/if}
				Kiblat {Math.round(bearing)}° · {distance} km ke Ka'bah
			</p>
		{/if}
	</div>
</Card>
