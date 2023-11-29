import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Characters from './Pages/Characters/Characters.jsx';
import Episodes from './Pages/Episodes/Episodes.jsx';
import Locations from './Pages/Locations/Locations.jsx';
import "./Body.css";
const Body = () => (
  <div>
    <Routes>
      <Route path='/Characters' element={<Characters/>} />
      <Route path='/Episodes' element={<Episodes/>} />
      <Route path='/Locations' element={<Locations/>}/>
    </Routes>
  </div>
)

export default Body;