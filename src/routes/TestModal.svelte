<script>
	import Button from '$lib/components/Button.svelte';
	import ModalContent from '$lib/components/Modal/ModalContent.svelte';
	import { modalStore } from '$lib/stores/modal';

	let { onsubmit } = $props();
</script>

<ModalContent>
	<div>Modal opened using provider</div>
	<Button
		onclick={() => {
			onsubmit();
			modalStore.close();
		}}>Close</Button
	>
</ModalContent>
