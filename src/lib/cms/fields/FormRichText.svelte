<script lang="ts">
	import {RichTextEditor} from "$lib";

	let { value = $bindable(), halfWidth = false, name, field, error } = $props();
</script>

<div class="flex flex-col col-span-2 {halfWidth ? 'sm:col-span-1' : ``}">
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="block text-sm font-medium text-content/80">
		{field.label}

		{#if field.required}
			<span class=" text-red-500">*</span>
		{/if}
    </label>

    <RichTextEditor bind:value/>
    
	<span class="h-4 pt-0.5 text-xs text-red-500">{error || ''}</span>
</div>
