<script lang="ts">
    import EtTextInput from "../atoms/ETTextInput.svelte";
    import type { IconSource } from "svelte-hero-icons";
    import type { InputType } from "../../../types/component";
    import EtIcon from "../atoms/EtIcon.svelte";

    interface ButtonProp {
        has: boolean;
        label?: string;
        icon?: IconSource;
        onClick?: () => void;
    }

    export let buttonOpts: ButtonProp = { has: false };
    export let value = "";
    export let name = "";
    export let placeholder = "";
    export let type: InputType = "text";
    export let id = "";
    export let isInputRounded = true;
</script>

<div class="flex bg-inherit border rounded-lg w-full">
    <div class="flex items-center px-4">
        <slot />
    </div>
    <EtTextInput
        hasBorder={false}
        bind:value
        {placeholder}
        {id}
        {name}
        {type}
        on:input
        round={isInputRounded ? "right" : "none"}
    />
    {#if buttonOpts?.has}
        <button
            on:click={buttonOpts?.onClick}
            class="flex items-center px-2"
            type="button"
        >
            {#if buttonOpts?.icon}
                <EtIcon src={buttonOpts?.icon} size="20" dimension="sm" />
            {/if}
            {#if buttonOpts?.label}
                <p>{buttonOpts?.label}</p>
            {/if}
        </button>
    {/if}
</div>
