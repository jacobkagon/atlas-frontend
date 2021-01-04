import React, { useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import SimpleModal from "./Modal";

const USERID = localStorage.getItem("user_id")

function Search({ handleSearch, removeCountry}) {
  const [modal, changeModal] = useState(false);
  const [event, newEvent] = useState("");
  const [country, newCountry] = useState([]);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (event !== "") {
  //     fetch("http://localhost:3000/api/v1/countries", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         country_code: event,
  //       }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => console.log(data.country_code));

  //   }

  // });

  const handleModal = (event) => {
    let newData = [];
    event.preventDefault();
    changeModal(true);
    newEvent(event.target.search.value.toUpperCase());
    document.getElementsByTagName("form")[0].reset();
    fetch("http://localhost:3000/api/v1/countries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then(
        (data) =>
          (newData = data.filter((newestCountry) => {
            newCountry(country => [...country, newestCountry]);
          }))
      );
  };

  const deleteCountries = (event) => {
    let countryId = ""
    country.filter((country) =>
      country.country_code === event ? countryId = country.id : null
    )
    fetch(`http://localhost:3000/api/v1/favorites/${USERID}/${countryId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`},
    })
    removeCountry(event)
  }

  

  return (
    <div>
      {modal ? (
        <SimpleModal
          changeModal={changeModal}
          handleSearch={handleSearch}
          event={event}
          open={modal}
          deleteCountries={deleteCountries}
        />
      ) : null}
      <form onSubmit={(e) => handleModal(e)}>
        <div className="form-group">
          <label>Add or Delete Country</label>
          <input
            type="text"
            name="search"
            placeholder="Alpha-3 code"
            className="form-control"
          />
          <input type="submit" value="Search" className="btn btn-success" />
        </div>
      </form>
    </div>

    //  <SearchBar onSubmit={(event) => handleSearch(event)}>
    //  <label>Search by Country Code:</label>
    //      <input type="text" name="search"  />
    //      <input type="submit" value="Search" />
    //   </SearchBar>
  );
}

export default Search;
