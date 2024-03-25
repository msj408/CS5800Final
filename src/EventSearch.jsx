import React, { useState } from "react";
import axios from "axios";
import EventCard from "./components/EventCard";
import "bootstrap/dist/css/bootstrap.min.css";

const TicketmasterForm = () => {
  const apiKey = "o1U6AskSchLZSkIvnoZpAQIOi7q7APGh";
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("US"); // Default to US
  const [results, setResults] = useState([]);
  const [size, setSize] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
    const params = {
      apikey: apiKey,
      keyword,
      city,
      countryCode,
      size,
    };

    try {
      const response = await axios.get(apiUrl, { params });
      setResults(response.data._embedded?.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  console.log(results);

  return (
    <div>
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
        <button type="submit">Search Events</button>
      </form>

      {/* Display results (add your own styling and formatting) */}

      <div className="container">
        {" "}
        {/* Bootstrap container for grid */}
        <div className="row">
          {" "}
          {/* Bootstrap row */}
          {results.length > 0 ? (
            results.map((event) => (
              <div className="col-md-4 mb-3" key={event.id}>
                {" "}
                {/* Column sizing */}
                <EventCard event={event} />
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
