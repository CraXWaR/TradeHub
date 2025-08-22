const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 text-gray-800">
            <div className="text-center py-20">
                <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform duration-300">
                    🚀 TradeHub Marketplace
                </h1>   
                <p className="text-xl mb-10 text-gray-700 max-w-2xl mx-auto leading-relaxed">
                    Welcome to TradeHub - your premier destination to buy, sell and discover unique products with style. 
                    Join our community of traders and start your marketplace journey today.
                </p>

                <div className="flex justify-center gap-6 mb-12">
                    <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold rounded-full shadow-lg hover:from-orange-600 hover:to-red-600 hover:scale-105 transition transform duration-300 hover:shadow-xl">
                        Get Started
                    </button>
                    <button className="px-8 py-3 border-2 border-orange-400 text-orange-600 text-lg font-bold rounded-full shadow-lg hover:bg-orange-400 hover:text-white hover:scale-105 transition transform duration-300 hover:shadow-xl">
                        Learn More
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 px-6">
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-200">
                        <div className="text-3xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Join Community</h3>
                        <p className="text-gray-600">Register and become part of our growing marketplace community.</p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-200">
                        <div className="text-3xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">List Products</h3>
                        <p className="text-gray-600">Create and showcase your products to thousands of potential buyers.</p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-200">
                        <div className="text-3xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Discover Items</h3>
                        <p className="text-gray-600">Browse through our diverse collection of unique products and services.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
