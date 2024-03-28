<script lang="ts">
    import type { Height, InputType, Round } from "../../../types/component";

    export let placeholder = "";
    export let name = "";
    export let value = "";
    export let type: InputType = "text";
    export let id = "";
    export let round: Round = "both";
    export let hasBorder = true;
    export let height: Height = "xs";

    $: roundClass = {
        left: "rounded-l-lg",
        right: "rounded-r-lg",
        none: "rounded-none",
        both: "rounded-lg",
    };

    $: heightClass = {
        xs: "h-10",
        sm: "h-14",
        md: "h-20",
        lg: "h-26",
        xl: "h-40",
    };
</script>

<textarea
    {placeholder}
    bind:value
    {id}
    {name}
    {...{ type }}
    class="{hasBorder ? 'border' : ''} {heightClass[
        height
    ]} text-sm w-full p-1 px-2 {roundClass[
        round
    ]} focus:outline focus:outline-primary outline-2 text-primary resize-none"
    on:input
/>
