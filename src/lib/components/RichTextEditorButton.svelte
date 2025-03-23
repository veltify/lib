<script>
	import Icon from "./BaseIcon.svelte";
    import icons from './richTextIcons'

    let {icon, text = '', onclick = undefined, active = false} = $props()

</script>

<button {onclick} data-active={active} data-tooltip-target="tooltip-bold" type="button" class="rich-text-editor-toolbar-button w-[32px]">
    <Icon {icons} class="!text-xl" name={icon} />
    <span class="sr-only">{text}</span>
</button>
{#if text}
    <div id="tooltip-bold" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-content transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        {text}
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
{/if}