<script>
	const { active = false, href, name } = $props();
</script>

<li class="">
	<a {href} data-active={active} class="p-2 inline-block hover:underline hover:bg-base-300/50 data-[active=true]:bg-base-300 rounded w-full">
		{name}
	</a>
</li>
