import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

function AutoCompleteInput({ id, name, placeholder }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestions.filter(
          place => place.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderInputComponent = inputProps => (
    <div>
      <input type="text" id={id} name={name} {...inputProps} />
    </div>
  );

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder,
    value,
    onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
}

export default AutoCompleteInput;
