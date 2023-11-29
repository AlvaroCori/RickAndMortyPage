import React from 'react';
import "./Searcher.css";
export default function Searcher(elements) {
    const labelText = elements.labelText;
    const buttonText = elements.buttonText;
    const handleClick = elements.searchFunction;
    let inputRef = React.createRef();
    return (
        <div className='searcher'>
          <label htmlFor='name-input'>
            {labelText}
          </label>
          <input className="input-search" type="text" ref={inputRef} name='name-input'></input>
          <input className="button-search" type="submit" value={buttonText} onClick={()=>handleClick(inputRef)}/>
        </div>
    )
}