<script lang="ts">
    import { goto } from "$app/navigation";
    import EtText from "$lib/components/atoms/ETText.svelte";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import EtIcon from "$lib/components/atoms/EtIcon.svelte";
    import {
        getExpensesMonthsRequest,
        expensesMonth,
    } from "$lib/states/expense";
    import { parseName } from "$lib/utils/helpers";
    import { onMount } from "svelte";
    import {
        ArrowDownTray,
        ArrowTrendingUp,
        DocumentMagnifyingGlass,
    } from "svelte-hero-icons";

    onMount(async () => {
        await getExpensesMonthsRequest();
    });
</script>

<div class="divide-y">
    {#if !Object.keys($expensesMonth).length}
        <div class="flex flex-col justify-center h-96 items-center">
            <EtText size="xxxl" fontWeight="bold" color="primary">
                No Expenses
            </EtText>
            <div class="flex items-center p-4 gap-2">
                <EtIcon src={DocumentMagnifyingGlass} />
                <EtText color="light">
                    Currently you haven't added any expenses</EtText
                >
            </div>
        </div>
    {:else}
        {#each Object.keys($expensesMonth) as year (year)}
            <div class="flex flex-col gap-4 py-4">
                <div class="flex justify-between items-center pl-10 pb-2">
                    <EtText fontWeight="bold" color="primary" size="xxl"
                        >{year}</EtText
                    >
                    <div class="flex gap-2 items-center">
                        <EtButton
                            className="w-10 h-10 flex items-center justify-center"
                            color="secondary"
                            round="full"
                            width="none"
                        >
                            <EtIcon
                                src={ArrowTrendingUp}
                                dimension="sm"
                                color="light"
                            />
                        </EtButton>
                        <EtButton
                            className="w-10 h-10 flex items-center justify-center"
                            color="secondary"
                            round="full"
                            width="none"
                        >
                            <EtIcon
                                src={ArrowDownTray}
                                dimension="sm"
                                color="light"
                            />
                        </EtButton>
                    </div>
                </div>
                <div class="flex gap-2 items-center">
                    {#each $expensesMonth[year] as month (`${year}-${month}`)}
                        <EtButton
                            type="button"
                            className="h-16 w-16"
                            round="full"
                            fontSize="lg"
                            width="none"
                            color="tertiary"
                            on:click={() => goto(`/${month}/${year}`)}
                            >{parseName(month.slice(0, 3), "-").toUpperCase()}
                        </EtButton>
                    {/each}
                </div>
            </div>
        {/each}
    {/if}
</div>
