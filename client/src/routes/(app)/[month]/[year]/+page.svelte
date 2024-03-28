<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import EtIcon from "$lib/components/atoms/EtIcon.svelte";
    import EtText from "$lib/components/atoms/ETText.svelte";
    import EtGrid from "$lib/components/layouts/ETGrid.svelte";
    import EtGridItem from "$lib/components/layouts/ETGridItem.svelte";
    import EtExpenseItem from "$lib/components/organisms/EtExpenseItem.svelte";
    import { getExpenses, setExpenses } from "$lib/states/expense";
    import endpoint, { request } from "$lib/utils/api";
    import { getMonthNumberByName, type Month } from "$lib/utils/calendar";
    import { parseName } from "$lib/utils/helpers";
    import { onMount } from "svelte";
    import { ChevronLeft } from "svelte-hero-icons";

    const { params } = $page;

    $: month = params.month;
    $: year = params.year;

    const expenses = getExpenses();

    onMount(() => {
        const getData = async () => {
            const response = await request.get(
                endpoint.expensesEndpoint(
                    `/${getMonthNumberByName(month.toUpperCase() as Month)}/${year}?page=1&limit=12`
                )
            );

            setExpenses(response.data.data.expenses.data);
        };

        getData();
    });
</script>

<div class="flex gap-4 items-center">
    <EtButton
        width="xs"
        color="normal"
        className="w-auto hover:bg-primary/10"
        fontSize="md"
        padding="xs"
        round="lg"
        type="button"
        on:click={() => {
            goto("/home");
        }}
    >
        <EtIcon src={ChevronLeft} dimension="sm" />
    </EtButton>

    <EtText fontWeight="semibold" color="primary" size="xxl">
        {parseName(month, "-")} Expenses
    </EtText>
</div>

<EtGrid col="4">
    {#each $expenses as expense}
        <EtGridItem col="1">
            <EtExpenseItem bind:expense />
        </EtGridItem>
    {/each}
</EtGrid>
