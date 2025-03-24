<script>
	import Base from "../Base.svelte";

    let {children, ...restProps} = $props();

    let baseProps = $derived({
        restProps,
        tag: 'li',
        name: 'carousel-item',
        class: 'glide__slide',
        css: {
            //
        }
    })
</script>

<Base {baseProps}>
    {@render children()}
</Base>
