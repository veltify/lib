import { writable, type Writable } from "svelte/store";

function createModalStore(initial: any) {
    const {subscribe, set, update}: Writable<any> = writable(initial)

    function open(component: any, props = {}) {
        set({component, props, open: true})
    }

    function close() {
        set({component: null, props: {}, open: false})
    }

    return {
        subscribe,
        set,
        update,
        open,
        close
    }
}

export const modalStore = createModalStore({component: null, open: false, props: {}})
