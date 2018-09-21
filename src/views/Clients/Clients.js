import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

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

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      client: undefined,
      clientForm: undefined,
      clients: [],
    }

    this.toggleClientDetails = this.toggleClientDetails.bind(this);
    this.handleClientFormInput = this.handleClientFormInput.bind(this);
    this.handleClientFormSubmit = this.handleClientFormSubmit.bind(this);
    this.handleClientFormReset = this.handleClientFormReset.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount(){
    this.getAllClients();  
  }

  async getAllClients(){
    const clients = await FreeLaApi.clientList();
    this.setState({ clients: clients.data });
  }

  toggleClientDetails(client) {
    this.setState({ client });
  }

  handleClientFormInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ 
      clientForm: {...this.state.clientForm, [name]: value },
    });
  }

  async handleClientFormSubmit(){
    const client = this.state.clientForm;
    if (client) {
      if (client.id) {
        const resp = await FreeLaApi.clientEdit(client);
        if (resp.success) {
          this.setState({ client: resp.data });
          this.getAllClients();
        }
      } else {
        const resp = await FreeLaApi.clientAdd(client);
        if (resp.success) {
          this.setState({ client: resp.data });
          this.getAllClients();
        }
      }
    }
  }

  handleClientFormReset(){
    this.setState({ 
      clientForm: clientModel,
    });
  }

  handleEdit(client) {
    this.setState({ 
      clientForm: client,
      client: undefined,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            {this.state.client && <Client data={this.state.client} handleEdit={this.handleEdit} />}
            {!this.state.client && <ClientForm data={this.state.clientForm} handleInput={this.handleClientFormInput} handleSubmit={this.handleClientFormSubmit} handleReset={this.handleClientFormReset} />}
          </Col>
          <Col xl={6}>
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
                      <th width='10%'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clients.map(item =>
                      <tr key={item.id.toString()}>
                        <td><a onClick={() => this.toggleClientDetails(item)}><b>{item.name}</b></a></td>
                        <td>{item.email}</td>
                        <td><Button type="button" onClick={() => this.handleEdit(item)} size="sm" color="warning"><i className="fa fa-pencil"></i></Button></td>
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

export default Users;
