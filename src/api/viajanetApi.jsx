import axios from 'axios';

const AUTOCOMPLETE_URL = 'https://www.passagensaereas.com.br/resources/api/Autocomplete';
const BEST_PRICES_URL = 'https://pricing-api.viajanet.com.br/price/best-prices-list';

class ViajanetApi {
  static getAutocompleteInfo = typedValue => axios.post(AUTOCOMPLETE_URL, {Keyword: typedValue, ReturnType: 1});
  static getBestPriceTrip = body => axios.post(BEST_PRICES_URL, body);
}

export default ViajanetApi;