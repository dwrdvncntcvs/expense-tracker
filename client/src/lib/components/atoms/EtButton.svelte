<script lang="ts">
    import type {
        ButtonRound,
        ButtonType,
        Color,
        ColorClass,
        Size,
        Width,
    } from "../../../types/component";

    export let type: ButtonType = "button";
    export let padding: Size = "sm";
    export let round: ButtonRound = "sm";
    export let color: Color = "primary";
    export let fontSize: Size = "sm";
    export let width: Width = "full";
    export let className = "";

    $: paddingClass = {
        xs: "p-1",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-10",
    };

    $: roundClass = {
        xs: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        xxxl: "rounded-3xl",
        full: "rounded-full",
    };

    $: colorClass = {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        tertiary: "bg-tertiary text-white hover:bg-tertiary/90",
        quaternary: "bg-quaternary text-black hover:bg-quaternary/90",
        success: "bg-success text-black hover:bg-success/90",
        failure: "bg-failure text-white hover:bg-failure/90",
        light: "text-primary",
    } as ColorClass;

    $: fontSizeClass = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    };

    $: widthClass = {
        none: "",
        xs: "w-20",
        sm: "w-32",
        md: "w-40",
        lg: "w-52",
        xl: "w-72",
        full: "w-full",
    };
</script>

<button
    {...{ type }}
    class="{colorClass[color]} {widthClass[width]} {paddingClass[
        padding
    ]} {roundClass[round]} {fontSizeClass[fontSize]} {className}"
    on:click
>
    <slot />
</button>
