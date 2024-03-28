<script lang="ts">
    import type { Height, InputType, Round } from "../../../types/component";

    export let placeholder = "";
    export let name = "";
    export let value = "";
    export let type: InputType = "text";
    export let id = "";
    export let round: Round = "both";
    export let hasBorder = true;
    export let disabled = false;
    export let isCaretDisabled = false;
    export let className = "";

    $: roundClass = {
        left: "rounded-l-lg",
        right: "rounded-r-lg",
        none: "rounded-none",
        both: "rounded-lg",
    };
</script>

<input
    {placeholder}
    bind:value
    {id}
    {name}
    {...{ type }}
    class="{hasBorder ? 'border' : ''} {isCaretDisabled
        ? 'caret-transparent'
        : ''} text-sm w-full p-1 px-2 h-10 {roundClass[
        round
    ]} focus:outline focus:outline-primary outline-2 text-primary {className}"
    on:input
    on:focus
    on:blur
    on:click
    on:keydown
    autocomplete="off"
    {disabled}
/>
