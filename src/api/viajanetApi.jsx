import axios from 'axios';

const AUTOCOMPLETE_URL = 'https://www.passagensaereas.com.br/resources/api/Autocomplete';

class ViajanetApi {
  static getAutocompleteInfo = typedValue => axios.post(AUTOCOMPLETE_URL, {Keyword: typedValue, ReturnType: 1});
}

export default ViajanetApi;