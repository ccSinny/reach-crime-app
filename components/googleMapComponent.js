import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const formatDateToString = date => {
  const dateObject = new Date(date);
  return `${(dateObject.getDay()+1).toString().padStart(2, "0")}-${(dateObject.getMonth()+1).toString().padStart(2, "0")}-${dateObject.getFullYear()}`
}
const MyMapComponent = withScriptjs(
  withGoogleMap((props) => {
    const [activeMarkerId, setActiveMarkerId] = useState();

    const handleClick = (event) => {
      props.setUserLatitude(event.latLng.lat());
      props.setUserLongitude(event.latLng.lng());
    };
    return (
      <GoogleMap
        defaultZoom={8}
        zoom={props.crimes.length > 0 ? 14 : 8}
        defaultCenter={{ lat: 53.410268, lng: -1.514389 }}
        center={
          props.crimes.length > 0
            ? { lat: props.userLatitude, lng: props.userLongitude }
            : { lat: 53.410268, lng: -1.514389 }
        }
        onClick={(e) => handleClick(e)}
      >
        {props.isMarkerShown && (
          <Marker
            position={{ lat: props.userLatitude, lng: props.userLongitude }}
          />
        )}
        {props.crimes.map((crime, index) =>
          crime.location.latitude && crime.location.longitude ? (
            <Marker
              icon={{ url: "/crimeMarker.png" }}
              key={index}
              position={{
                lat: parseFloat(crime.location.latitude),
                lng: parseFloat(crime.location.longitude),
              }}
              onClick={() => setActiveMarkerId(index)}
            >
              {activeMarkerId === index && (
                <InfoBox onCloseClick={() => setActiveMarkerId(null)}>
                  <Box bg="white">
                    <Text>Date: {formatDateToString(crime.datetime)}</Text>
                    <Text>Age: {crime.age_range}</Text>
                    <Text>Ethnicity: {crime.self_defined_ethnicity}</Text>
                    <Text>Type of search: {crime.type}</Text>
                    <Text>Outcome: {crime.outcome}</Text>
                  </Box>
                </InfoBox>
              )}
            </Marker>
          ) : null
        )}
      </GoogleMap>
    );
  })
);

export default MyMapComponent;
