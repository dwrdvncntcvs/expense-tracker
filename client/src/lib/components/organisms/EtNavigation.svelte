<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { IconSource } from "svelte-hero-icons";
    import { Cog8Tooth, Home, PlusCircle, UserCircle } from "svelte-hero-icons";
    import EtButton from "../atoms/EtButton.svelte";
    import EtIcon from "../atoms/EtIcon.svelte";
    import EtButtonMenu from "./EtButtonMenu.svelte";
    import type { ButtonMenuOption } from "../../../types/button";
    import { addModal } from "$lib/states/modal";

    interface Navigation {
        name: string;
        type: "button" | "link" | "dropdown";
        icon: IconSource;
        onClick?: () => void;
        options?: ButtonMenuOption[];
    }

    const navigationList: Navigation[] = [
        {
            name: "add",
            type: "button",
            icon: PlusCircle,
            onClick: () => {
                addModal("add-expense-modal", {});
            },
        },
        {
            name: "home",
            icon: Home,
            type: "link",
            onClick: () => {
                goto("/home");
            },
        },
        {
            name: "settings",
            icon: Cog8Tooth,
            type: "link",
            onClick: () => {
                goto("/settings");
            },
        },
        {
            name: "profile",
            type: "dropdown",
            icon: UserCircle,
            options: [
                {
                    label: "View Profile",
                    onClick: () => {
                        goto("/profile");
                    },
                },
                {
                    label: "Sign Out",
                    onClick: () => {
                        console.log("Sign Out");
                    },
                },
            ],
        },
    ];
</script>

<div class="sticky top-0 h-16 flex items-center justify-between bg-white">
    <img src="/logo/1.svg" alt="" class="w-14 h-14" />
    <div class="flex gap-4">
        {#each navigationList as nl, i (i)}
            {#if nl.type === "link"}
                <EtButton on:click={nl.onClick} color="light">
                    <EtIcon
                        src={nl.icon}
                        solid={$page.route.id?.includes(nl?.name)}
                    />
                </EtButton>
            {/if}
            {#if nl.type === "button"}
                <EtButton on:click={nl.onClick} color="light">
                    <EtIcon
                        src={nl.icon}
                        solid={$page.route.id?.includes(nl?.name)}
                    />
                </EtButton>
            {/if}
            {#if nl.type === "dropdown"}
                <EtButtonMenu options={nl.options}>
                    <EtIcon
                        src={nl.icon}
                        solid={$page.route.id?.includes(nl?.name)}
                    />
                </EtButtonMenu>
            {/if}
        {/each}
    </div>
</div>
