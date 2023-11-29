import React from 'react'
import { useEffect, useState } from 'react'
import './Characters.css'
import '../Pages.css'
import { removeAllChildNodes } from '../../functions/RemoveAllChildNodes'
import { CharacterService } from '../../services/CharactersService';
import CharacterCard from '../../components/CharacterCard';
import NavigatorPage from '../../components-of-page/NavigatorPage';
import Searcher from '../../components-of-page/Searcher';
const service = new CharacterService("https://rickandmortyapi.com/api/character");
let isLoaded = false;
let url = "https://rickandmortyapi.com/api/character/";
let filters = {};


function Characters() {
  let [cards,setCards] = useState([]);
  function filterGenders(event){
    filters["gender"] = event.target.value;
    getWithFilters(getUrlFilter());
  }
  function filterStatus(event){
    filters["status"] = event.target.value;
    getWithFilters(getUrlFilter());
  }
  function filterSpecies(event){
    filters["species"] = event.target.value;
    getWithFilters(getUrlFilter());
  }
  
  function getWithFilters(filterUrl){
    removeAllChildNodes(document.getElementById("characters-container"));
    getCharacters(filterUrl);
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
  function getCharacters(filterUrl = ""){
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
        cs.push(<CharacterCard character={element}></CharacterCard>);
      }
      setCards(prevItems => [...prevItems,[cards]=cs]);
    });
  }
  function handleClick(inputRef){
    filters["name"]= inputRef.current.value;
    getWithFilters(getUrlFilter());
  }
  useEffect(() => {
    if (!isLoaded){
      isLoaded = true;
      getCharacters();
    }
  }, []);
  

  return (
    <div className="container">
        <h1>Characters</h1>
        <Searcher labelText="Search name character:" buttonText="SEARCH NAME" searchFunction={handleClick} />
        <div className="filters">
            <div>
                <label htmlFor="genre">Genre:</label>
                <select name="genre" id="genre" onChange={filterGenders}>
                    <option value="all">*</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="genderless">genderless</option>
                    <option value="unknown">unknown</option>
                </select>
            </div>
            <div>
                <label htmlFor="status">Status:</label>
                <select name="status" id="status" onChange={filterStatus}>
                  <option value="all">*</option>
                  <option value="alive">alive</option>
                  <option value="dead">dead</option>
                  <option value="unknown">unknown</option>
                </select>
            </div>
            <div>
                <label htmlFor="species">specie:</label>
                <select name="species" id="species" onChange={filterSpecies}>
                  <option value="all">*</option>
                  <option value="Human">Human</option>
                  <option value="Humanoid">Humanoid</option>
                  <option value="Animal">Animal</option>
                  <option value="Alien">Alien</option>
                  <option value="Mythological Creature">Mythological Creature</option>
                </select>
            </div>
        </div>
        <div id="characters-container">
          {cards}
        </div>
        <NavigatorPage service={service} getResources={getCharacters} elementsIdName="characters-container"/>
        
      
    </div>
  )
}

export default Characters
