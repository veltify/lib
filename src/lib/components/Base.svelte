<script lang="ts">
	import { cls } from '$lib/helpers.js';

	let {
		element = $bindable(),
		baseProps,
		children = undefined,
		value = $bindable(undefined)
	} = $props();
	let { tag = 'div', name, css = {}, restProps = {}, ...rest } = $derived(baseProps);
	let { class: klass, ...rest2 } = $derived(restProps);
</script>

{#if tag == 'input'}
	<input bind:value bind:this={element} class={cls(name, css, klass)} {...rest} {...rest2} />
{:else if tag == 'textarea'}
	<textarea bind:value bind:this={element} class={cls(name, css, klass)} {...rest} {...rest2}>
		{value}
	</textarea>
{:else if tag == 'select'}
	<select bind:value bind:this={element} class={cls(name, css, klass)} {...rest} {...rest2}>
		{@render children?.()}
	</select>
{:else}
	<svelte:element this={tag} bind:this={element} class={cls(name, css, klass)} {...rest} {...rest2}>
		{@render children?.()}
	</svelte:element>
{/if}
