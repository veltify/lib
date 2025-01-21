<script>
	import Base from "../Base.svelte";

    let {children, ...restProps} = $props();

    let baseProps = $derived({
        restProps,
        name: 'card-body',
        css: {
            //
        }
    })
</script>

<Base {baseProps}>
    {@render children()}
</Base>