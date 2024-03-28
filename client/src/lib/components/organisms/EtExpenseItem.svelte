<script lang="ts">
    import type { Expense } from "../../../types/state.d.ts";
    import EtText from "../atoms/ETText.svelte";
    import EtCard from "../layouts/EtCard.svelte";

    export let expense: Expense;
</script>

<EtCard color="secondary">
    <div class="">
        <EtText fontWeight="bold" size="lg">{expense.label}</EtText>
    </div>
    <div class="h-32">Image Should be here</div>
    <div class="flex justify-between items-center">
        <EtText
            >{expense.categoryId.slice(
                expense.categoryId.length,
                expense.categoryId.length - 4
            )}</EtText
        >
        <EtText fontWeight="bold">Php {expense.amount}</EtText>
    </div>
</EtCard>
