<script lang="ts">
    import type { Column } from "../../../types/component";

    export let col: Column = "1";
    export let className = "";

    const gridColsClass = {
        "1": "col-span-1",
        "2": "col-span-2",
        "3": "col-span-3",
        "4": "col-span-4",
        "5": "col-span-5",
        "6": "col-span-6",
        "7": "col-span-7",
        "8": "col-span-8",
        "9": "col-span-9",
        "10": "col-span-10",
        "11": "col-span-11",
        "12": "col-span-12",
    };
</script>

<div class="{gridColsClass[col]} {className}">
    <slot />
</div>
