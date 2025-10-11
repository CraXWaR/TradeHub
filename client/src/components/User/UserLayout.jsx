import { NavLink, Outlet } from "react-router-dom";

const basePill =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap";
const pillActive =
    "bg-gradient-to-r from-orange-500 to-red-500 text-orange-50 shadow-lg";
const pillIdle =
    "text-gray-700 hover:bg-[var(--nav-hover-bg)] hover:text-[var(--nav-hover-text)] hover:shadow-md";

const tabs = [
    { to: "/user/overview", label: "Overview" },
    { to: "/user/profile", label: "Profile" },
    { to: "/user/orders", label: "Orders" },
    { to: "/user/wishlist", label: "Wishlist" },
    { to: "/user/settings", label: "Settings" },
];

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-1)]">
            {/* Curved gradient header */}
            <header className="relative">
                <div className="bg-gradient-to-r from-orange-400/80 via-orange-500/70 to-red-500/70 text-white shadow-md rounded-b-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-white text-xl font-semibold tracking-tight">
                            User Area
                        </h1>
                        <p className="text-white/90 text-sm">
                            Manage your account, orders and preferences
                        </p>
                    </div>
                </div>

                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
                    <div className="bg-white/90 backdrop-blur-md border border-orange-200 rounded-full shadow-md">
                        <div className="flex gap-20 overflow-x-auto py-2 px-2 sm:justify-center no-scrollbar">
                            {tabs.map((t) => (
                                <NavLink
                                    key={t.to}
                                    to={t.to}
                                    className={({ isActive }) =>
                                        `${basePill} ${isActive ? pillActive : pillIdle}`
                                    }
                                >
                                    {t.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>

            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <section className="rounded-3xl border border-orange-200/70 bg-white/80 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.04),0_16px_36px_rgba(255,123,37,0.10)]">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserLayout;
