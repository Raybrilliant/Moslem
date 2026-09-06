<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { BookOpen, Compass, Home, Info, Moon, Sun } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { startAdzan } from '$lib/adzan';
	import type { Component } from 'svelte';

	let { children } = $props();

	// PWA + notifikasi adzan (sekali per muat penuh; idempotent)
	$effect(() => {
		startAdzan();
	});

	let isDark = $state(false);

	$effect(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('moslem:theme', isDark ? 'dark' : 'light');
	}

	const tabs: { href: string; label: string; icon: Component }[] = [
		{ href: '/', label: 'Sholat', icon: Home },
		{ href: '/qibla', label: 'Kiblat', icon: Compass },
		{ href: '/quran', label: "Al-Qur'an", icon: BookOpen },
		{ href: '/about', label: 'Tentang', icon: Info }
	];

	const active = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="sticky top-0 z-40 border-b border-border bg-background">
	<div class="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
		<a href={resolve('/')} class="flex items-center gap-2">
			<span class="text-lg leading-none text-gold">✦</span>
			<span class="font-serif text-xl font-bold tracking-tight">Moslem</span>
		</a>
		<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Ganti tema terang/gelap">
			{#if isDark}<Sun />{:else}<Moon />{/if}
		</Button>
	</div>
</header>

<main class="mx-auto min-h-[calc(100vh-9rem)] w-full max-w-3xl px-4 pb-28 pt-5">
	{@render children()}
</main>

<nav
	class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]"
>
	<div class="mx-auto flex w-full max-w-3xl">
		{#each tabs as tab (tab.href)}
			<a
				href={resolve(tab.href)}
				class="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors {active(tab.href)
					? 'text-primary'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				{#if active(tab.href)}
					<span class="absolute top-0 h-0.5 w-8 rounded-full bg-gold"></span>
				{/if}
				<tab.icon size={20} strokeWidth={active(tab.href) ? 2.2 : 1.75} />
				{tab.label}
			</a>
		{/each}
	</div>
</nav>
