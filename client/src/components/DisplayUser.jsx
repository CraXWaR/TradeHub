const DisplayUser = ({ user }) => {
    return (
        <div
            key={user.id}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200"
        >
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                    <p className="text-gray-400 text-xs mt-1">
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}


export default DisplayUser;