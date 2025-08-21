import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/users', label: 'Users' },
        { path: '/create', label: 'Create Product' },
        { path: '/register', label: 'Register' },
    ];

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-green-400 text-xl font-bold">
                            🚀 TradeHub
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    location.pathname === item.path
                                        ? 'bg-green-500 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
