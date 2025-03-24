<script>
    import Button from "./Button.svelte";
    import { onMount } from "svelte";
    import Icon from "./BaseIcon.svelte";

    let {local = false, value = $bindable()} = $props()
    
    const icons = {
        sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
        moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.14 2a9 9 0 1 0 9.86 9.86A7 7 0 0 1 12.14 2z"/></svg>`,
    }

    function toggleTheme() {
        value = value === 'dark' ? 'light' : 'dark'; 
        if(!local) {
            value = localStorage.theme === 'dark' ? 'light' : 'dark'; 
            localStorage.theme = value;
            document.documentElement.classList.toggle("dark", value == "dark");
        }
    }
</script>

<Button icon onclick={toggleTheme} variant="ghost">
    <span class="hidden dark:flex">
        <Icon {icons} name="sun" />
    </span>
    <span class="flex dark:hidden">
        <Icon {icons} name="moon" />
    </span>
</Button>
