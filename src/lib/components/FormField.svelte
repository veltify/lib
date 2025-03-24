<script>
	import Base from './Base.svelte';
	let { label, id = $bindable('id-' + crypto.randomUUID()), error = "", required = false, children, ...restProps } = $props();

	let baseProps = $derived({
		restProps,
		name: 'form-field',
		css: {
			invalid: !!error
		}
	});
</script>

<Base {baseProps}>
    {#if label}
        <label for={id} class="form-field-label">
			{label}
			{#if required}
				<span class="text-danger">*</span>
			{/if}
		</label>
    {/if}

	{@render children()}
	{#if error}
		<span class="form-field-error">{error || ''}</span>
	{/if}
</Base>
