<script lang="ts">
    import { onMount } from 'svelte';
	import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom';

	import Base from './Base.svelte';

	let {
		children = undefined,
        placement = 'bottom-start',
		open = $bindable(false),
		...restProps
	} = $props();

	let element: any = $state(null);

	let baseProps = $derived({
		restProps,
		name: 'tooltip',
		css: {
			open,
		}
	});

	async function positionTooltip() {
        if (!element) return;

		const togglerElement = element.previousElementSibling
		
		if (!togglerElement) return;

		// Compute the position
		const { x, y } = await computePosition(togglerElement, element, {
			placement,
			middleware: [offset(8), flip(), shift()],
		});

		// Apply the styles
		Object.assign(element.style, {
			position: 'absolute',
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	function onMouseLeave(e) {
        open = false;
		// if (!element?.contains(e.target as Node) && !element.previousElementSibling?.contains(e.target as Node)) {
		// 	open = false;
		// }
	}
	function onMouseEnter(e) {
        open = true;
	}

	onMount(() => {
		if (!element) return;

        const togglerElement = element.previousElementSibling;

        if(!togglerElement) return;

		// Auto-update positioning on resize/scroll
		const cleanup = autoUpdate(togglerElement, element, positionTooltip);

        togglerElement.addEventListener('mouseenter', onMouseEnter)
		togglerElement.addEventListener('mouseleave', onMouseLeave);

		return () => {
			cleanup();
			togglerElement.removeEventListener('mouseleave', onMouseLeave);
            togglerElement.removeEventListener('mouseenter', onMouseEnter)
		};
	});
</script>

<Base bind:element {baseProps}>
    {@render children()}
</Base>