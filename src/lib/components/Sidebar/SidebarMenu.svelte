<script>
	import Base from "../Base.svelte";

    let {children, ...restProps} = $props();

    let baseProps = $derived({
        restProps,
        name: 'sidebar-menu',
        tag: 'ul',
        css: {
            //
        }
    })
</script>

<Base {baseProps}>
    {@render children()}
</Base>
