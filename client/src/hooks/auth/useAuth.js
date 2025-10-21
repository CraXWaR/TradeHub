import { useContext } from "react";
import AuthContext from "../../contex/auth-context.js";

export default function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}