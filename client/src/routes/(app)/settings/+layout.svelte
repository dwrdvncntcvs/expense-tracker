<script lang="ts">
    import { afterNavigate, goto } from "$app/navigation";
    import { page } from "$app/stores";
    import EtText from "$lib/components/atoms/ETText.svelte";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import EtIcon from "$lib/components/atoms/EtIcon.svelte";
    import EtContent from "$lib/components/layouts/EtContent.svelte";
    import { parseName } from "$lib/utils/helpers";
    import { onMount } from "svelte";
    import {
        LockClosed,
        Tag,
        Trash,
        User,
        type IconSource,
    } from "svelte-hero-icons";
    import type { Color } from "../../../types/component";

    interface SettingsNav {
        slug: string;
        icon: IconSource;
        subTitle?: string;
        color: Color;
        onClick?: () => void;
    }

    let activeNav: string = "";

    const setActiveNav = () => {
        let pathname = $page.url.pathname.split("/");
        let slug = pathname[pathname.length - 1];
        if (slug !== "settings") activeNav = slug;
    };

    onMount(() => {
        setActiveNav();
    });

    afterNavigate(() => {
        setActiveNav();
    });

    const settingsNav: SettingsNav[] = [
        {
            slug: "user",
            icon: User,
            color: "primary",
        },
        {
            slug: "privacy",
            icon: LockClosed,
            color: "primary",
        },
        {
            slug: "categories",
            icon: Tag,
            color: "primary",
        },
        {
            slug: "delete-account",
            icon: Trash,
            subTitle: "(Everything)",
            color: "failure",
            onClick: () => {
                console.log("Delete User");
            },
        },
    ];

    $: if (activeNav) {
        goto(`/settings/${activeNav}`);
    }

    const setActiveLink = (slug: string) => (e: MouseEvent) => {
        activeNav = slug;
    };

    $: isActive = (slug: string) => slug === activeNav;
</script>

<div class="flex h-full">
    <nav class="flex flex-col w-96 h-full gap-2">
        <EtText color="primary" size="xl" fontWeight="bold">Settings</EtText>
        <ul>
            {#each settingsNav as sn (sn.slug)}
                <li>
                    <EtButton
                        className="flex gap-2 {sn.color === 'failure'
                            ? 'hover:bg-failure/5'
                            : 'hover:bg-gray-900/5'}"
                        padding="md"
                        color="light"
                        round="xl"
                        on:click={sn.onClick
                            ? sn.onClick
                            : setActiveLink(sn.slug)}
                    >
                        <EtIcon
                            src={sn.icon}
                            solid={isActive(sn.slug)}
                            dimension="sm"
                            color={sn.color}
                        />
                        <EtText
                            size="md"
                            fontWeight={isActive(sn.slug)
                                ? "extrabold"
                                : "normal"}
                            color={sn.color}
                            >{parseName(sn.slug, "-")}
                            {#if sn.subTitle}
                                <span class="text-gray-500 text-xs">
                                    {sn.subTitle}
                                </span>
                            {/if}
                        </EtText>
                    </EtButton>
                </li>
            {/each}
        </ul>
    </nav>

    <EtContent size="full" hasGap hasPadding>
        <slot />
    </EtContent>
</div>
