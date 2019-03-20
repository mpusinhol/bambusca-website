import { SAVE_REQUEST_FORM_DATA, RESET_REQUEST_FORM_DATA } from '../actions/requestActions';

const INITIAL_STATE = {
  originIATA: undefined,
  destinationIATA: undefined,
  isRoundTrip: undefined,
  month: undefined,
  year: undefined,
  minDays: undefined,
  maxDays: undefined,
  adults: 1,
  children: 0,
  babies: 0
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_REQUEST_FORM_DATA: {
      return {
        originIATA: action.payload.originIATA,
        destinationIATA: action.payload.destinationIATA,
        originIATADescription: action.payload.originIATADescription,
        destinationIATADescription: action.payload.destinationIATADescription,
        isRoundTrip: action.payload.isRoundTrip,
        month: action.payload.month,
        year: action.payload.year,
        minDays: action.payload.minDays,
        maxDays: action.payload.maxDays,
        adults: action.payload.adults || 1,
        children: action.payload.children || 0,
        babies: action.payload.babies || 0
      };
    }

    case RESET_REQUEST_FORM_DATA:
    default:
      return INITIAL_STATE;
  }
}