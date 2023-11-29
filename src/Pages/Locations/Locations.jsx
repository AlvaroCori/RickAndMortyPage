import React from 'react';
import { useEffect, useState } from 'react';
import "./Locations.css";
import "../Pages.css";
import LocationCard from '../../components/LocationCard';
import { LocationsService } from '../../services/LocationsService';
import NavigatorPage from '../../components-of-page/NavigatorPage';
import Searcher from '../../components-of-page/Searcher';
import { removeAllChildNodes } from '../../functions/RemoveAllChildNodes';

let url = "https://rickandmortyapi.com/api/location/";
let filters = {};
const Locations = () => {
  let isLoaded = false;
  let [cards,setCards] = useState([]);
  let [service, _] = useState(new LocationsService(url));
  function filterTypes(event){
    filters["type"] = event.target.value;
    getWithFilters(getUrlFilter());
  }
  function getWithFilters(filterUrl){
    removeAllChildNodes(document.getElementById("locations-container"));
    getLocations(filterUrl);
  }
  function insertFilterInUrl(url, filterName){
    if (url.slice(-1) == "/"){
        url = url + "?" + filterName;
    }
    else{
        url = url + "&" + filterName;
    }
    return url;
  }
  function getUrlFilter(){
    let urlFilter = url;
    for (let name in filters){
        if (filters[name] != "all"){
            urlFilter = insertFilterInUrl(urlFilter, name+"="+filters[name]);
        }
    }
    return urlFilter;
  }
  function getLocations(filterUrl = ""){
    let request = null;
    if (filterUrl == ""){
      request = service.getResources();
    }else{
      request = service.loadWithNewUrl(filterUrl);
    }
    setCards(prevItems => [...prevItems, [cards]= []]);
    request.then(elements =>{
      addLocationCards(elements);
    });
  }
  function addLocationCards(elements){
    let cs = [];
    for (let element of elements){
      cs.push(<LocationCard location={element}/>);
    }
    setCards(prevItems => [...prevItems,[cards]=cs]);
  }
  function handleClick(inputRef){
    filters["name"]= inputRef.current.value;
    service.loadWithNewUrl(getUrlFilter()).then(results =>{
      if (results.length == 0){
        filters["name"]= "";
        filters["dimension"] = inputRef.current.value;
        service.loadWithNewUrl(getUrlFilter()).then(results=>{
          removeAllChildNodes(document.getElementById("locations-container"));
          addLocationCards(results);  
        }).catch((error)=>{
          console.log(error);
        });
      }else{
        removeAllChildNodes(document.getElementById("locations-container"));
        addLocationCards(results);  
      }  
    }).catch(error =>{
      console.log(error);
    });
  }
  useEffect(() => {
    if (!isLoaded){
      isLoaded = true;
      getLocations();
    }
  }, []);
  return (
    <div className="container">
        <h1>Locations</h1>
        <Searcher labelText="Search for name or dimension of location:" buttonText="SEARCH" searchFunction={handleClick} />
        <div className="filters">
            <div>
                <label htmlFor="type-filter">Type location:</label>
                <select name="type-filter" id="type-filter" onChange={filterTypes}>
                  <option value="all">*</option>
                  <option value="Planet">Planet</option>
                  <option value="Cluster">Cluster</option>
                  <option value="Space station">Space station</option>
                  <option value="Microverse">Microverse</option>
                  <option value="Resort">Resort</option>
                  <option value="TV">TV</option>
                  <option value="Fantasy town">Fantasy town</option>
                  <option value="Dream">Dream</option>
                  <option value="Space">Space</option>
                  <option value="Dimension">Dimension</option>
                  <option value="Game">Game</option>
                  <option value="Menagerie">Menagerie</option>
                  <option value="Custom">Custom</option>
                  <option value="Daycare">Daycare</option>
                  <option value="Dwarf planet (Celestial Dwarf)">Dwarf planet (Celestial Dwarf)</option>
                  <option value="Teenyverse">Teenyverse</option>
                  <option value="Box">Box</option>
                  <option value="Daycare">Daycare</option>
                  <option value="Spacecraft">Spacecraft</option>
                  <option value="Artificially generated world">Artificially generated world</option>
                  <option value="Arcade">Arcade</option>
                  <option value="Spa">Spa</option>
                  <option value="Quadrant">Quadrant</option>
                  <option value="Quasar">Quasar</option>
                  <option value="Mount">Mount</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Convention">Convention</option>
                  <option value="Woods">Woods</option>
                  <option value="Diegesis">Diegesis</option>
                  <option value="Non-Diegetic Alternative Reality">Non-Diegetic Alternative Reality</option>
                  <option value="Nightmare">Nightmare</option>
                  <option value="Asteroid">Asteroid</option>
                  <option value="Acid Plant">Acid Plant</option>
                  <option value="Reality">Reality</option>
                  <option value="Death Star">Death Star</option>
                  <option value="Elemental Rings">Elemental Rings</option>
                  <option value="Human">Human</option>
                  <option value="Hell">Hell</option>
                  <option value="Police Department">Police Department</option>
                  <option value="Country">Country</option>
                  <option value="Consciousness">Consciousness</option>
                  <option value="Memory">Memory</option>
                </select>
            </div>
        </div>
        <div id="locations-container">
          {cards}
        </div>
        <NavigatorPage service={service} getResources={getLocations} elementsIdName="locations-container"/>
    </div>
)}

export default Locations;