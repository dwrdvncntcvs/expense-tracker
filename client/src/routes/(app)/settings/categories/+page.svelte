<script lang="ts">
    import EtText from "$lib/components/atoms/ETText.svelte";
    import EtTextInput from "$lib/components/atoms/ETTextInput.svelte";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import EtIcon from "$lib/components/atoms/EtIcon.svelte";
    import {
        addCategory,
        categories,
        removeCategory
    } from "$lib/states/category";
    import { user } from "$lib/states/user";
    import endpoint, { request } from "$lib/utils/api";
    import { ListBullet, Plus, Tag, Trash } from "svelte-hero-icons";
    import type { CreateCategory } from "../../../../types/category";

    let createCategoryData: CreateCategory = {
        name: "",
        userId: "",
    };

    const addCategoryAction = async () => {
        const data = { ...createCategoryData, userId: $user?.id };
        const response = await request.post(
            endpoint.categoriesEndpoint(""),
            data
        );

        addCategory(response.data.data);
        createCategoryData = {
            name: "",
            userId: "",
        };
    };

    const removeCategoryAction = async (categoryId: string) => {
        const response = await request.delete(
            endpoint.categoriesEndpoint(`/${categoryId}`)
        );
        if (response.ok) removeCategory(categoryId);
    };
</script>

<div class="space-y-2">
    <EtText size="xxxl" fontWeight="bold">Categories</EtText>
    <form class="flex gap-4" on:submit|preventDefault={addCategoryAction}>
        <div class="w-4/6 flex-auto">
            <EtTextInput
                placeholder="Enter category name"
                name="name"
                id="name"
                bind:value={createCategoryData.name}
            />
        </div>
        <EtButton
            className="flex-1 flex justify-center items-center h-10"
            round="lg"
            color="secondary"
            type="submit"
        >
            <EtIcon src={Plus} dimension="sm" color="light" solid />
            <EtIcon src={Tag} dimension="sm" color="light" solid />
        </EtButton>
    </form>
</div>
<div class="space-y-2">
    <div class="flex items-center gap-3">
        <EtIcon src={ListBullet} dimension="lg" />
        <EtText size="xxl" fontWeight="bold">Category List</EtText>
    </div>

    {#if $categories.length}
        <ul>
            {#each $categories as { id, name } (id)}
                <li class="p-2 flex items-center justify-between">
                    <EtText size="md">{name}</EtText>
                    <div>
                        <EtButton
                            color="normal"
                            on:click={() => {
                                removeCategoryAction(id);
                            }}
                        >
                            <EtIcon
                                src={Trash}
                                dimension="sm"
                                color="failure"
                            />
                        </EtButton>
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <div class="w-full h-full flex justify-center items-center p-5">
            <EtText color="light">No Categories</EtText>
        </div>
    {/if}
</div>
