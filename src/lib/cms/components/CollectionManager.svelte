<script lang="ts">
	import { Button } from 'veltify';
	import Icon from '../../components/BaseIcon.svelte';
	import DeleteConfirm from './DeleteConfirm.svelte';
	import PageHeader from './PageHeader.svelte';
	import DynamicForm from './DynamicForm.svelte';
	import DynamicTable from './DynamicTable.svelte';

	import { fly } from 'svelte/transition';

	let { data, form, fields }: any = $props();
	let config = $derived(data.config);

	let mode: any = $state(data.config.type == 'form' ? 'update' : 'list');

	let confirmOpen = $state(false);
	let current: any = $state(data.config.type == 'form' ? data.value : null);

	const icons = {
		lucideCirclePlus:
			'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8m-4-4v8"/></g></svg>'
	};

	function openDeleteConfirm(item: any) {
		current = item;
		confirmOpen = true;
	}

	function onclose() {
		confirmOpen = false;
		current = null;
	}

	function onsubmit(e) {
		if (!e.data.errors && data.config.type != 'form') {
			mode = 'list';
		}
	}

	let value = $state(form?.body ?? data.value ?? {});

	$effect(() => {
		value = form?.body ?? data.value ?? {};
	});

	let onback = data.config.type === 'form' ? undefined : () => {
		mode = 'list'
	}

	function openEdit(item: any) {
		current = item;
		mode = 'update';
	}

	function openInsert() {
		current = {};
		mode = 'insert';
	}
</script>

<div class="relative w-full" in:fly={{ y: 20 }}>
	{#if mode === 'list'}
		<div
			class="absolute inset-0"
			in:fly={{ x: -20, duration: 201 }}
			out:fly={{ x: -20, duration: 201 }}
		>
			<PageHeader title={config.plural}>
				<Button variant="primary" onclick={() => openInsert()}>
					<Icon {icons} name="lucideCirclePlus" />
					Add New {config.singular}
				</Button>
			</PageHeader>

			<DynamicTable {fields} context={data.context} items={data.items} {config}>
				{#snippet empty()}
					<!-- <img src="/icons/empty-state.svg" alt="No data" class="mb-4 h-24 w-24" /> -->
					<h2 class="text-content/80 text-xl font-semibold">No records found</h2>
					<p class="text-muted mt-2 mb-6 text-sm">
						It seems there is no data available. Click "Add New {config.singular}" to create a new
						record.
					</p>
					<Button onclick={() => openInsert()}>
						<Icon name="lucideCirclePlus" />
						Add New {config.singular}
					</Button>
				{/snippet}
				{#snippet actions(item)}
					<Button variant="secondary" onclick={() => openEdit(item)}>Edit</Button>
					<Button variant="destructive" onclick={() => openDeleteConfirm(item)}>Delete</Button>
				{/snippet}
			</DynamicTable>

			<DeleteConfirm bind:open={confirmOpen} id={current?.id} {onclose} />
		</div>
	{:else}
		<div
			class="absolute inset-0"
			in:fly={{ x: 20, duration: 201 }}
			out:fly={{ x: 20, duration: 201 }}
		>
			{#if mode == 'insert'}
				<PageHeader {onback} title="Add New {config.singular}" />
			{:else}
				<PageHeader {onback} title="Update {config.singular}" />
			{/if}
			<DynamicForm
				config={{
					fields: config.fields,
					form: config.form,
					context: data.context
				}}
				{fields}
				onsuccess={onsubmit}
				oncancel={onback}
				bind:value={current}
				errors={form?.errors}
				{mode}
			/>
		</div>
	{/if}
	<div class="h-12"></div>
</div>
