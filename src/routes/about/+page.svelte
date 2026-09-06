<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { Card } from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>Moslem — Tentang</title>
	<meta name="description" content="Tentang aplikasi Moslem" />
</svelte:head>

<h1 class="font-serif text-2xl font-bold tracking-tight">Tentang</h1>

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
	<p class="text-sm leading-relaxed text-muted-foreground">
		Aplikasi yang dibuat oleh developer Muslim Indonesia sebagai ruang ibadah yang aman dan nyaman —
		bebas dari spyware dan iklan yang tidak pantas. Menemani keseharianmu dengan jadwal sholat dan
		bacaan Al-Qur'an.
	</p>
</Card>

<Accordion.Root type="single" collapsible class="mt-4 grid gap-2.5">
	<Accordion.Item value="misi">
		<Accordion.Trigger>Misi Kami</Accordion.Trigger>
		<Accordion.Content>
			Memberdayakan umat Muslim melalui teknologi — mempererat hubungan hamba dengan Allah
			(habluminallah) dan antar sesama (habluminannas). Saat ini Moslem fokus menyediakan jadwal
			sholat dan sumber bacaan Al-Qur'an.
		</Accordion.Content>
	</Accordion.Item>

	<Accordion.Item value="privasi">
		<Accordion.Trigger>Kebijakan Privasi</Accordion.Trigger>
		<Accordion.Content>
			Privasi adalah prioritas kami. Kami <b>tidak mengumpulkan data apa pun</b> — analitik, data
			pribadi, alamat IP, maupun GPS. Preferensi kamu (kota, tema, ukuran font, penanda bacaan)
			tersimpan hanya di perangkatmu sendiri.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>

<p class="my-10 text-center text-xs text-muted-foreground">
	Dibuat dengan <span class=" animate-pulse">❤️</span> di Indonesia oleh <a href="https://raybrilliant.my.id" target="_blank" class="text-gold">Raybrilliant</a>
</p>
