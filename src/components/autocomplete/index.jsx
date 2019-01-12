import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { createGlobalStyle } from 'styled-components';

import ViajanetApi from '../../api/viajanetApi';

import Raleway from './rounded-mplus-1c-black.ttf';

// eslint-disable-next-line
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Rounded Mplus 1c Medium';
    src: url(${Raleway}) format('truetype');
  }
`;

const customStyles = {
  input: styles => ({ ...styles, width: "95%", cursor: "text", fontFamily: "Rounded Mplus 1c Medium"}),
  control: styles => ({ ...styles, fontFamily: "Rounded Mplus 1c Medium"}),
  menuList: styles => ({ ...styles, backgroundColor: "#f3f3f3"}),
  dropdownIndicator: styles => ({ ...styles, backgroundColor: "black"}),
  placeholder: styles => ({ ...styles, cursor: "text"}),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "22px",
    width: "96%",
    margin: "1% 1% 1% 2%",
    backgroundColor: isFocused ? "#98fd4f" : "white",
    color: isFocused ? "black" : "black",
    borderRadius: "5px",
  }),
}

export default class Autocomplete extends Component {
  constructor(props){
    super(props)

    this.state = {
      suggestions: [],
      selectedOption: null,
      something: true
    }

    this.loadOptions = this.loadOptions.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange = value => {
    if(value === "" || value === null || value === undefined){
      this.setState({
        suggestions: [],
        selectedOption: null
      })
    }
  }

  loadOptions = (inputValue, callback) => {
    if(inputValue && inputValue.trim().length > 2) {
      ViajanetApi.getAutocompleteInfo(inputValue)
      .then(response => {
        if (response && response.data && response.data.Locations) {
          this.setState({suggestions: response.data.Locations});

          callback(response.data.Locations.map(option => {
            return {
              value: option,
              label: option.Name
            };
          }));
        }
      })
    }
  };

  handleChange = (selectedOption) => {
    const suggestions = selectedOption !== null ? this.state.suggestions : [];
    this.setState({ selectedOption, suggestions });
    
    if (this.props.onSelectCallback) {
      this.props.onSelectCallback(selectedOption);
    }
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <AsyncSelect
        value={selectedOption}
        onChange={this.handleChange}
        loadOptions={this.loadOptions}
        styles={customStyles}
        menuIsOpen={this.state.suggestions && this.state.suggestions.length > 0 && this.state.selectedOption == null && this.state.something}
        isClearable
        openMenuOnClick={false}
        openMenuOnFocus={false}
        components={
          {
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
          }
        }
        placeholder={this.props.placeholder}
        pageSize={100}
        noOptionsMessage={() => "Não há sugestões"}
        theme={(theme) => ({
          ...theme,
          colors: {
          ...theme.colors,
            primary25: '#98fd4f',
            primary: '#98fd4f'
          },
        })}
        onBlur={() => this.setState({something: false})}
        onFocus={() => this.setState({something: true})}
      />
    );
  }
}