import { Button, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import fetch from "unfetch";
import MyMapComponent from "../components/googleMapComponent";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
registerLocale("enGB", enGB);

import "react-datepicker/dist/react-datepicker.css";

const convertDateToFetchFormat = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};

export default crimeApp = () => {
  const [userLatitude, setUserLatitude] = useState();
  const [userLongitude, setUserLongitude] = useState();
  const [crimes, setCrimes] = useState([]);
  const [startDate, setStartDate] = useState(new Date(2021, 4, 31));

  useEffect(() => {
    if (userLatitude && userLongitude) {
      fetch(
        `https://data.police.uk/api/stops-street?lat=${userLatitude}&lng=${userLongitude}&date=${convertDateToFetchFormat(
          startDate
        )}`
      )
        .then((r) => r.json())
        .then((crimes) => setCrimes(crimes));
    }
  }, [userLatitude, userLongitude, startDate]);
  return (
    <div>
      <Text as="h1">STOP SEARCH MAP</Text>
      <Text>Select the date between June 2018 to May 2021</Text>
      <DatePicker
        locale="enGB"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="P"
        minDate={new Date(2018, 5, 1)}
        maxDate={new Date(2021, 4, 31)}
      />
      <Text>
        Please mark your location on the map and click the blue dot to see more
        information on the potential crime
      </Text>

      <MyMapComponent
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: `600px`, maxHeight: `80vh` }} />
        }
        mapElement={<div style={{ height: `100%` }} />}
        userLatitude={userLatitude}
        userLongitude={userLongitude}
        setUserLatitude={setUserLatitude}
        setUserLongitude={setUserLongitude}
        crimes={crimes}
      />
    </div>
  );
};
