import ViajanetApi from '../api/viajanetApi';

var PRE_DEFINED_BEST_PRICES_BODY = {
  LoadLocations: false,
  LoadAirCompanies: false,
  OnlyBestAirCompany: false,
  ResultsAmount: 1
};

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

export function getBestPriceTrip(data) {
  PRE_DEFINED_BEST_PRICES_BODY.Origin = data.originIATA;
  PRE_DEFINED_BEST_PRICES_BODY.Destination = data.destinationIATA;
  PRE_DEFINED_BEST_PRICES_BODY.StartDeparture = data.departureDate;
  PRE_DEFINED_BEST_PRICES_BODY.IsRoundTrip = data.isRoundTrip;

  if (data.isRoundTrip) {
    PRE_DEFINED_BEST_PRICES_BODY.TripDays = data.tripDays;
  }

  return function(dispatch) {
    return ViajanetApi.getBestPriceTrip(PRE_DEFINED_BEST_PRICES_BODY)
      .then(response => dispatch(onGetBestPriceSuccess(response)))
      .catch(err => {
        ViajanetApi.getBestPriceTrip(PRE_DEFINED_BEST_PRICES_BODY)
          .then(response => dispatch(onGetBestPriceSuccess(response)))
          .catch(error => dispatch(onGetBestPriceFailure(error)))
      });
  }
};

export const ON_GET_BEST_PRICE_SUCCESS = "ON_GET_BEST_PRICE_SUCCESS";
export function onGetBestPriceSuccess(response) {
  return { type: ON_GET_BEST_PRICE_SUCCESS, payload: response.data };
};

export const ON_GET_BEST_PRICE_FAILURE = "ON_GET_BEST_PRICE_FAILURE";
export function onGetBestPriceFailure(error) {
  return { type: ON_GET_BEST_PRICE_FAILURE, error };
};

export const ON_GET_ALL_BEST_PRICES = "ON_GET_ALL_BEST_PRICES";
export function onGetAllBestPrices(response, searchMonth) {
  return { type: ON_GET_ALL_BEST_PRICES, payload: response, searchMonth };
}

export const RESET_PROCESSING_FLAG = "RESET_PROCESSING_FLAG";
export function resetProcessingFlag() {
  return { type: RESET_PROCESSING_FLAG };
}