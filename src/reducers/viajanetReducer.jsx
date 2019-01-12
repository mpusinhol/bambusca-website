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
      let { bestPrices } = state;
      let numberOfResultsFound = 0;
      let lowestPrice = Number.POSITIVE_INFINITY;
      let lowestPriceDate = undefined;
      let highestPrice = 0;
      let highestPriceDate = undefined;
      const keyMonth = action.searchMonth;

      bestPrices[keyMonth] = {};

      action.payload.forEach(response => {
        if (response.data.BestPricesList) {
          const date = moment(response.data.BestPricesList[0].Departure).format("DD/MM/YYYY");
          const totalPrice = response.data.BestPricesList[0].FullPriceTotal;

          bestPrices[keyMonth][date] = response.data.BestPricesList[0];

          if (totalPrice < lowestPrice) {
            lowestPrice = totalPrice;
            lowestPriceDate = date;
          }

          if (totalPrice > highestPrice) {
            highestPrice = totalPrice;
            highestPriceDate = date;
          }

          numberOfResultsFound++;
        }
      });

      bestPrices[keyMonth].highestPriceDate = highestPriceDate;
      bestPrices[keyMonth].lowestPriceDate = lowestPriceDate;
      bestPrices[keyMonth].numberOfResultsFound = numberOfResultsFound;

      return {
        ...state,
        bestPrices,
        hasFinishedProcessing: true,
      };
    }

    case RESET_PROCESSING_FLAG: {
      return { ...state, hasFinishedProcessing: undefined };
    }

    default:
      return INITIAL_STATE;
  }
}