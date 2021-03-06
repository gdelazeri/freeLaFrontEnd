import { HEROKU_ENDPOINT } from './endpoints.json';
import axios from 'axios';

class FreeLaApi {
  constructor() {
    
  }

  static async clientAdd(client) {
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

  static async clientList() {
    return new Promise((resolve, reject) => {
      const professionalemail = sessionStorage.getItem('userEmail').trim();
      axios.get(`${HEROKU_ENDPOINT}/client/list/${professionalemail}`)
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
    project.professionalemail = sessionStorage.getItem('userEmail').trim();
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

  static async projectList(professionalemail, clientemail) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/list/`, {
        params: {
          professionalemail,
          clientemail,
        },
      })
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }


  static async projectListCurrent(professionalemail) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/listCurrent/`, {
        params: {
          professionalemail,
        },
      })
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectGet(projectId) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/get/${projectId}`)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectGetBriefing(projectId) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/briefing/${projectId}`)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectGetItens(projectId) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/itens/${projectId}`)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async listNextItens(professionalemail) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/listNextItens/${professionalemail}`)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectItemComment(comment) {
    return new Promise((resolve, reject) => {
      axios.post(`${HEROKU_ENDPOINT}/project/addItemComment`, comment)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }  

  static async projectItemAdd(item, projectId) {
    item.projectId = projectId;
    return new Promise((resolve, reject) => {
      axios.post(`${HEROKU_ENDPOINT}/project/addItem`, item)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }
  
  static async projectItemEdit(item, projectId) {
    item.projectId = projectId;
    return new Promise((resolve, reject) => {
      axios.put(`${HEROKU_ENDPOINT}/project/editItem/${item.id}`, item)
        .then( (res) => {
          const response = JSON.parse(res.request.response);
          resolve(response);
        }).catch((error) => {
          const response = JSON.parse(error.request.response);
          reject(response);
        })
      })
  }

  static async projectGetItem(itemId) {
    return new Promise((resolve, reject) => {
      axios.get(`${HEROKU_ENDPOINT}/project/getItem/${itemId}`)
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