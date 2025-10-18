import {useAuthForm} from "./useAuthForm";
import {useAuth} from "../../contex/AuthContext.jsx";

export const useLogin = () => {
    const {setUser, setToken} = useAuth();

    return useAuthForm({
        initialValues: {email: "", password: ""},
        endpoint: "/api/users/login",
        makePayload: (values) => values,
        onSuccess: (data, {navigate}) => {
            const {token, role, name, email, created_at, updated_at} = data.data;

            localStorage.setItem("token", token);
            localStorage.setItem(
                "user",
                JSON.stringify({role, name, email, created_at, updated_at})
            );

            setToken(token);
            setUser({role, name, email, created_at, updated_at});

            const redirectPath =
                role === "admin"
                    ? "/admin/dashboard"
                    : "/user/profile";

            setTimeout(() => navigate(redirectPath), 1000);
        },
        successMessage: "Login successful! Redirecting...",
    });
};
