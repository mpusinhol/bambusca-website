import moment from 'moment';

import {
  ON_GET_BEST_PRICE_SUCCESS,
  ON_GET_BEST_PRICE_FAILURE,
} from '../actions/viajanetActions';

const INITIAL_STATE = {
  bestPrices: {},
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ON_GET_BEST_PRICE_SUCCESS: {
      let { bestPrices } = state;

      const date = moment(action.payload.BestPricesList[0].Departure).format("DD/MM/YYYY");

      bestPrices[date] = action.payload.BestPricesList[0];

      return {
        bestPrices
      };
    }

    case ON_GET_BEST_PRICE_FAILURE:
    default:
      return INITIAL_STATE;
  }
}