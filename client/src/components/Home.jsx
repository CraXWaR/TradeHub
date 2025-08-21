const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400">
            <div className="text-center py-20">
                <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300">
                    🚀 TradeHub Marketplace
                </h1>   
                <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                    Welcome to TradeHub - your premier destination to buy, sell and discover unique products with style. 
                    Join our community of traders and start your marketplace journey today.
                </p>

                <div className="flex justify-center gap-6 mb-12">
                    <button className="px-8 py-3 bg-green-500 text-white text-lg font-bold rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition transform duration-300">
                        Get Started
                    </button>
                    <button className="px-8 py-3 border-2 border-green-400 text-green-400 text-lg font-bold rounded-full shadow-lg hover:bg-green-400 hover:text-gray-900 hover:scale-105 transition transform duration-300">
                        Learn More
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 px-6">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-3xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold mb-2">Join Community</h3>
                        <p className="text-gray-300">Register and become part of our growing marketplace community.</p>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-3xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-2">List Products</h3>
                        <p className="text-gray-300">Create and showcase your products to thousands of potential buyers.</p>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-3xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold mb-2">Discover Items</h3>
                        <p className="text-gray-300">Browse through our diverse collection of unique products and services.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
