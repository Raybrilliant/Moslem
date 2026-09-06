<script lang="ts">
	import {
		Bookmark,
		BookmarkCheck,
		BookOpenText,
		ChevronLeft,
		ChevronRight,
		Pause,
		Play,
		Settings2
	} from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import { getSettings, getLastRead, removeLastRead, setLastRead, setSettings } from '$lib/local';

	let { data } = $props();

	const surah = $derived(data.surah);

	let cfg = $state(getSettings());
	let saved = $state(0);
	let playing = $state(false);
	let tafsirOpen = $state(false);
	let openTafsir = $state(0);

	let audio: HTMLAudioElement | undefined;

	// Higdrasi: pakai penanda tersimpan, lalu gulir ke ayatnya
	$effect(() => {
		cfg = getSettings();
		const lr = getLastRead();
		if (lr?.surah === surah.number && lr.verse > 0) {
			saved = lr.verse;
			setTimeout(
				() =>
					document
						.getElementById(`v${lr.verse}`)
						?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
				150
			);
		}
	});

	// Hentikan audio saat pindah halaman
	$effect(() => {
		return () => {
			audio?.pause();
			playing = false;
		};
	});

	function saveCfg() {
		setSettings(cfg);
	}

	function toggleAudio() {
		if (!audio) {
			audio = new Audio(
				`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surah.number}.mp3`
			);
			audio.onended = () => (playing = false);
		}
		if (playing) {
			audio.pause();
			playing = false;
		} else {
			audio.play();
			playing = true;
		}
	}

	function toggleSave(verse: number) {
		if (saved === verse) {
			saved = 0;
			if (getLastRead()?.surah === surah.number) removeLastRead();
		} else {
			saved = verse;
			setLastRead({ surah: surah.number, verse });
		}
	}

	function openTafsirOf(verse: number) {
		openTafsir = verse;
		tafsirOpen = true;
	}

	const tafsirText = $derived(
		surah.verses.find((v) => v.number.inSurah === openTafsir)?.tafsir.id.short ?? ''
	);

	// Angka Arab-Indic untuk penanda ayat, seperti mushaf cetak
	const arabNum = (n: number) => n.toLocaleString('ar-EG');
</script>

<svelte:head>
	<title>Moslem — Surah {surah.name.transliteration.id}</title>
	<meta
		name="description"
		content="Surah {surah.name.transliteration.id} ({surah.name.translation.id}) beserta terjemahan dan tafsir"
	/>
</svelte:head>

<!-- Bilah atas lengket -->
<div
	class="sticky top-[57px] z-30 -mx-4 mb-4 border-b border-border bg-background px-4 py-2"
>
	<div class="flex items-center justify-between">
		<Button variant="ghost" size="icon" href={resolve('/quran')} aria-label="Kembali ke daftar surah">
			<ChevronLeft />
		</Button>
		<p class="truncate px-2 font-serif text-sm font-semibold">{surah.name.transliteration.id}</p>
		<Drawer.Root>
			<Drawer.Trigger
				class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
				aria-label="Pengaturan baca"
			>
				<Settings2 size={18} />
			</Drawer.Trigger>
			<Drawer.Content>
				<div class="mx-auto w-full max-w-md px-4 pb-6">
					<Drawer.Header class="text-left">
						<Drawer.Title class="font-serif text-lg font-bold">Pengaturan Baca</Drawer.Title>
						<Drawer.Description>
							Matikan terjemahan untuk mode mushaf (baca menyambung kanan ke kiri).
						</Drawer.Description>
					</Drawer.Header>
					<div class="grid gap-5 px-1">
						<div>
							<div class="mb-3 flex items-center justify-between text-sm">
								<span class="font-medium">Ukuran font Arab</span>
								<span class="tabular-nums text-muted-foreground">{cfg.fontSize}px</span>
							</div>
							<Slider
								value={[cfg.fontSize]}
								onValueChange={(v) => {
									cfg.fontSize = v[0] ?? cfg.fontSize;
									saveCfg();
								}}
								min={18}
								max={48}
								step={1}
								ariaLabel="Ukuran font Arab"
							/>
						</div>
						<Separator />
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium">Terjemahan</span>
							<Switch
								checked={cfg.translation}
								onCheckedChange={(v) => {
									cfg.translation = v;
									saveCfg();
								}}
							/>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium">Transliterasi</span>
							<Switch
								checked={cfg.transliteration}
								onCheckedChange={(v) => {
									cfg.transliteration = v;
									saveCfg();
								}}
							/>
						</div>
					</div>
				</div>
			</Drawer.Content>
		</Drawer.Root>
	</div>
</div>

<!-- Kartu judul: hijau + ilustrasi masjid, seperti versi awal -->
<Card class="pattern-star gap-0 relative overflow-hidden bg-primary p-6 text-primary-foreground">
	<img
		src="/mosque.png"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute bottom-0 right-0 h-28 w-auto opacity-90"
	/>
	<div class="relative">
		<p class="font-arab text-4xl leading-snug">{surah.name.short}</p>
		<p class="mt-2 font-serif text-xl font-bold tracking-tight">{surah.name.transliteration.id}</p>
		<p class="text-sm opacity-80">{surah.name.translation.id}</p>
		<div class="mt-4 flex flex-wrap items-center gap-2">
			<Badge class="border-white/20 bg-white/15 text-primary-foreground">{surah.numberOfVerses} ayat</Badge>
			<Badge class="border-white/20 bg-white/15 text-primary-foreground">{surah.revelation.id}</Badge>
			<Button size="sm" variant="secondary" onclick={toggleAudio}>
				{#if playing}<Pause />{:else}<Play />{/if}
				{playing ? 'Berhenti' : 'Putar Audio'}
			</Button>
		</div>
	</div>
</Card>

<!-- Bismillah -->
{#if surah.number !== 1 && surah.number !== 9}
	<p class="font-arab my-7 text-center text-3xl">﷽</p>
{/if}

{#if cfg.translation}
	<!-- Mode terjemahan: kartu per ayat -->
	<div class="mt-7 grid gap-3">
	{#each surah.verses as a (a.number.inQuran)}
		{@const n = a.number.inSurah}
		<Card size="sm" class="gap-3 p-5" id="v{n}">
			<div class="flex items-center justify-between">
				<Badge variant="outline" class="h-7 rounded-lg px-2.5 text-sm font-bold text-primary">{n}</Badge>
				<div class="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon-sm"
						class="text-muted-foreground hover:text-primary"
						onclick={() => openTafsirOf(n)}
						aria-label="Lihat tafsir ayat {n}"
					>
						<BookOpenText />
					</Button>
					<Button
						variant="ghost"
						size="icon-sm"
						class={saved === n ? 'text-primary' : 'text-muted-foreground'}
						onclick={() => toggleSave(n)}
						aria-label="Tandai ayat {n}"
					>
						{#if saved === n}<BookmarkCheck />{:else}<Bookmark />{/if}
					</Button>
				</div>
			</div>

			<p class="font-uthmani text-right leading-[2]" style="font-size: {cfg.fontSize}px">
				{a.text.arab}
			</p>

			{#if cfg.transliteration}
				<p class="text-sm italic leading-relaxed text-primary">{a.text.transliteration.en}</p>
			{/if}

			{#if cfg.translation}
				<p class="leading-relaxed text-foreground/80" style="font-size: {cfg.fontSize - 8}px">
					{a.translation.id}
				</p>
			{/if}
		</Card>
	{/each}
	</div>
{:else}
	<!-- Mode mushaf: teks Arab menyambung, rata kanan-kiri seperti mushaf cetak -->
	<Card class="pattern-star relative mt-7 border-2 border-primary/15 p-6 sm:p-8">
		<p
			dir="rtl"
			class="font-uthmani text-justify leading-[2.3]"
			style="font-size: {cfg.fontSize}px"
		>
			{#each surah.verses as a (a.number.inQuran)}
				{@const n = a.number.inSurah}{a.text.arab}<button
					onclick={() => openTafsirOf(n)}
					class="mx-1.5 inline select-none whitespace-nowrap align-middle font-serif text-[0.62em]"
					style="color: var(--gold)"
					aria-label="Tafsir ayat {n}"
				>
					﴿{arabNum(n)}﴾
				</button>
{/each}
		</p>
	</Card>
{/if}

<!-- Navigasi surah -->
<nav class="mt-5 flex gap-3">
	{#if surah.number > 1}
		<Button variant="outline" class="flex-1" href={resolve('/surah/[id]', { id: String(surah.number - 1) })}>
			<ChevronLeft />
			Sebelumnya
		</Button>
	{:else}
		<span class="flex-1"></span>
	{/if}
	{#if surah.number < 114}
		<Button variant="outline" class="flex-1" href={resolve('/surah/[id]', { id: String(surah.number + 1) })}>
			Berikutnya
			<ChevronRight />
		</Button>
	{:else}
		<span class="flex-1"></span>
	{/if}
</nav>

<!-- Tafsir: satu drawer untuk semua ayat -->
<Drawer.Root bind:open={tafsirOpen}>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-md px-4 pb-6">
			<Drawer.Header class="text-left">
				<Drawer.Title class="font-serif text-lg font-bold">Tafsir Ayat {openTafsir}</Drawer.Title>
				<Drawer.Description>Surah {surah.name.transliteration.id}</Drawer.Description>
			</Drawer.Header>
			<p class="max-h-[50vh] overflow-y-auto px-1 text-sm leading-relaxed text-foreground/80">
				{tafsirText}
			</p>
		</div>
	</Drawer.Content>
</Drawer.Root>
