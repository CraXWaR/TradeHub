import {useState} from "react";

export const useFormHandler = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({type: "", text: ""});

    // reset message quickly
    const resetMessage = () => setMessage({type: "", text: ""});

    // helper for artificial delay
    const withMinDelay = async (promise, minDelay = 1500) => {
        const start = Date.now();
        const result = await promise;
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minDelay - elapsed);

        if (remaining > 0) {
            await new Promise((resolve) => setTimeout(resolve, remaining));
        }

        return result;
    };

    return {loading, setLoading, message, setMessage, resetMessage, withMinDelay};
};
