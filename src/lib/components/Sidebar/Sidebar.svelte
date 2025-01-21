<script>
	import Base from "../Base.svelte";

    let {children, variant, ...restProps} = $props();

    let baseProps = $derived({
        restProps,
        name: 'sidebar',
        css: {
            variant
        }
    })
</script>

<Base {baseProps}>
    {@render children()}
</Base>