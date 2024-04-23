import React, { useState } from "react";
import axios from "axios";
import EventCard from "./components/EventCard";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker
import GooglePlacesAutocomplete from "react-google-autocomplete";

const TicketmasterForm = () => {
  const apiKey = "o1U6AskSchLZSkIvnoZpAQIOi7q7APGh";
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [googleCity, setGoogleCity] = useState("");
  const [countryCode, setCountryCode] = useState("US"); // Default to US
  const [results, setResults] = useState([]);
  const [size, setSize] = useState([]);
  const [radius, setRadius] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  // const [startDate, setStartDate] = useState(new Date("2024-05-25"));

  const favoriteArtists = [
    { value: "artist1", label: "Taylor Swift" },
    { value: "artist2", label: "Beyonce" },
    { value: "artist3", label: "Drake" },
  ];
  const favoriteGenres = [
    { value: "genre1", label: "Pop" },
    { value: "genre2", label: "Rap" },
    { value: "genre3", label: "Country" },
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
    const params = {
      apikey: apiKey,
      keyword,
      city,
      countryCode,
      size,
      radius,
    };
    const headers = { "Access-Control-Allow-Origin": "*" };

    try {
      const response = await axios.get(apiUrl, { params }, { headers });
      setResults(response.data._embedded?.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  //   try {
  //     const response = await axios.get(apiUrl, { params }, { headers });
  //     // const filteredEvents = response.data._embedded?.events.filter((event) => {
  //     //   // Convert event start date to a Date object
  //     //   const eventStartDate = new Date(event.dates.start.localDate);
  //     //   // Convert the selected start date to a Date object
  //     //   const selectedStartDate = new Date(startDate);
  //     //   // Compare the event start date with the selected start date
  //     //   return eventStartDate.getTime() === selectedStartDate.getTime();
  //     // });
  //     setResults(filteredEvents || []);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };
  // console.log(results);
  const handleEventSelect = () => {
    setIsEventSelected(true);
  };
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };
  const handleCalculateShortestPath = () => {
    alert(
      `Ending Address: ${selectedAddress}, Starting Address: ${googleCity}`
    );
  };

  return (
    <div>
      <div>
        <h2>MY Location</h2>
        <label htmlFor="city">City:</label>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyD8pBnMosh59Ix2-EriTkgP0XO-yvoQQCw"
          onSelect={(place) => setGoogleCity(place.formatted_address)}
          placeholder="Enter city"
          inputStyle={{ width: "100%" }}
          autocompletionRequest={{
            types: ["(cities)"],
          }}
        />
      </div>
      <h2>Ticketmaster Event Search</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="countryCode">Country Code:</label>
          <input
            type="text"
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="size">Result Size:</label>
          <input
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="radius">Search Radius:</label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker // Use DatePicker component
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div> */}
        <h2>My Preferences</h2>
        <label htmlFor="FavoriteArtists">Favorite Artists:</label>
        <Select
          id="FavoriteArtists"
          isMulti // Allow multiple selections
          closeMenuOnSelect={false} // Keep the dropdown open
          options={favoriteGenres}
          value={selectedGenres}
          onChange={setSelectedGenres}
        />
        <label htmlFor="FavoriteArtists">Favorite Artists:</label>
        <Select
          id="FavoriteArtists"
          isMulti // Allow multiple selections
          closeMenuOnSelect={false} // Keep the dropdown open
          options={favoriteArtists}
          value={selectedArtists}
          onChange={setSelectedArtists}
        />
        <button type="submit">Search Events</button>
      </form>
      <div>
        {isEventSelected && (
          <button onClick={handleCalculateShortestPath}>
            Calculate Shortest Path
          </button>
        )}
      </div>
      <div className="container">
        {" "}
        <div className="row">
          {" "}
          {results.length > 0 ? (
            results.map((event) => (
              <div className="col-md-4 mb-3" key={event.id}>
                <EventCard
                  event={event}
                  onSelect={handleEventSelect}
                  onAddressSelect={handleAddressSelect}
                />
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketmasterForm;
