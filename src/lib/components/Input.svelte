<script>
	import Base from './Base.svelte';
	let { value = $bindable(), autocomplete = 'off', name, ...restProps } = $props();

	let baseProps = $derived({
		name: 'input',
		tag: 'input',
		autocomplete,
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
