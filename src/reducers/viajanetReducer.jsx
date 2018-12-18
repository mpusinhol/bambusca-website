import moment from 'moment';

import {
  ON_GET_BEST_PRICE_SUCCESS,
  ON_GET_BEST_PRICE_FAILURE,
  ON_GET_ALL_BEST_PRICES,
  RESET_PROCESSING_FLAG,
} from '../actions/viajanetActions';

const INITIAL_STATE = {
  bestPrices: {},
  errors: [],
  hasFinishedProcessing: undefined,
  numberOfResultsFound: 0,
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ON_GET_BEST_PRICE_SUCCESS: {
      let { bestPrices } = state;

      const date = moment(action.payload.BestPricesList[0].Departure).format("DD/MM/YYYY");

      bestPrices[date] = action.payload.BestPricesList[0];

      return {
        ...state,
        bestPrices
      };
    }

    case ON_GET_BEST_PRICE_FAILURE: {
      let { errors } = state;

      errors.push(action.error);

      return {
        ...state,
        errors
      }
    }

    case ON_GET_ALL_BEST_PRICES: {
      let { bestPrices, numberOfResultsFound } = state;

      action.payload.forEach(response => {
        if (response.data.BestPricesList) {
          const date = moment(response.data.BestPricesList[0].Departure).format("DD/MM/YYYY");

          bestPrices[date] = response.data.BestPricesList[0];

          numberOfResultsFound++;
        }
      });

      return {
        ...state,
        bestPrices,
        hasFinishedProcessing: true,
        numberOfResultsFound,
      };
    }

    case RESET_PROCESSING_FLAG: {
      return { ...state, hasFinishedProcessing: undefined };
    }

    default:
      return INITIAL_STATE;
  }
}