import React, { useState } from 'react';
import '../../styles/SearchFilter.css';
import '../../styles/fontawesome/fontawesome-free-6.7.2-web/css/all.min.css';



const SearchFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
            <div className="search-container">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search..."
                />
                  <button type="submit"><i class="fa fa-search"></i></button>
            </div>
        );
};
    
export default SearchFilter;
