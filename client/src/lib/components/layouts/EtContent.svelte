<script lang="ts">
    import type { Width } from "../../../types/component";

    export let size: Width = "full";
    export let hasPadding = false;
    export let className = "";
    export let isHeightScreen = false;
    export let hasGap = false;

    $: widthClass = {
        xs: "w-[800px]",
        sm: "w-[800px]",
        md: "md:w-[1000px] sm:w-full",
        lg: "w-[1200px]",
        xl: "w-[1400px]",
        full: "w-full",
        none: "w-full",
    };
</script>

<div
    class="flex flex-col {hasGap ? 'gap-4' : ''} {isHeightScreen
        ? 'h-screen'
        : 'h-full'} {hasPadding ? 'px-4' : ''} {widthClass[
        size
    ]} mx-auto {className}"
>
    <slot />
</div>
