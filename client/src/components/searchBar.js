import React, { useState } from "react";
import { withRouter } from "react-router-dom";
//*=====================================================
import Axios from "axios";
//*=====================================================
import UseAutocomplete from "../components/test.js";
import { pingpongData } from "../dataComponents/pingpongdata.js";
import { basketballData } from "../dataComponents/basketballdata.js";
import { petancaData } from "../dataComponents/petancadata.js";
//*====================================================
const sports = [
  { en: "Ping-Pong table", cat: "ping-pong" },
  { en: "Basketball court", cat: "bàsquet" },
  { en: "Boule", cat: "petanca" },
];
const locations = ["Near me", "Show all"];
const hours = ["Any time of the day", "Now"];
//*====================================================
function SearchBar(props) {
  const [temp, setTemp] = useState("Show all");
  const [change, setChange] = useState(null);
  const getGoogle = async () => {
    props.setSelectLocation(temp);
    if (change === null) {
      return alert("You need first to add a sport");
    }
    if (change.en === "Ping-Pong table") {
      props.setSelectSport(change);
      props.selectEle(pingpongData[0].result.records);
      return props.location.pathname !== "/map" && props.history.push("/map");
    } else if (change.en === "Basketball court") {
      props.setSelectSport(change);
      props.selectEle(basketballData[0].result.records);
      return props.location.pathname !== "/map" && props.history.push("/map");
    } else if (change.en === "Boule") {
      props.setSelectSport(change);
      props.selectEle(petancaData[0].result.records);
      return props.location.pathname !== "/map" && props.history.push("/map");
    }
    const getParam = () => {
      const temp = sports.find((sp) => sp.en === change.en);
      return temp.cat;
    };

    try {
      const id =
        change.en === "Basketball court"
          ? "cd8d0d2b-b97a-4aba-b1c8-e25696379a58"
          : "26a2deb1-d9ff-483d-abf6-83a0ae6ff754";
      const url = `https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=${id}&limit=1000&q=${getParam()}`;
      const response = await Axios.get(url);
      props.setSelectSport(change);
      props.selectEle(response.data.result.records);

      return props.history.push("/map");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={"filtersearch " + props.classes}>
      {/* different types of sports, taken from google: skateboard park, baskertball, outdoor gym. taken manually, ping pong.  */}
      <UseAutocomplete
        options={sports}
        label="Sport"
        placeholder="What sport do you fancy?"
        getData={setChange}
        menuPosition={props.menuPosition}
        // value={change}
      />
      <UseAutocomplete
        options={locations}
        label="Location"
        placeholder="Where do you want to exercise?"
        getData={setTemp}
        menuPosition={props.menuPosition}
        // value={temp}
      />
      <UseAutocomplete
        options={hours}
        label="Hours:"
        placeholder="When do you want to go?"
        getData={props.setSelectHours}
        menuPosition={props.menuPosition}
        // value={props.selectHours}
      />
      <button onClick={() => getGoogle()} className="buttonHomepage">
        SEARCH
      </button>
    </div>
  );
}
export default withRouter(SearchBar);
