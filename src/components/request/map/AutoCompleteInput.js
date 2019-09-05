import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

function AutoCompleteInput({
  id,
  name,
  placeholder,
  getSuggestions,
  onSuggestionSelected
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    getSuggestions(value, setSuggestions);
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
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
}

export default AutoCompleteInput;
