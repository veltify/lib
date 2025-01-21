<script>
	import Base from "../Base.svelte";

    let {active = false, href, name, icon, children, ...restProps} = $props();

    let baseProps = $derived({
        restProps,
        name: 'sidebar-item',
        tag: 'li',
        css: {
            
        }
    })
</script>

<Base {baseProps}>
    <Base baseProps={{tag: 'a', href, name: 'sidebar-item-link', css: {active}}}>
        <Base baseProps={{tag: 'span', name: 'sidebar-item-icon'}}>
            {@render icon()}
        </Base>
        <Base baseProps={{tag: 'span', name: 'sidebar-item-text'}}>{name}</Base>
    </Base>
    <!-- <button
        data-sidebar="menu-action"
        class="text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform after:absolute after:-inset-2 focus-visible:ring-2 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 md:opacity-0 after:md:hidden"
        type="button"
        id="radix-:r14:"
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis"
            ><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle
                cx="5"
                cy="12"
                r="1"
            ></circle></svg
        ><span class="sr-only">More</span></button
    > -->
</Base>