import axios from 'axios';

const API_URL = "localhost:1337";

class usersApi {
  static getUsers = () => axios.get(`${API_URL}/users`)
}

export default usersApi;