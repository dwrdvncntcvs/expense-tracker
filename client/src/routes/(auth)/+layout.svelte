<script lang="ts">
    import EtContent from "$lib/components/layouts/EtContent.svelte";
    import { page } from "$app/stores";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import { goto } from "$app/navigation";

    interface Link {
        [key: string]: {
            [key: string]: string;
        };
    }

    const links = {
        "sign-in": {
            "/forgot-password": "Forgot password?",
            "/sign-up": "Doesn't have an account yet?",
        },
        "sign-up": {
            "/sign-in": "Already have an account?",
        },
    } as Link;

    const linksKeys = Object.keys(links);
</script>

<EtContent>
    <div class="flex flex-col w-full h-full items-center justify-evenly">
        <img src="/logo/1.svg" alt="logo" class="w-56" />
        <slot />
        <div class="flex flex-col justify-center items-center">
            {#each linksKeys as lKey (lKey)}
                {#if $page.route.id?.includes(lKey)}
                    {#each Object.keys(links[lKey]) as kKey (kKey)}
                        <EtButton
                            color="light"
                            on:click={() => {
                                goto(kKey);
                            }}
                        >
                            {links[lKey][kKey]}
                        </EtButton>
                    {/each}
                {/if}
            {/each}
        </div>
    </div>
</EtContent>
