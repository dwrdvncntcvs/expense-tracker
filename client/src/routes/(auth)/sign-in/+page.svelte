<script>
    import { goto } from "$app/navigation";
    import EtButton from "$lib/components/atoms/EtButton.svelte";
    import EtIcon from "$lib/components/atoms/EtIcon.svelte";
    import EtGroupTextInput from "$lib/components/molecules/ETGroupTextInput.svelte";
    import { setUser } from "$lib/states/user";
    import { request } from "$lib/utils/api";
    import { AtSymbol, Eye, EyeSlash, Key } from "svelte-hero-icons";

    let authData = {
        email: "",
        password: "",
    };

    let shouldShowPassword = false;

    const handleAuthAction = async () => {
        const data = await request.post("/users/sign-in", authData);

        if (data.ok) {
            setUser(data.data);
            authData = {
                email: "",
                password: "",
            };
            goto("/");
        } else {
            console.log(data.data.message);
        }
    };
</script>

<form
    class="flex flex-col gap-2 items-center w-80"
    on:submit|preventDefault={handleAuthAction}
>
    <EtGroupTextInput
        type="text"
        placeholder="Email Address"
        id="email"
        name="email"
        bind:value={authData["email"]}
    >
        <EtIcon src={AtSymbol} dimension="sm" />
    </EtGroupTextInput>
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
    <EtButton type="submit" round="xxxl" color="primary" width="md">
        Sign In
    </EtButton>
</form>
