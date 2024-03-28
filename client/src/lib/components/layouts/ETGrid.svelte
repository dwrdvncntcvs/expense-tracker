<script lang="ts">
    import type { Column, Size } from "../../../types/component";

    type Element = "div" | "tr";

    export let element: Element = "div";
    export let col: Column = "1";
    export let gap: Size = "sm";

    const gridColsClass = {
        "1": "grid-cols-1",
        "2": "grid-cols-2",
        "3": "grid-cols-3",
        "4": "grid-cols-4",
        "5": "grid-cols-5",
        "6": "grid-cols-6",
        "7": "grid-cols-7",
        "8": "grid-cols-8",
        "9": "grid-cols-9",
        "10": "grid-cols-10",
        "11": "grid-cols-11",
        "12": "grid-cols-12",
    };

    const gapClass = {
        xs: "gap-2",
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-10",
    };
</script>

<svelte:element
    this={element}
    class="grid {gridColsClass[col]} {gapClass[gap]}"
>
    <slot />
</svelte:element>
