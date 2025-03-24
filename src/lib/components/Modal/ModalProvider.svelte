<script>
	import { modalStore } from "../../index";
	import Modal from "./Modal.svelte";

</script>

<Modal bind:open={$modalStore.open}>
    {#if $modalStore.component}
        {@const Component = $modalStore.component}
        <Component {...$modalStore.props}/>
    {/if}
</Modal>