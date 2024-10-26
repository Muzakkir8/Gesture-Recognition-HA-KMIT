import React, { useState } from "react";

const items = [
    { id: 1, name: "Temperature Sensor" },
    { id: 2, name: "Humidity Sensor" },
    { id: 3, name: "Pressure Sensor" },
    { id: 4, name: "Light Sensor" },
    { id: 5, name: "Gas Sensor" },
    { id: 6, name: "Capacitive Sensor" },
    { id: 7, name: "Light Sensor" },
    { id: 8, name: "Lighting" },
    { id: 9, name: "Fan" },
    { id: 100, name: "" },
];

const SearchWithSuggestions = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [finalSearchQuery, setFinalSearchQuery] = useState("");
    const [notFound, setNotFound] = useState(false); // New state for not found message

    // Handle search input onChange (show suggestions)
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setNotFound(false);

        // Filter suggestions based on input
        if (query.length > 0) {
            const suggestions = items.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSuggestions(suggestions);
        } else {
            setFilteredSuggestions([]); // Clear suggestions when input is empty
        }
    };

    // Handle search button click
    const handleSearch = (event) => {
        event.preventDefault(); // Prevent default form submission
        setFinalSearchQuery(searchQuery);
        setFilteredSuggestions([]); // Clear suggestions on search

        // Check if the search query exists in items
        const foundItem = items.find((item) => item.name.toLowerCase() === searchQuery.toLowerCase());
        setNotFound(!foundItem); // Update notFound state based on search result
    };

    return (
        <>
            <div className="font-bold opacity-90 p-1 mt-4 -mb-1 text-center dark:text-sky-50">Add Manually</div>
            <form method="post"
                className="min-w-md ml-5 lg:ml-20 md:ml-20 lg:w-[500px] md:w-[500px] mr-5 mt-3"
                onSubmit={handleSearch}
            >
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input 
                        type="search"
                        id="default-search"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="block w-full px-5 p-3 pl-10 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-grey-100 dark:placeholder-gray-400 dark:text-black focus:outline-none focus:ring-0 dark:focus:border-cyan-500 no-underline"
                        placeholder="      Search Devices, Sensors..."
                        required
                    />
                    <button
                        type="submit" 
                        className="text-white absolute right-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            className="w-4 h-4 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Show suggestions while typing */}
                {filteredSuggestions.length > 0 && (
                    <ul className="absolute min-w-md max-h-80 overflow-hidden lg:ml-20 md:ml-20 lg:w-[500px] md:w-[500px] mr-5 mt-3 bg-slate-100 border-black-950 rounded-lg">
                        {filteredSuggestions.map((item) => (
                            <li
                                key={item.id}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => {
                                    setSearchQuery(item.name); // Set the search input to the selected suggestion
                                    setFilteredSuggestions([]); // Hide suggestions
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}

                {notFound && (
                    <p className="mt-4">
                        <strong>{finalSearchQuery}</strong> Not found
                    </p>
                )}
            </form>
            <div className="mt-10  dark:bg-white opacity-20"><hr /></div>
        </>
    );
};

export default SearchWithSuggestions;