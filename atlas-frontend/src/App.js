import React, { useState, useEffect } from "react";
import HomeContainer from "./containers/HomeContainer";
import Navbar from "./containers/Navbar";
import SignIn from "./containers/LoginContainer";
import SignUp from "./containers/SignUpContainer";
import { Route } from "react-router-dom";
import Globe from "./components/Globe";
import Cover from "./components/Cover";
import FavoritesContainer from "./containers/FavoritesContainer";
import "./App.css";

const token = localStorage.getItem("token");
const USERID = localStorage.getItem("user_id")
// import { Route } from 'react-router-dom';

export default function App() {
  const [userId, changeUserId] = useState("");
  const [countries, changeCountries] = useState([]);
  const [countryId, changeCountryId] = useState("");

  const handleUser = (userData) => {
   localStorage.setItem("user_id", userData.id)
  };

  const handleSearch = (event) => {
    fetch("http://localhost:3000/api/v1/countries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country_code: event,
      }),
    })
      .then((resp) => resp.json())
      .then(
        (data) => (
          changeCountries([...countries, data.country_code]),
          changeCountryId(data.id)
        )
      );
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: USERID,
        country_id: countryId,
      }),
    })
      .then((resp) => resp.json())
      .then(data => console.log(data))
  });


  return (
    <div>
      <Route
        path="/signup"
        component={(props) => <SignUp {...props} handleUser={handleUser} />}
      />
      <Route
        path="/login"
        component={(props) => <SignIn {...props} handleUser={handleUser} />}
      />
      <Route
        path="/home"
        component={(props) => (
          <HomeContainer
            {...props}
            handleSearch={handleSearch}
            countries={countries}
          />
        )}
      />
      <Route exact path="/" component={Cover} />
      <Route exact path="/" component={Globe} />
      
      <FavoritesContainer countries={countries} changeCountries={changeCountries}/> 
      
      <Navbar />
    </div>
  );
}
