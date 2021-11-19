import React from "react";
import SearchBar from "../components/searchBar.js";
function Home(props) {
// Props comes from App.js, being passed in the HomePage(Route) component.
  return (
    <div className="about">
      <div className="picture">
        <div className="bigText">
          <h1>Find how to exercise for free in Barcelona</h1>
        </div>

        <div className="smallText">
          <h2>
            Doesn't matter what, where or when you prefer it. We will help you
            to keep moving.
          </h2>
        </div>
        <SearchBar
          setResults={props.setResults}
          coordinates={props.coordinates}
          selectEle={props.selectEle}
          selectSport={props.selectSport}
          selectHours={props.selectHours}
          selectLocation={props.selectLocation}
          // !================
          setSelectSport={props.setSelectSport}
          setSelectHours={props.setSelectHours}
          setSelectLocation={props.setSelectLocation}
          // These props comes from app.js, the 3 dots are all the props that exist inside app.js.
          classes={"searchHome"}
          {...props}
        />
      </div>
    </div>
  );
}
export default Home;
