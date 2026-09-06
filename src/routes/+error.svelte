<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head><title>Moslem</title></svelte:head>

<div class="grid min-h-[60vh] place-content-center text-center">
	<p class="font-serif text-6xl font-bold text-primary">{page.status}</p>
	<p class="mt-3 text-muted-foreground">{page.error?.message}</p>
	<Button class="mt-6" href={resolve('/')}>Kembali ke Beranda</Button>
</div>
