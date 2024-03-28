<script lang="ts">
    import type { Color } from "../../../types/component";

    export let color: Color = "none";

    type ColorClass = {
        [key in Color]: string;
    };

    let colorClass: ColorClass = {
        failure: "bg-failure text-white",
        light: "bg-lightgray",
        none: "",
        normal: "bg-white",
        primary: "bg-primary text-white",
        quaternary: "bg-quaternary",
        secondary: "bg-secondary text-white",
        success: "bg-success",
        tertiary: "bg-tertiary",
        warning: "bg-warning",
    };
</script>

<div class="min-h-60 {colorClass[color]} bg-tertiary p-4 rounded-xl">
    <slot />
</div>
