import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EventCard = ({ event }) => {
  const formatTime = (timeString) => {
    let [hours, minutes] = timeString.split(":");
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 instead of 0
    minutes = minutes < 10 && minutes != "00" ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  };
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>
        <strong>Date:</strong> {event.dates.start.localDate}
      </p>
      <p>
        <strong>Time:</strong> {formatTime(event.dates.start.localTime)}
      </p>
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
      <a href={event.url} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
    </div>
  );
};

export default EventCard;
