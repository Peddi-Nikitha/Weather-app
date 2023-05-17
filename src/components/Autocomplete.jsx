import React, { useState } from 'react';
import './Autocomplete.css';

function Autocomplete({ data, setLocation }) {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState(data);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onChange = e => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = data.filter(
      suggestion =>
        suggestion.nm.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(userInput.trim().length > 0 && filteredSuggestions.length > 0);
    setUserInput(userInput);
  };
  const Focus =()=>{
    if(userInput.length){
    setShowSuggestions(true);
    setFilteredSuggestions(data)
    }
  }

  const onClick = (e,suggestion) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
    setLocation(suggestion);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion].nm);
      setLocation(filteredSuggestions[activeSuggestion].nm);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const suggestionsListComponent = (
    <ul className="suggestions">
      {filteredSuggestions.map((suggestion, index) => {
        let className;

        if (index === activeSuggestion) {
          className = 'suggestion-active';
        }

        return (
          <li className={className} key={suggestion.id} onClick={(e)=>onClick(e,suggestion)}>
            {suggestion.nm}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="autocomplete ">
      <input
        type="text"
        placeholder="Enter a location"
        value={userInput}
        onChange={onChange}
        onClick={()=>setShowSuggestions(!showSuggestions)}
       onFocus={Focus}
        onKeyDown={onKeyDown}
      />
      <div
        className={`arrow-down ${showSuggestions ? 'hide-suggestions' : 'show-suggestions'}`}
        onClick={() => setShowSuggestions(!showSuggestions)}
        tabIndex="0"
      />
      {showSuggestions  && suggestionsListComponent}
    </div>
  );
}

export default Autocomplete;
