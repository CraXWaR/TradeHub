// import './App.css'

function App() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400">
            <div className="text-center animate-fade-in-up">
                <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300">
                    🚀 TradeHub Marketplace
                </h1>
                <p className="text-xl mb-10 opacity-90">
                    Buy, sell and discover unique products with style.
                </p>

                <div className="flex justify-center gap-6">
                    <button className="px-8 py-3 bg-white text-indigo-600 text-lg font-bold rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition transform duration-300">
                        Get Started
                    </button>
                    <button className="px-8 py-3 border-2 border-white text-white text-lg font-bold rounded-full shadow-lg hover:bg-white hover:text-indigo-600 hover:scale-105 transition transform duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App
