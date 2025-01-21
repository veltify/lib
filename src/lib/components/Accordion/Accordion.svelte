<script>
	import Base from "../Base.svelte";

    let {children, ...restProps} = $props();

    let baseProps = $derived({
        restProps,
        name: 'accordion',
        css: {
            //
        }
    })
</script>

<Base {baseProps}>
    {@render children()}
</Base>