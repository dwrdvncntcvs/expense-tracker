<script lang="ts">
    import { ChevronDown, ChevronUp } from "svelte-hero-icons";
    import type { SelectOption } from "../../../types/component";
    import EtTextInput from "../atoms/ETTextInput.svelte";
    import EtIcon from "../atoms/EtIcon.svelte";
    import EtText from "../atoms/ETText.svelte";

    export let id = "";
    export let name = "";
    export let value: string = "";
    export let placeholder = "";

    export let selectOptions: SelectOption[] = [];

    let isSelectOpen = false;
</script>

<div class="relative">
    <div
        class="flex bg-inherit border rounded-lg w-full {isSelectOpen
            ? 'outline-primary outline outline-2'
            : ''}"
    >
        <EtTextInput
            round="left"
            hasBorder={false}
            {id}
            {name}
            value={selectOptions.find((val) => val.value === value)?.label}
            {placeholder}
            on:click={() => {
                isSelectOpen = !isSelectOpen;
            }}
            on:keydown={(e) => {
                e.preventDefault();
                return false;
            }}
            isCaretDisabled
            className="!outline-none cursor-pointer text"
        />
        <div class="px-4 self-center">
            <EtIcon
                src={isSelectOpen ? ChevronUp : ChevronDown}
                dimension="sm"
            />
        </div>
    </div>
    {#if isSelectOpen}
        <div
            class="absolute max-h-64 flex flex-col bg-white rounded-lg border mt-2 w-full overflow-y-auto"
        >
            {#each selectOptions as so, i (i)}
                <button
                    class="p-3 px-4 text-start hover:bg-primary/10"
                    on:click={() => {
                        value = so.value;
                        isSelectOpen = false;
                    }}
                >
                    <EtText size="sm">{so.label}</EtText>
                </button>
            {/each}
        </div>
    {/if}
</div>
