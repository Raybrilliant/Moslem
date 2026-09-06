<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { Card } from '$lib/components/ui/card';
	import { t } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>Moslem — {t('about.title')}</title>
	<meta name="description" content={t('about.desc')} />
</svelte:head>

<h1 class="font-serif text-2xl font-bold tracking-tight">{t('about.title')}</h1>

<Card class="mt-4 px-6">
	<div class="mb-4 flex items-center gap-3">
		<span class="grid h-11 w-11 place-items-center rounded-xl bg-primary font-serif text-lg text-primary-foreground">
			✦
		</span>
		<div>
			<p class="font-serif font-bold">Moslem</p>
			<p class="text-xs text-muted-foreground">v2.0 • New Looks, New Faith</p>
		</div>
	</div>
	<p class="text-sm leading-relaxed text-muted-foreground">{t('about.body')}</p>
</Card>

<Accordion.Root type="single" collapsible class="mt-4 grid gap-2.5">
	<Accordion.Item value="misi">
		<Accordion.Trigger>{t('about.mission')}</Accordion.Trigger>
		<Accordion.Content>
			{t('about.missionBody')}
		</Accordion.Content>
	</Accordion.Item>

	<Accordion.Item value="privasi">
		<Accordion.Trigger>{t('about.privacy')}</Accordion.Trigger>
		<Accordion.Content>
			{t('about.privacyBody')}
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>

<p class="my-10 text-center text-xs text-muted-foreground">
	{t('about.madeIn')} <span class=" animate-pulse">❤️</span> di Indonesia oleh <a href="https://raybrilliant.my.id" target="_blank" class="text-gold">Raybrilliant</a>
</p>
