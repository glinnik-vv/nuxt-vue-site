export default defineNuxtRouteMiddleware(async (to, from) => {
    const runtimeConfig = useRuntimeConfig();
    const refresh_token = useCookie("refresh_token");
    const access_token = useCookie("access_token");

    if (!refresh_token.value) {
        return navigateTo("/login");
    }
    if (from.name === "login") {
        return
    }
    if (to.name === "login") {
        return
    }

    try {
        const token = await $fetch(
            runtimeConfig.public.API_URL + "/api/token/refresh/",
            {
                method: "POST",
                body: {
                    refresh: refresh_token.value,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const tokenValue = token as AuthToken;
        if (!token) {
            return navigateTo("/login");
        }
        access_token.value = tokenValue?.access;

    } catch (error) {
        console.error(error);
    }
});
