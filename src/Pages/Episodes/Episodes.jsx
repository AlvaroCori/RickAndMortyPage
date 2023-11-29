import React from 'react';
import { useEffect, useState } from 'react';
import { EpisodesService } from '../../services/EpisodesService';
import EpisodeCard from '../../components/EpisodeCard';
import NavigatorPage from '../../components-of-page/NavigatorPage';
import Searcher from '../../components-of-page/Searcher';
import "./Episodes.css";
import "../Pages.css";
import { removeAllChildNodes } from '../../functions/RemoveAllChildNodes';
let url = "https://rickandmortyapi.com/api/episode/";
let filters = {};

const Episodes = () => {
  let isLoaded = false;
  let [cards,setCards] = useState([]);
  let [service, _] = useState(new EpisodesService(url));
  function getEpisodes(filterUrl = ""){
    let request = null;
    if (filterUrl == ""){
      request = service.getResources();
    }else{
      request = service.loadWithNewUrl(filterUrl);
    }
    setCards(prevItems => [...prevItems, [cards]= []]);
    request.then(elements =>{
      let cs = [];
      for (let element of elements){
        cs.push(<EpisodeCard episode={element}/>);
      }
      setCards(prevItems => [...prevItems,[cards]=cs]);
    });
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
  function addEpisodeCards(results){
    let cs = [];
    for (let element of results){
       cs.push(<EpisodeCard className="card" episode={element}/>);
    }
    setCards(prevItems => [...prevItems,[cards]=cs]);
  }
  function handleClick(inputRef){
    filters["name"]= inputRef.current.value;
    service.loadWithNewUrl(getUrlFilter()).then(results =>{
      if (results.length == 0){
        filters["name"]= "";
        filters["episode"] = inputRef.current.value;
        service.loadWithNewUrl(getUrlFilter()).then(results=>{
        removeAllChildNodes(document.getElementById("episodes-container"));
          addEpisodeCards(results);  
        }).catch((error)=>{
          console.log(error);
        });
      }else{
        removeAllChildNodes(document.getElementById("episodes-container"));
        addEpisodeCards(results);  
      }  
    }).catch(error =>{
      console.log(error);
    });
  }
  useEffect(() => {
    if (!isLoaded){
      isLoaded = true;
      getEpisodes();
    }
  }, []);
  return (
    <div className="container">
        <h1>Episodes</h1>
        <Searcher labelText="Search name or code episode:" buttonText="SEARCH" searchFunction={handleClick} />
        <div id="episodes-container">
          {cards}
        </div>
        <NavigatorPage service={service} getResources={getEpisodes} elementsIdName="episodes-container"/>
    </div>
)}

export default Episodes;