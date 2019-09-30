import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./autoCompleteInput.css";

function AutoCompleteInput({
  id,
  name,
  className,
  inputProps,
  onKeyUp,
  getSuggestions,
  onSuggestionSelected
}) {
  const [suggestions, setSuggestions] = useState([]);

  const renderInputComponent = inputProps => (
    <div className={`input-wrapper ${className}`}>
      <input
        type="text"
        id={id}
        name={name}
        {...inputProps}
        className="nested-input"
        placeholder="Type address here"
        onKeyUp={onKeyUp}
      />
    </div>
  );

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value, setSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
}

export default AutoCompleteInput;
