import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EventCard = ({ event, onSelect, onAddressSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  // const formatTime = (timeString) => {
  //   let [hours, minutes] = timeString?.split(":");
  //   let ampm = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // 12 instead of 0
  //   minutes = minutes < 10 && minutes !== "00" ? "0" + minutes : minutes;
  //   return hours + ":" + minutes + " " + ampm;
  // };

  const handleSelectAddress = () => {
    // Get the address associated with the event
    const address =
      event._embedded.venues[0].address.line1 +
      ", " +
      event._embedded.venues[0].city.name +
      ", " +
      event._embedded.venues[0].state.stateCode;
    setSelectedAddress(address);
    onSelect();
    onAddressSelect(address);
  };

  return (
    <div className={selectedAddress ? "selected event-card" : "event-card"}>
      <img width={"250px"} src={event.images[4].url} alt={event.name} />
      <h3>{event.name}</h3>
      <p>
        <strong>Date:</strong> {event.dates.start.localDate}
      </p>
      {/* 
      <p>
        <strong>Time:</strong>{" "}
        {event.dates.start.localTime
          ? formatTime(event.dates.start.localTime)
          : event.dates.start.localTime}
      </p> */}
      <p>
        <strong>Venue:</strong> {event._embedded.venues[0].name}
      </p>
      <p>
        <strong>Location:</strong> {event._embedded.venues[0].city.name},{" "}
        {event._embedded.venues[0].state.stateCode}
      </p>
      <p>
        <strong>Address:</strong> {event._embedded.venues[0].address.line1},{" "}
        {event._embedded.venues[0].city.name},{" "}
        {event._embedded.venues[0].state.stateCode}
      </p>
      <button onClick={handleSelectAddress}>
        {selectedAddress ? "Selected" : "Select"}
      </button>
      {selectedAddress && (
        <p>
          <strong>Selected Address:</strong> {selectedAddress}
        </p>
      )}
      <a href={event.url} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
    </div>
  );
};

export default EventCard;
