import { HEROKU_ENDPOINT } from './endpoints.json';
import axios from 'axios';

class FreeLaApi {
  constructor() {
    
  }

  static async clientAdd(client) {
    client.password = "*";
    return new Promise((resolve, reject) => {
      axios.post(`${HEROKU_ENDPOINT}/client/add`, client)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async clientList(professionalId) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/client/list/${professionalId ? professionalId : ''}`)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }
}

export default FreeLaApi;