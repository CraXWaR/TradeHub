import { useState, useEffect } from 'react';
import DisplayUser from './DisplayUser';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const startTime = Date.now();

            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 2000 - elapsedTime);

            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            if (data.success) {
                setUsers(data.data);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                <span className="ml-2 text-green-400">Loading users...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong>Error:</strong> {error}
                <button
                    onClick={fetchUsers}
                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-6 py-4 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-green-400">
                        Users ({users.length})
                    </h2>
                </div>

                <div className="p-6">
                    {users.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <p className="text-lg">No users found</p>
                            <p className="text-sm mt-2">Add some users to your database to see them here</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {users.map((user) => (
                                <DisplayUser key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-gray-700 bg-gray-750 rounded-b-lg">
                    <button
                        onClick={fetchUsers}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                    >
                        Refresh Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersList;