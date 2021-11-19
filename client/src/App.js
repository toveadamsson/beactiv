import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//* ==============================================
import Header from "./components/Header.js";
import HomePage from "./pages/HomePage.js";
import MapPage from "./pages/MapPage.js";
import NotFound from "./pages/404.js";
//* ==============================================
import "./App.css";
//* ==============================================
function App() {
  const [coordinates, setCoordinates] = useState({});
  const [results, setResults] = useState([]);
  const [selectLocation, setSelectLocation] = useState("Show all");
  const [selectSport, setSelectSport] = useState(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [selectHours, setSelectHours] = useState("Any time of the day");
  // In homepage, the setResults is being set
  // Results is the given location that is given from the coordiantes state

  // this part is only triggered once.This built in method is deciding a location of the user when it enters the given page. Position is the name of this function that will set the lat and lon to my coordinates in the state above on line 12. The empty [] is to render only once through the state. If I was to add f ex results, it would only go through results in the state everytime it updates. If no array, it will update all states...
  //!=====================================================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setCoordinates({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    );
  }, []);
  const sortAlphabetically = (arr) => {
    arr.sort((a, b) => {
      if (a.NOM_DISTRICTE < b.NOM_DISTRICTE) {
        return -1;
      }
      if (a.NOM_DISTRICTE > b.NOM_DISTRICTE) {
        return 1;
      }
      return 0;
    });
    return arr;
  };
  //!=====================================================
  const ifOpen = (item) => {
    if (item.HORARI_HORES_INICI === null || item.HORARI_HORES_FI === null) {
      return true;
    }
    // console.log("========================>", item.HORARI_HORES_INICI);
    // console.log("========================>", item.HORARI_HORES_FI);
    const open = new Date(item.HORARI_HORES_INICI);
    const close = new Date(item.HORARI_HORES_FI);
    const now = new Date();
    return now > open && now < close ? false : true;
  };
  //!=====================================================
  const selectEle = (elements) => {
    const words = [
      "Centre",
      "Esportiu",
      "Club",
      "Poliesportiu",
      "Poliesportius",
      "Poliesportives",
      "Poliesportiva",
      "Institut",
    ];
    const temp = [];
    elements.forEach(function (item, index) {
      var splitted = item.EQUIPAMENT.split(" ");
      const found = temp.find((el) => el.EQUIPAMENT === item.EQUIPAMENT);
      let includes = false;
      for (let word of splitted) {
        if (words.includes(word)) {
          includes = true;
        }
      }
      if (includes === false && !found) {
        item["selected"] = false;
        // console.log("item.EQUIPAMENT ====>", item.EQUIPAMENT);
        const isOpen = ifOpen(item);
        if (selectHours === "Any time of the day") {
          if (isOpen) temp.push(item);
        } else {
          if (isOpen) temp.push(item);
        }
      }
    });
    // console.log(temp);
    setResults(sortAlphabetically(temp));
  };

  //?=====================================================

  //!=====================================================
  const clickIcon = (_id) => {
    let temp = [...results];
    temp.forEach((ele) => (ele.selected = false));
    const index = temp.findIndex((ele) => ele._id === _id);

    temp[index].selected = true;
    const res = temp.splice(index, 1);
    temp = sortAlphabetically(temp);
    temp.unshift(res[0]);
  
    setAutoScroll(true);
    setResults(temp);
  };
  return (
    //!=====================================================
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <div>
                <Header />
                <HomePage
                  {...props}
                  coordinates={coordinates}
                  selectEle={selectEle}
                  selectSport={selectSport}
                  selectHours={selectHours}
                  selectLocation={selectLocation}
                  // !=================
                  setSelectSport={setSelectSport}
                  setSelectHours={setSelectHours}
                  setSelectLocation={setSelectLocation}
                />
              </div>
            )}
          />
          //!=====================================================
          <Route
            exact
            path="/map"
            render={(props) => (
              <div>
                <Header />
                <MapPage
                  {...props}
                  selectSport={selectSport}
                  selectLocation={selectLocation}
                  selectHours={selectHours}
                  //!=====================================================
                  results={results}
                  coords={coordinates}
                  selectEle={selectEle}
                  clickIcon={clickIcon}
                  //!=====================================================
                  autoScroll={autoScroll}
                  setAutoScroll={setAutoScroll}
                  //!=====================================================
                  setSelectHours={setSelectHours}
                  setSelectSport={setSelectSport}
                  setSelectLocation={setSelectLocation}
                />
              </div>
            )}
          />
          //!=====================================================
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
