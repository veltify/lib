<script lang="ts">
	const { children } = $props();
</script>

<nav>
	<ul class="grid gap-1">
		{@render children()}
	</ul>
</nav>
