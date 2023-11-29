import React, { Component } from 'react';
import Navbar from './Navbar';
import './header.css';
class Header extends Component {
  state = {
    activeIndex: null
  }
  handleClick = (index) => this.setState({ activeIndex: index });
  render() {
    const clickables = [
    {name: "Characters"},
    { name: "Episodes" },
    {name: "Locations"}
  ];
  return (
    <div className='header'>
    <h1>Rick And Mortin</h1>
    <ul>
      { clickables.map((clickable, i) => {
          return <Navbar 
            key={ clickable.name }
            name={ clickable.name }
            index={ i }
            isActive={ this.state.activeIndex === i }
            onClick={ this.handleClick }
          />
        })
      }
  </ul>
</div>
  )
  }
}

export default Header;