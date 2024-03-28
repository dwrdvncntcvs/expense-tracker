<script>
    import EtTextInput from "$lib/components/atoms/ETTextInput.svelte";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import EtIcon from "$lib/components/atoms/EtIcon.svelte";
    import EtGrid from "$lib/components/layouts/ETGrid.svelte";
    import EtGridItem from "$lib/components/layouts/ETGridItem.svelte";
    import EtGroupTextInput from "$lib/components/molecules/ETGroupTextInput.svelte";
    import { request } from "$lib/utils/api";
    import { AtSymbol, Eye, EyeSlash, Key, User } from "svelte-hero-icons";

    let authData = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    };

    let shouldShowPassword = false;

    const handleAuthAction = async () => {
        console.log("Auth Data: ", authData);
        const data = await request.post("/users/sign-up", authData);
        console.log("Data: ", data);
    };
</script>

<form
    class="flex flex-col gap-2 items-center w-80"
    on:submit|preventDefault={handleAuthAction}
>
    <EtGrid col="2" gap="xs">
        <EtGridItem>
            <EtTextInput
                id="first_name"
                name="first_name"
                bind:value={authData["first_name"]}
                placeholder="First Name"
            />
        </EtGridItem>
        <EtGridItem>
            <EtTextInput
                id="last_name"
                name="last_name"
                bind:value={authData["last_name"]}
                placeholder="Last Name"
            />
        </EtGridItem>
        <EtGridItem col="2">
            <EtGroupTextInput
                id="email"
                name="email"
                bind:value={authData["email"]}
                placeholder="Email"
            >
                <EtIcon dimension="sm" src={AtSymbol} />
            </EtGroupTextInput>
        </EtGridItem>
        <EtGridItem col="2">
            <EtGroupTextInput
                id="username"
                name="username"
                bind:value={authData["username"]}
                placeholder="Username"
            >
                <EtIcon dimension="sm" src={User} />
            </EtGroupTextInput>
        </EtGridItem>
        <EtGridItem col="2">
            <EtGroupTextInput
                id="password"
                name="password"
                bind:value={authData["password"]}
                placeholder="Password"
                type={shouldShowPassword ? "text" : "password"}
                isInputRounded={false}
                buttonOpts={{
                    has: true,
                    icon: shouldShowPassword ? EyeSlash : Eye,
                    onClick: () => {
                        shouldShowPassword = !shouldShowPassword;
                    },
                }}
            >
                <EtIcon src={Key} dimension="sm" />
            </EtGroupTextInput>
        </EtGridItem>
    </EtGrid>
    <EtButton type="submit" round="xxxl" color="primary" width="md">
        Sign Up
    </EtButton>
</form>
