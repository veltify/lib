<script>
	import Base from './Base.svelte';
	let { value = $bindable(), rows = 5, name, ...restProps } = $props();

	let baseProps = $derived({
		name: 'textarea',
		tag: 'textarea',
		rows,
		restProps: {
			...restProps,
			name
		},
		css: {
			// size
			//
		}
	});
</script>

<Base bind:value {baseProps} />
