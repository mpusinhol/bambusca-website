import ViajanetApi from '../api/viajanetApi';

export function getAutocompleteInfo(typedValue) {
  return function(dispatch) {
    return ViajanetApi.getAutocompleteInfo(typedValue)
      .then(response => dispatch(onGetAutocompleteSuccess(response.data.Locations)))
      .catch(err => { throw(err); })
  }
};

export const ON_GET_AUTOCOMPLETE_SUCCESS = "ON_GET_AUTOCOMPLETE_SUCCESS";
export function onGetAutocompleteSuccess(locations) {
  return { type: ON_GET_AUTOCOMPLETE_SUCCESS, locations};
};