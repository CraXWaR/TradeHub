import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Button from "../User/UI/Button/Button.jsx";

export function Modal({open, onClose, title, children}) {
    const panelRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setActive(true);
                    panelRef.current?.focus();
                });
            });
        } else if (mounted) {
            setActive(false);
            const t = setTimeout(() => setMounted(false), 800);
            return () => clearTimeout(t);
        }
    }, [open, mounted]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(<div
        className={["fixed inset-0 z-50 flex items-center justify-center", "backdrop-blur-[1px] bg-black/5", "transition-opacity ease-out duration-[800ms]", active ? "opacity-100" : "opacity-0",].join(" ")}
        onClick={onClose}>
        <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className={["w-full max-w-sm rounded-lg bg-white shadow-xl", "px-6 py-5 focus:outline-none", "transform transition-all ease-out duration-[800ms]", active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",].join(" ")}>
            {title ? <h2>{title}</h2> : null}

            <div>{children}</div>

            <div className="mt-5 flex justify-end">
                <Button
                    onClick={onClose} variant={"full"} size={"md"}>
                    Okay
                </Button>
            </div>
        </div>
    </div>, document.body);
}
