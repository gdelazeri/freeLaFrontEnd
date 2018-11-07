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

  static async clientEdit(client) {
    return new Promise((resolve, reject) => {
      axios.put(`${HEROKU_ENDPOINT}/client/edit/${client.id}`, client)
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

  static async professionalAdd(professional) {
    delete professional.confirmPassword;
    return new Promise((resolve, reject) => {
      axios.post(`${HEROKU_ENDPOINT}/professional/add`, professional)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async professionalEdit(professional) {
    return new Promise((resolve, reject) => {
      axios.put(`${HEROKU_ENDPOINT}/professional/edit/${professional.id}`, professional)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async professionalList() {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/professional/list`)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectAdd(project) {
    return new Promise((resolve, reject) => {
      axios.post(`${HEROKU_ENDPOINT}/project/add`, project)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectEdit(project) {
    return new Promise((resolve, reject) => {
      axios.put(`${HEROKU_ENDPOINT}/project/edit/${project.id}`, project)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectList(professionalId) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/list/${professionalId}`)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async login(user) {
    console.log({user});
    return new Promise((resolve, reject) => {
      axios.post(`${HEROKU_ENDPOINT}/login/`, user)
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