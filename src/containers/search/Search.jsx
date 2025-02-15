import React, { useState, useEffect } from "react";
import { searchUser } from "../../Api/UserApi";
import NavBar from "../../components/NavigationBar/NavBar";

const Search = () => {
    const [query, setQuery] = useState(""); // Search input
    const [results, setResults] = useState([]); // Search results
    const [loading, setLoading] = useState(false); // Loading indicator
    const [error, setError] = useState(null); // Error message

    // Fetch search results from the backend
    const fetchResults = async () => {
        if (!query.trim()) {
            // Clear results and errors if the query is empty
            setResults([]);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await searchUser(query); // Pass the query to searchUser
            setResults(response);
        } catch (err) {
            console.error("Error fetching search results:", err);
            setError("Failed to fetch search results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Debounce the API call
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchResults();
        }, 300); // 300ms debounce
        return () => clearTimeout(timer); // Clear timeout on query change
    }, [query]);

    return (
        <div className="search-container bg-gray-100">
            <NavBar />
            <div className="min-h-screen bg-gray-100 w-full justify-center py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-xl font-bold text-gray-800 mb-6 text-center mt-10">
                        Search Users
                    </h1>

                    {/* Search Input */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type to search..."
                        className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Error Message */}
                    {!loading && error && (
                        <div className="mt-4 text-center text-red-600">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">Loading...</p>
                        </div>
                    )}

                    {/* Search Results */}
                    <div className="mt-6 space-y-4">
                        {results.map((user) => (
                            <div
                                key={user.user_id}
                                className="bg-white shadow-sm rounded-lg p-4 flex items-center"
                            >
                                {/* User Image */}
                                <img
                                    src={
                                        user.userImage ||
                                        "https://via.placeholder.com/50"
                                    }
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-12 h-12 rounded-full object-cover border mr-4"
                                />

                                {/* User Info */}
                                <div>
                                    <p className="text-lg font-medium text-gray-800">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {user.caption}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* No Results */}
                        {!loading && query && results.length === 0 && (
                            <div className="mt-4 text-center text-gray-600">
                                <p>No results found for "{query}".</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
