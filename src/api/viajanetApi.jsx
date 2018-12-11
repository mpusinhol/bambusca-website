import axios from 'axios';

const AUTOCOMPLETE_URL = 'http://pricing-api.viajanet.com.br/price/best-prices-list';

class ViajanetApi {
  static getBestPriceTrip = body => axios.post(AUTOCOMPLETE_URL, body);
}

export default ViajanetApi;