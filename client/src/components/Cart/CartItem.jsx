import {FiTrash2} from "react-icons/fi";

export default function CartItem({item, onQtyChange, onRemove}) {
    const {title, price, quantity, image, variant} = item;

    return (
        <article className="grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-lg border bg-[var(--bg-0)] p-3">
            <img
                alt={title}
                src={image}
                className="h-24 w-24 rounded-md object-cover"
            />

            <div className="min-w-0">
                <h3 className="truncate text-[var(--text-700)]">{title}</h3>
                <p className="mt-1 text-sm text-[var(--text-500)]">{variant}</p>

                <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm text-[var(--text-500)]">Qty</label>
                    <select
                        value={quantity}
                        onChange={(e) => onQtyChange(item.id, Number(e.target.value))}
                        className="rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
                    >
                        {Array.from({length: 10}, (_, i) => i + 1).map((n) => (<option key={n} value={n}>
                                {n}
                            </option>))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
        <span className="font-semibold text-[var(--text-700)]">
          €{(price * quantity).toFixed(2)}
        </span>
                <button
                    onClick={onRemove}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all hover:bg-[var(--nav-hover-bg)] hover:text-[var(--nav-hover-text)]"
                >
                    <FiTrash2/>
                    Remove
                </button>
            </div>
        </article>);
}
