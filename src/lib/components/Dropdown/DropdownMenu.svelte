<script lang="ts">
    import { onMount } from 'svelte';
	import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom';

	import Base from '../Base.svelte';

	let {
		children = undefined,
        placement = 'bottom-start',
		autoclose = false,
		open = $bindable(false),
		...restProps
	} = $props();

	let element: any = $state(null);

	let baseProps = $derived({
		restProps,
		name: 'dropdown-menu',
		css: {
			open,
		}
	});

	async function positionDropdown() {
        if (!element) return;

		const togglerElement = element.previousElementSibling
		
		if (!togglerElement) return;

		// Compute the position
		const { x, y } = await computePosition(togglerElement, element, {
			placement,
			middleware: [offset(0), flip(), shift()],
		});

		// Apply the styles
		Object.assign(element.style, {
			position: 'absolute',
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	function onOutsideClick(e) {
		if(autoclose && element?.contains(e.target)) {
			open = false;
		}

		if (!element?.contains(e.target as Node) && !element.previousElementSibling?.contains(e.target as Node)) {
			open = false;
		}
	}
	function onTogglerClick(e) {
        open = !open;
	}

	onMount(() => {
		if (!element) return;

        const togglerElement = element.previousElementSibling;

        if(!togglerElement) return;

		// Auto-update positioning on resize/scroll
		const cleanup = autoUpdate(togglerElement, element, positionDropdown);

        togglerElement.addEventListener('click', onTogglerClick)
		document.addEventListener('click', onOutsideClick);

		return () => {
			cleanup();
			document.removeEventListener('click', onOutsideClick);
            togglerElement.removeEventListener('click', onTogglerClick)
		};
	});
</script>

<Base bind:element {baseProps}>
    {@render children()}
</Base>