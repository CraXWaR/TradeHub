import {useContext} from "react";
import AuthContext from "../../contex/auth-context.js";

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthContex>");
    return ctx;
}
