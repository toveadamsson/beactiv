import React, { useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import moment from "moment";
//*================================
import ping_pong from "../assets/sports_table_tennis.svg";
import pin from "../assets/location_on.svg";
import yourLocation from "../assets/Location2.svg";
import basket from "../assets/sports_basketball.svg";
import tennis from "../assets/sports_tennis.svg";
import time from "../assets/VectorTime.svg";
//*================================
import SearchBar from "../components/searchBar.js";
//*================================
const ListItem = (props) => {
  return (
    <div
      className="borderFilter"
      style={{
        backgroundColor: props.selected ? "rgba(171, 186, 191, 1)" : "white",
      }}
    >
      <div className="sportSymbol">
        <div className="iconPosition">
          <img
            style={{ width: "40%" }}
            src={icons[props.selectSport.en]}
            alt="hello"
          />
        </div>
        <p>
          {translation[props.typeOfSport]}
          {" - "}
          {props.name}
        </p>
      </div>
      <div className="sportSymbol">
        <div className="iconPosition">
          <img style={{ width: "50%" }} src={pin} alt="hello" />
        </div>
        <p>
          {props.streetName} {props.streetNumber} {", "}
          {props.district}
        </p>
      </div>
      <div className="sportSymbol">
        <div className="iconPosition">
          <img style={{ width: "40%" }} src={time} alt="hello" />
        </div>
        {props.hoursStart === null ? (
          <p> Any time of the day</p>
        ) : (
          <p>
            {moment(props.hoursStart).format("LT")}
            {" - "}
            {moment(props.hoursEnd).format("LT")}
          </p>
        )}
      </div>
    </div>
  );
};

const translation = {
  "Taula de ping-pong": "Ping-Pong table",
  "Tennis taula": "Ping-Pong table",
  "Tenis taula": "Ping-Pong table",
  "Tenis taula (ping-pong)": "Ping-Pong table",
  bàsquet: "Basketball",
  Bàsquet: "Basketball",
  petanca: "Boule",
  Escalada: "Climbing",
};
const icons = {
  "Ping-Pong table": ping_pong,
  "Basketball court": basket,
  Boule: tennis,
};
function Map(props) {
  const contRef = useRef(null);
  useEffect(() => {
    if (props.autoScroll === true) {
      contRef.current.scrollTo(0, 0);
      props.setAutoScroll(false);
    }
  }, [props.autoScroll]);
  const MyLocation = () => <img style={{ width: "25px" }} src={yourLocation} alt="hello"/>;
  const AllLocations = (ele) => {
    return (
      <img
        alt="hello"
        style={{ width: "20px" }}
        src={icons[props.selectSport.en]}
        onClick={() => props.clickIcon(ele.children._id)}
      />
    );
  };
  return (
    <div className="mainContainer">
      <div className="behindSearch">
        <SearchBar
          selectEle={props.selectEle}
          selectSport={props.selectSport}
          selectHours={props.selectHours}
          selectLocation={props.selectLocation}
          // !===========
          classes={"searchMap"}
          menuPosition={"bottom"}
          // !===========
          setSelectHours={props.setSelectHours}
          setSelectLocation={props.setSelectLocation}
          setSelectSport={props.setSelectSport}
          setResults={props.setResults}
        />
      </div>
      <div className="mapContainer">
        <div className="filterBox" ref={contRef}>
          {props.results.map((ele) => {
            return (
              <ListItem
                streetName={ele.NOM_CARRER}
                streetNumber={ele.NUM_CARRER_1}
                postNumber={ele.CODI_POSTAL}
                district={ele.NOM_DISTRICTE}
                name={ele.EQUIPAMENT}
                typeOfSport={ele["3ER_NIVELL"]}
                hoursStart={ele.HORARI_HORES_INICI}
                hoursEnd={ele.HORARI_HORES_FI}
                selected={ele.selected}
                selectSport={props.selectSport}
              />
            );
          })}
        </div>
        <div className="mapSection">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_API_KEY,
            }}
            defaultCenter={{
              lat: props.coords.lat || 41.38879,
              lng: props.coords.lon || 2.15899,
            }}
            defaultZoom={12}
            zoom={props.selectLocation === "Show all" ? 12 : 15}
          >
            <MyLocation lat={props.coords.lat} lng={props.coords.lon} />
            {props.results.map((ele) => {
              // console.log("ele.LATITUD=====>", ele.LATITUD);
              return (
                <AllLocations lat={ele.LATITUD} lng={ele.LONGITUD}>
                  {ele}
                </AllLocations>
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
export default Map;
Map.defaultProps = {
  // coords: {
  //   lat: 41.38879,
  //   lng: 2.15899,
  // },
  zoom: 12,
};
