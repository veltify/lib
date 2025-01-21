<script lang="ts">
    import Base from '../Base.svelte'
	import { onMount } from 'svelte';
	import '@glidejs/glide/dist/css/glide.core.min.css'

	let { breakpoints = {}, showDots = false, dotCount = 0, children = undefined, ...restProps } = $props();

	let element: HTMLDivElement | null = $state(null);
	let instance: any = $state(null);

    let baseProps: any = $derived({
        restProps,
        tag: 'div',
		name: 'carousel',
		class: 'glide',
        css: {}
    })

	onMount(() => {
		import('@glidejs/glide').then((module) => {
			instance = new module.default(element, {
				type: 'carousel',
				startAt: 0,
				autoplay: 2000,
				hoverpause: true,
				gap: 5,
				animationDuration: 400,
				animationTimingFunc: 'ease-out',
				keyboard: true,
				bound: false,
				focusAt: 'center',
				dragThreshold: 80,
				swipeThreshold: 80,
				breakpoints: {
					...breakpoints
				}
			});

			instance.mount();
		});

		return () => {
			instance.destroy();
		};
	});
</script>

<Base {baseProps} bind:element>
    <div data-glide-el="track" class="glide__track">
		<ul class="glide__slides">
			{@render children()}
		</ul>
	</div>
	{#if showDots && dotCount}
		<div class="glide__bullets" data-glide-el="controls[nav]">
			{#each Array(dotCount) as _, index}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="glide__bullet cursor-default" data-glide-dir={`=${index}`}>
				</button>
			{/each}
		</div>
	{/if}
</Base>
