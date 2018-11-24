import {ON_GET_AUTOCOMPLETE_SUCCESS} from '../actions/viajanetActions';

const INITIAL_STATE = {
  autocompleteSuggestions: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ON_GET_AUTOCOMPLETE_SUCCESS: {
      return {
        autocompleteSuggestions: action.locations.slice()
      };
    }
    default:
      return INITIAL_STATE;
  }
}