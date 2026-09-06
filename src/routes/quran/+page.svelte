<script lang="ts">
	import { BookOpenText, Search } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { getLastRead, type LastRead } from '$lib/local';
	import type { SurahMeta } from '$lib/types';

	let { data } = $props();

	let q = $state('');
	let last = $state<LastRead | null>(null);

	$effect(() => {
		last = getLastRead();
	});

	const filtered = $derived.by(() => {
		const s = q.trim().toLowerCase();
		if (!s) return data.surahs;
		return data.surahs.filter(
			(x) =>
				x.name.transliteration.id.toLowerCase().includes(s) ||
				x.name.transliteration.en.toLowerCase().includes(s) ||
				x.name.translation.id.toLowerCase().includes(s) ||
				String(x.number) === s
		);
	});

	const lastSurah = $derived(last ? data.surahs[last.surah - 1] : null);
</script>

<svelte:head>
	<title>Moslem — Al-Qur'an</title>
	<meta name="description" content="Baca Al-Qur'an dengan terjemahan dan tafsir" />
</svelte:head>

<h1 class="font-serif text-2xl font-bold tracking-tight">Al-Qur'an</h1>
<p class="mt-1 text-sm text-muted-foreground">114 surah • terjemahan & tafsir Indonesia</p>

<!-- Pencarian -->
<div class="relative mt-4">
	<Search size={16} class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
	<Input
		type="search"
		bind:value={q}
		placeholder="Cari surah… (mis. Al-Kahf atau 18)"
		aria-label="Cari surah"
		class="pl-9"
	/>
</div>

<!-- Lanjutkan membaca -->
{#if lastSurah}
	<a href={resolve('/surah/[id]', { id: String(last.surah) })} class="mt-4 block">
		<Card class="pattern-star gap-0 bg-primary p-5 text-primary-foreground">
			<div class="flex items-center gap-4">
				<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
					<BookOpenText size={20} />
				</span>
				<div class="min-w-0 flex-1">
					<p class="text-xs uppercase tracking-wider opacity-75">Lanjutkan Membaca</p>
					<p class="truncate font-semibold">
						{lastSurah.name.transliteration.id} • Ayat {last!.verse}
					</p>
				</div>
				<span class="font-arab shrink-0 text-2xl opacity-90">{lastSurah.name.short}</span>
			</div>
		</Card>
	</a>
{/if}

<!-- Daftar surah -->
<div class="mt-5 grid gap-2.5">
	{#each filtered as s (s.number)}
		<a href={resolve('/surah/[id]', { id: String(s.number) })} class="min-w-0">
			<Card size="sm" class="flex-row items-center gap-4 px-4 transition-colors hover:border-primary/40">
				<span
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary"
				>
					{s.number}
				</span>
				<span class="min-w-0 flex-1">
					<span class="block truncate font-semibold">{s.name.transliteration.id}</span>
					<span class="block truncate text-xs text-muted-foreground">
						{s.name.translation.id} • {s.numberOfVerses} ayat • {s.revelation.id}
					</span>
				</span>
				<span class="font-arab shrink-0 text-xl text-primary">{s.name.short}</span>
			</Card>
		</a>
	{:else}
		<p class="py-12 text-center text-sm text-muted-foreground">Surah “{q}” tidak ditemukan.</p>
	{/each}
</div>
