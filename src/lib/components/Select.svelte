<script>
	import Base from './Base.svelte';

	let { multiple = false, children, name, value = $bindable(undefined), ...restProps } = $props();

	let baseProps = $derived({
		name: 'select',
		tag: 'select',
		multiple,
		restProps: {
            ...restProps,
			name
		},
		css: {
			//
		}
	});
</script>

<Base bind:value {baseProps}>
	{@render children()}
</Base>
