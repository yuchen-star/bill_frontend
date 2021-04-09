import React from "react";

const SearchBox = ({ value, onChange }) => {
    return (
        <input
            type="text"
            name="query"
            className="form-control my-3"
            placeholder="搜索···"
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        />
    );
};

export default SearchBox;
