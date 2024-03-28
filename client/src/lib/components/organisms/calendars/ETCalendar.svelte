<script lang="ts">
    import EtText from "$lib/components/atoms/ETText.svelte";
    import EtIcon from "$lib/components/atoms/EtIcon.svelte";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import { ChevronLeft, ChevronRight } from "svelte-hero-icons";
    import {
        generateDays,
        getCurrentMonth,
        getCurrentYear,
        getWeekDaysName,
        monthsName,
        parseDate,
        parseJsonDate,
    } from "$lib/utils/calendar";
    import { parseName } from "$lib/utils/helpers";
    import type { Size } from "../../../../types/component";

    export let textSize: Size = "md";
    export let dayNameLength: number;
    export let value = "";

    $: currentMonth = getCurrentMonth();
    $: currentYear = getCurrentYear();

    $: weekDaysNames = getWeekDaysName(
        dayNameLength ? { nameLength: dayNameLength } : {}
    );
    $: dayList = generateDays(currentMonth, currentYear);

    $: cols = [
        "col-start-1",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

    $: textSizeClass = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
    };

    const controls = [
        {
            name: "prev",
            icon: ChevronLeft,
            onClick: () => {
                if (currentMonth === 0) {
                    currentMonth = 11;
                    currentYear -= 1;
                } else {
                    currentMonth -= 1;
                }
            },
        },
        {
            name: "next",
            icon: ChevronRight,
            onClick: () => {
                if (currentMonth === 11) {
                    currentMonth = 0;
                    currentYear += 1;
                } else {
                    currentMonth += 1;
                }
            },
        },
    ];
</script>

<div class="w-auto space-y-2 p-2">
    <div class="flex justify-between items-center px-2">
        <EtText color="primary" fontWeight="semibold"
            >{monthsName[currentMonth]} {currentYear}</EtText
        >
        <div class="flex gap-2">
            {#each controls as control (control.name)}
                <EtButton
                    type="button"
                    padding="sm"
                    color="light"
                    on:click={control.onClick}
                >
                    <EtIcon
                        src={control.icon}
                        dimension="sm"
                        color="none"
                        className="text-inherit"
                    />
                </EtButton>
            {/each}
        </div>
    </div>
    <div
        class="grid grid-cols-7 text- gap-1 text-center {textSizeClass[
            textSize
        ]}"
    >
        {#each weekDaysNames as dayName, i (`${dayName}-${i}`)}
            <div class="p-2 text-inherit">
                <EtText color="primary" fontWeight="semibold"
                    >{parseName(dayName, "-")}</EtText
                >
            </div>
        {/each}

        <!-- You can dynamically generate days here -->
        {#each dayList as date (date.dateStr)}
            <button
                type="button"
                id={date.dateStr}
                class="p-1 text-inherit hover:bg-primary/10 rounded-lg {value ===
                parseDate(parseJsonDate(date))
                    ? 'bg-secondary text-white pointer-events-none'
                    : ''} {cols[date.day]}"
                on:click={() => {
                    value = parseDate(parseJsonDate(date));
                }}>{date.date}</button
            >
        {/each}

        <!-- Continue this pattern for the rest of the month -->
    </div>
    {#if value}
        <EtButton
            round="lg"
            color="secondary"
            padding="sm"
            fontSize="sm"
            on:click={() => {
                value = "";
            }}>Clear</EtButton
        >
    {/if}
</div>
