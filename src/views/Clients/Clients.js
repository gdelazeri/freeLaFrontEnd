import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Modal } from 'reactstrap';
import Auth from '../../helpers/auth';
import FreeLaApi from '../../services/freeLaApi';
import Client from './Client'
import ClientForm from './ClientForm'

const clientModel = {
  name: undefined,
  email: undefined,
  birthdate: undefined,
  cpf: undefined,
  phone1: undefined,
  phone2: undefined,
  createdat: undefined,
}

class Clients extends Component {

  constructor(props) {
    super(props);
    Auth.checkSession();

    this.state = {
      client: undefined,
      clients: [],
    }

    this.toggleClientDetails = this.toggleClientDetails.bind(this);
  }

  componentWillMount(){
    this.getAllClients();  
  }

  async getAllClients(){
    const clients = await FreeLaApi.clientList(Number(sessionStorage.getItem('userId')));
    this.setState({ clients: clients.data });
  }

  toggleClientDetails(client) {
    this.setState({ client });
  }

  // handleClientFormInput(e) {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({ 
  //     clientForm: {...this.state.clientForm, [name]: value },
  //   });
  // }

  // async handleClientFormSubmit(){
  //   const client = this.state.clientForm;
  //   if (client) {
  //     if (client.id) {
  //       const resp = await FreeLaApi.clientEdit(client);
  //       if (resp.success) {
  //         this.setState({ client: resp.data });
  //         this.getAllClients();
  //       }
  //     } else {
  //       const resp = await FreeLaApi.clientAdd(client);
  //       if (resp.success) {
  //         this.setState({ client: resp.data });
  //         this.getAllClients();
  //       }
  //     }
  //   }
  // }

  // handleClientFormReset(){
  //   this.setState({ 
  //     clientForm: clientModel,
  //   });
  // }

  // handleEdit(client) {
  //   this.setState({ 
  //     clientForm: client,
  //     client: undefined,
  //   });
  // }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Modal isOpen={this.state.client}>
            <Client data={this.state.client} />
          </Modal>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <strong><i className="fa fa-users"></i>  Clientes</strong>
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th>Nome</th>
                      <th>E-mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clients.map(item =>
                      <tr key={item.id.toString()}>
                        <td><a onClick={() => this.toggleClientDetails(item)}><b>{item.name}</b></a></td>
                        <td>{item.email}</td>
                      </tr> 
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Clients;
