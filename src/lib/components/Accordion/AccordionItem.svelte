<script>
	import Base from '../Base.svelte';

	let { children, title, open = $bindable(false), ...restProps } = $props();

	let baseProps = $derived({
		restProps,
		name: 'accordion-item',
		css: {
			//
		}
	});

	function toggle() {
		open = !open;
	}
</script>

<Base {baseProps}>
	<Base baseProps={{ type: 'button', onclick: toggle, name: 'accordion-item-header' }}>
		<span class="text-lg">{title}</span>
		<svg
			class="h-3 w-3 transform transition-transform duration-300"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 10 6"
			class:rotate-180={open}
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 5 5 1 1 5"
			/>
		</svg>
	</Base>

	<Base baseProps={{ name: 'accordion-item-body', css: { open } }}>
		{@render children()}
	</Base>
</Base>
