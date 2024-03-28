<script lang="ts">
    import { Calendar } from "svelte-hero-icons";
    import EtTextInput from "../atoms/ETTextInput.svelte";
    import EtIcon from "../atoms/EtIcon.svelte";
    import EtCalendar from "../organisms/calendars/ETCalendar.svelte";
    import { generateJsonDate, monthsName } from "$lib/utils/calendar";
    import { parseName } from "$lib/utils/helpers";
    import EtButton from "../atoms/EtButton.svelte";

    export let id = "";
    export let name = "";
    export let value: string = "";
    export let placeholder = "";

    $: parsedValue = generateJsonDate(new Date(value));

    $: if (parsedValue) {
        isCalendar = false;
    }

    let isCalendar = false;
</script>

<div class="relative">
    <div
        class="flex bg-inherit border rounded-lg w-full {isCalendar
            ? 'outline-primary outline outline-2'
            : ''}"
    >
        <EtTextInput
            round="left"
            hasBorder={false}
            {id}
            {name}
            value={parsedValue?.monthName
                ? `${parseName(parsedValue?.monthName, "-")} ${parsedValue?.date}, ${parsedValue?.year}`
                : ""}
            {placeholder}
            on:click={() => {
                isCalendar = !isCalendar;
            }}
            on:keydown={(e) => {
                e.preventDefault();
                return false;
            }}
            isCaretDisabled
            className="!outline-none cursor-pointer text"
        />
        <div class="px-4 self-center">
            <EtIcon src={Calendar} dimension="sm" />
        </div>
    </div>
    {#if isCalendar}
        <div
            class="absolute max-h-auto w-64 right-0 flex flex-col bg-white rounded-lg border mt-2 overflow-y-auto"
        >
            <EtCalendar bind:value textSize="xs" dayNameLength={1} />
        </div>
    {/if}
</div>
