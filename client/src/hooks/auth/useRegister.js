import {useAuthForm} from "./useAuthForm";

export const useRegister = () =>
    useAuthForm({
        initialValues: {name: "", email: "", password: "", confirmPassword: ""},
        endpoint: "/api/users/register",
        makePayload: ({name, email, password}) => ({name, email, password}),
        validate: ({password, confirmPassword}) =>
            password !== confirmPassword ? "Passwords do not match" : null,
        onSuccess: (_data, {setFormData, navigate}) => {
            setFormData({name: "", email: "", password: "", confirmPassword: ""});
            setTimeout(() => {
                navigate("/login", {
                    state: {successMessage: "Account created successfully! Please log in."},
                });
            }, 1000);
        },
        successMessage: "User registered successfully!",
    });
