<script>
    import { addModal } from "$lib/states/modal";
    import { Plus } from "svelte-hero-icons";
    import EtButton from "../atoms/EtButton.svelte";
    import EtIcon from "../atoms/EtIcon.svelte";
</script>

<div class="fixed right-20 bottom-10">
    <EtButton
        width="none"
        className="w-20 h-20 flex items-center justify-center"
        round="full"
        on:click={() => {
            addModal("add-expense-modal", {});
        }}
    >
        <EtIcon src={Plus} dimension="lg" color="light" />
    </EtButton>
</div>
