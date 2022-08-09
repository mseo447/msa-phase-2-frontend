import axios from 'axios';
import { count } from 'console';
import React from 'react';
import {  useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';
import { Button } from '@mui/material';
import { padding } from '@mui/system';

function App() {

  const [countryName, setCountryName] = useState("");
  let capitalisedName = "";

  const [countryCases, setCountryCases] = useState<Number | any>("");
  const [countryRecovered, setCountryRecovered] = useState<Number | any>("");
  const [countryDeaths, setCountryDeaths] = useState<Number | any>("");

  const [searchedName, setSearchedName] = useState<String | any>("");

  const COVID_BASE_URL = "https://covid-api.mmediagroup.fr/v1";

  return (
    
    <div>
      <h1 style={{padding: "50px"}}>COVID DATA SEARCH</h1>

      <div>
        <div className="country-search" style={{ display: "flex", justifyContent: "center" }}>
          <img style={{paddingRight: "20px"}} className="spinningGlobeImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rotating_earth_animated_transparent.gif/200px-Rotating_earth_animated_transparent.gif" height="40"/>
          <TextField
            id="search-bar"
            className="country-name"
            value={countryName}
            label="Enter a Country Name"
            variant="outlined"
            size="small"
            placeholder="Search..."
            onChange={(prop) => {
              setCountryName(prop.target.value);
            }}
          />
          <Button
            onClick={() => {
              search();
            }}>
            <SearchIcon style={{ fill: "blue" }} />
          </Button>
        </div>
        
      </div>

      <div className="output" style={{textAlign: "center", padding:"50px"}}>
        {countryCases === undefined ? (
          <p>Country does not exist in database</p>
        ) : countryCases != "" ? (
          <div>
              <h3>
                {searchedName}
              </h3>
              <p>
                Confirmed Cases: {countryCases}
                <br/>
                Recovered: {countryRecovered}
                <br/>
                Deaths: {countryDeaths}
              </p>
            </div>
        ) : (
          <p></p>
        )}
      </div>

    </div>

  );
  
  function search() {
    capitalisedName = capitalise();

    if (capitalisedName === undefined || capitalisedName === "") {
      return;
    }

    axios.get(COVID_BASE_URL + "/cases?country=" + capitalisedName).then((res) => {
      setCountryCases(res.data["All"]["confirmed"]);
      setCountryRecovered(res.data["All"]["recovered"]);
      setCountryDeaths(res.data["All"]["deaths"]);
      
      setSearchedName(capitalisedName);

    })
    .catch(() => {
      setCountryCases(undefined);
      setCountryRecovered(undefined);
      setCountryDeaths(undefined);
    });

    
  }

  function capitalise() {
    let name = "";

    // Changing the first letter of user input to a capital letter, and the rest to lower case
    for (let i = 0; i < countryName.length; i++) {
      if (i == 0) {
        name = countryName.charAt(i).toUpperCase();
      } else {
        name = name + countryName.charAt(i).toLowerCase();
      }
    }

    return name;
  }
}

export default App;
