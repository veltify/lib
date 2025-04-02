<script>
	import {invalidateAll} from '$app/navigation'
	import {Modal, ModalContent } from 'veltify'
	import { page } from '$app/state';
	
	let { open = $bindable(), onsubmit, onclose = () => {}, id, action = '' } = $props();

	async function handleSubmit(e)
	{
		if(onsubmit) {
			onsubmit()
		} else {
			e.preventDefault()

			const formData = new FormData();

			formData.set('mode', 'remove')
			formData.set('value', JSON.stringify({id}))

			const res = await fetch(page.url.pathname, {
				method: "POST",
				body: formData
			}).then(res => res.json())
			open = false;
			invalidateAll()
		}
	}
</script>

<Modal bind:open onclose={onclose} onsubmit={handleSubmit}>
	<ModalContent class="!max-w-[500px]">
		<h2 class="mb-4 text-xl font-semibold">Confirm Deletion</h2>
		<p>Are you sure you want to delete this item?</p>
		<div class="mt-6 flex justify-end gap-4">
			<button class="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400" onclick={onclose}>
				Cancel
			</button>
			<form method="POST" onsubmit={handleSubmit}>
				<input type="hidden" name="mode" value="remove" />
				<input type="hidden" name="value" value={JSON.stringify({ id })} />
				<button type="submit" class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					Delete
				</button>
			</form>
		</div>
	</ModalContent>
</Modal>
