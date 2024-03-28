<script lang="ts">
    import { Photo, Plus, Trash } from "svelte-hero-icons";
    import EtIcon from "../atoms/EtIcon.svelte";
    import EtButton from "../atoms/EtButton.svelte";

    export let imageUrl: string | null | undefined = "";

    let fileValue: FileList | undefined = undefined;
    let fileInput: HTMLInputElement | undefined = undefined;

    $: generateBlob = () => {
        if (fileValue) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileValue[0]);

            fileReader.addEventListener("load", (e) => {
                imageUrl = e?.target?.result as any;
            });
        }
    };

    $: generateBlob();
</script>

<input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    hidden
    bind:files={fileValue}
/>

{#if !imageUrl}
    <button
        type="button"
        class="flex border-2 rounded-xl border-dashed w-full h-36 items-center justify-center"
        on:click={() => {
            fileInput?.click();
        }}
    >
        <EtIcon
            src={Plus}
            dimension="lg"
            color="none"
            className="text-gray-500"
        />
        <EtIcon
            src={Photo}
            dimension="lg"
            color="none"
            className="text-gray-500"
        />
    </button>
{:else}
    <div
        class="flex rounded-xl w-full h-36 items-center justify-center overflow-auto relative"
    >
        <EtButton
            width="none"
            round="full"
            color="failure"
            className="absolute bottom-2 right-2"
            on:click={() => {
                imageUrl = null;
            }}
        >
            <EtIcon dimension="sm" color="light" src={Trash} />
        </EtButton>
        <img
            src={imageUrl}
            alt=""
            class="w-full h-full object-contain border-0"
        />
    </div>
{/if}
