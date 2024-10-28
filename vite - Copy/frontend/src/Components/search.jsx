import React, { useState } from "react";
import './search.css'; // Make sure the path is correct

const items = [
    { id: 1, name: "Temperature Sensor" },
    { id: 2, name: "Humidity Sensor" },
    { id: 3, name: "Pressure Sensor" },
    { id: 4, name: "Light Sensor" },
    { id: 5, name: "Gas Sensor" },
    { id: 6, name: "Capacitive Sensor" },
    { id: 7, name: "Lighting" },
    { id: 8, name: "Fan" },
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
            <div className="search-container">Add Manually</div>
            <form 
                className="search-form"
                onSubmit={handleSearch}
            >
                <div className="relative-container">
                    <div className="icon-container">
                        <svg
                            className="icon"
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
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="search-input"
                        placeholder="Search Devices, Sensors..."
                        required
                    />
                    <button
                        type="submit" 
                        className="search-button"
                    >
                        <svg
                            className="icon"
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
                    <ul className="suggestions-list">
                        {filteredSuggestions.map((item) => (
                            <li
                                key={item.id}
                                className="suggestion-item"
                                onClick={() => {
                                    setSearchQuery(item.name); // Set the search input to the selected suggestion
                                    setFilteredSuggestions([]); // Hide suggestions
                                    setNotFound(false); // Reset not found state
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}

                {notFound && (
                    <p className="not-found-message">
                        <strong>{finalSearchQuery}</strong> Not found
                    </p>
                )}
            </form>
            <div className="divider"><hr /></div>
        </>
    );
};

export default SearchWithSuggestions;
