<script lang="ts">
    import EtText from "$lib/components/atoms/ETText.svelte";
    import EtTextInput from "$lib/components/atoms/ETTextInput.svelte";
    import EtTextarea from "$lib/components/atoms/ETTextarea.svelte";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import EtFormControl from "$lib/components/layouts/ETFormControl.svelte";
    import EtGrid from "$lib/components/layouts/ETGrid.svelte";
    import EtGridItem from "$lib/components/layouts/ETGridItem.svelte";
    import EtModal from "$lib/components/layouts/EtModal.svelte";
    import EtCalendarInput from "$lib/components/molecules/ETCalendarInput.svelte";
    import EtGroupTextInput from "$lib/components/molecules/ETGroupTextInput.svelte";
    import EtSelect from "$lib/components/molecules/EtSelect.svelte";
    import { categories } from "$lib/states/category";
    import {
        generateExpenseMonth
    } from "$lib/states/expense";
    import endpoint, { request } from "$lib/utils/api";
    import EtAddImage from "../ETAddImage.svelte";

    $: categoryOptions = $categories.map((category) => ({
        value: category?.id,
        label: category?.name,
    }));

    let createExpenseData = {
        imageUrl: "",
        amount: "",
        description: "",
        categoryId: "",
        label: "",
        month: "",
        purchaseDate: "",
    };

    const clearCreateExpenseData = () => {
        createExpenseData = {
            imageUrl: "",
            description: "",
            amount: "",
            categoryId: "",
            label: "",
            month: "",
            purchaseDate: "",
        };
    };

    $: if (createExpenseData.purchaseDate) {
        createExpenseData.month = String(
            new Date(createExpenseData.purchaseDate).getMonth() + 1
        );
    }

    const submitExpense = async () => {
        const response = await request.post(
            endpoint.expensesEndpoint("/"),
            createExpenseData
        );

        if (response.ok) {
            const { purchaseDate } = createExpenseData;
            generateExpenseMonth(purchaseDate);
        }

        console.log("Response: ", response);
        clearCreateExpenseData();
    };
</script>

<EtModal
    name="add-expense-modal"
    title="Add Expense"
    position="end"
    close={clearCreateExpenseData}
    dimension={{ height: "full", width: "sm" }}
>
    <form class="flex flex-col gap-4" on:submit|preventDefault={submitExpense}>
        <EtGrid col="2">
            <EtGridItem col="2">
                <EtAddImage bind:imageUrl={createExpenseData["imageUrl"]} />
            </EtGridItem>
            <EtGridItem col="2">
                <EtFormControl id="label" label="Label">
                    <EtTextInput
                        id="label"
                        name="label"
                        bind:value={createExpenseData["label"]}
                    />
                </EtFormControl>
            </EtGridItem>
            <EtGridItem col="2">
                <EtFormControl id="description" label="Description">
                    <EtTextarea
                        height="xl"
                        id="description"
                        name="description"
                        bind:value={createExpenseData["description"]}
                    />
                </EtFormControl>
            </EtGridItem>
            <EtGridItem col="1">
                <EtFormControl id="categoryId" label="Category">
                    <EtSelect
                        selectOptions={categoryOptions}
                        id="categoryId"
                        name="categoryId"
                        bind:value={createExpenseData["categoryId"]}
                    />
                </EtFormControl>
            </EtGridItem>
            <EtGridItem col="1">
                <EtFormControl id="purchasedDate" label="Date of Purchase">
                    <EtCalendarInput
                        id="purchasedDate"
                        name="purchasedDate"
                        bind:value={createExpenseData["purchaseDate"]}
                    />
                </EtFormControl>
            </EtGridItem>
            <EtGridItem col="2">
                <EtFormControl id="amount" label="Price">
                    <EtGroupTextInput
                        id="amount"
                        name="amount"
                        bind:value={createExpenseData["amount"]}
                    >
                        <EtText>Php</EtText>
                    </EtGroupTextInput>
                </EtFormControl>
            </EtGridItem>
        </EtGrid>
        <EtButton color="secondary" round="xxl" type="submit">CREATE</EtButton>
    </form>
</EtModal>
