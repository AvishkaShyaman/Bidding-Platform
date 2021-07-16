import React from 'react'
import SearchBar from "material-ui-search-bar";

const Search = () => {

  const onChange = (e) => {
    if (e !== "") {
    } else {
    }
  };

  return (
    <div>
      <form action="">
        <SearchBar
          placeholder="Search Vehicles ..."
          type="text"
          value={''}
          autoFocus
          onChange={onChange}
        />
      </form>
    </div>
  )
}

export default Search
