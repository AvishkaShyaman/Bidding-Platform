import React, { useContext, useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import vehicleContext from "../../context/VehicleContext/vehicle-context";

const Search = () => {
  const { filtered, filterVehicles, clearFilter } = useContext(vehicleContext);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (filtered === null) {
      setSearch("");
    }
  }, [filtered]);

  const onChange = (e) => {
    if (e !== "") {
      setSearch(e);
      filterVehicles(e);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <form action="">
        <SearchBar
          placeholder="Search Vehicles ..."
          type="text"
          value={search}
          autoFocus
          onChange={onChange}
        />
      </form>
    </div>
  )
}

export default Search
