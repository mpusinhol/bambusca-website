import React, {Component} from 'react';
import {Input} from 'reactstrap';

import ViajanetApi from '../../api/viajanetApi';

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
      selectedValue: {}
    };

    this.buildSuggestionBox = this.buildSuggestionBox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValueSelect = this.onValueSelect.bind(this);
  }

  onChange(e) {
    const value = e.target.value;

    if (value && value.length > 2) {
      ViajanetApi.getAutocompleteInfo(value)
      .then(response => {
        this.setState({
          suggestions: response.data.Locations
        })
      })
      .catch(err => console.log(err))
    } else {
      this.setState({
        suggestions: []
      })
    }
    
    this.setState({
      value
    })
  }

  onValueSelect(e) {
    const item = this.state.suggestions.find(item => item.Id.toString() === e.target.id);

    if (item) {
      this.setState({
        selectedValue: item,
        value: item.Name,
        suggestions: []
      });

      if (this.props.onSelect)
        this.props.onSelect(item);
    }
  }

  buildSuggestionBox(suggestions) {
    const items = suggestions.map(item => {
      const id = item && item.Id ? item.Id.toString() : "";
      const name = item && item.Name ? item.Name.toString() : "";

      return (
        <div className="item" key={id} id={id} title={name} onClick={this.onValueSelect}>
          <span id={id}>{item.Name}</span>
        </div>
      );
    })

    return (
      <div type="select" className="autocomplete-box">
        {items}
      </div>
    )
  }

  render() {
    const suggestionBox = this.state.suggestions && this.state.suggestions.length > 0 ? this.buildSuggestionBox(this.state.suggestions) : <div />;

    return (
      <div id="autocomplete" style={this.props.styles}>
        <Input type="text" placeholder="Digite a origem" onChange={this.onChange} value={this.state.value}/>
        {suggestionBox}
      </div>
    );
  }
}