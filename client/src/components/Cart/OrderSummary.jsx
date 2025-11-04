export default function OrderSummary({subtotal, shipping, tax, total}) {
    return (<div>
            <h2 className="mb-4 text-lg font-semibold text-[var(--text-700)]">
                Order Summary
            </h2>

            <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                    <dt className="text-[var(--text-500)]">Subtotal</dt>
                    <dd className="font-medium text-[var(--text-700)]">€{subtotal.toFixed(2)}</dd>
                </div>

                <div className="flex items-center justify-between">
                    <dt className="text-[var(--text-500)]">Shipping</dt>
                    <dd className="font-medium text-[var(--text-700)]">
                        {shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}
                    </dd>
                </div>

                <div className="flex items-center justify-between">
                    <dt className="text-[var(--text-500)]">Tax (est.)</dt>
                    <dd className="font-medium text-[var(--text-700)]">€{tax.toFixed(2)}</dd>
                </div>

                <hr className="my-3 border-dashed"/>

                <div className="flex items-center justify-between text-base">
                    <dt className="font-semibold text-[var(--text-700)]">Total</dt>
                    <dd className="font-semibold text-[var(--text-700)]">€{total.toFixed(2)}</dd>
                </div>
            </dl>

            {/* Promo (non-functional for now) */}
            <div className="mt-5">
                <label className="mb-2 block text-sm text-[var(--text-500)]">
                    Promo code
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="SUMMER10"
                        className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
                    />
                    <button
                        className="rounded-md border px-4 py-2 text-sm transition-all hover:bg-[var(--nav-hover-bg)]">
                        Apply
                    </button>
                </div>
            </div>
        </div>);
}
