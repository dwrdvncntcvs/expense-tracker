<script lang="ts">
    import { textColors } from "$lib/variables";
    import { Icon } from "svelte-hero-icons";
    import type { IconSource } from "svelte-hero-icons";
    import type { Color } from "../../../types/component";

    type IconDimension = "default" | "sm" | "lg";

    export let src: IconSource;
    export let size = "";
    export let dimension: IconDimension = "default";
    export let solid = false;
    export let className = "";

    export let color: Color = "primary";

    $: dimensionClass = {
        default: "w-6 h-6",
        sm: "w-5 h-5",
        lg: "w-8 h-8",
    };
</script>

<Icon
    {src}
    {size}
    class="{dimensionClass[dimension]} {textColors[color]} {className}"
    {solid}
/>
