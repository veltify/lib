<script>
	let { data } = $props();

	let Component = data.component;
</script>

<svelte:head>
	<title>{data.props.title}</title>
</svelte:head>
<div class="html">
    <Component {...data.props} />
</div>
