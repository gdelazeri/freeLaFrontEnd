import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import FreeLaApi from '../../services/freeLaApi';
import Client from './Client'
import ClientForm from './ClientForm'
import usersData from './UsersData'

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      client: undefined,
      clientForm: undefined,
      clients: [],
    }

    this.toggleClientDetails = this.toggleClientDetails.bind(this);
    this.row = this.row.bind(this);
    this.handleClientFormInput = this.handleClientFormInput.bind(this);
    this.handleClientFormSubmit = this.handleClientFormSubmit.bind(this);
    this.handleClientFormReset = this.handleClientFormReset.bind(this);
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

  row(client) {
    return (
      <tr onClick={() => this.toggleClientDetails(client)} key={client.id.toString()}>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.phone1}</td>
      </tr>
    )
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
        // EDIT
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
      clientForm: undefined,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            {this.state.client && <Client data={this.state.client} />}
            {!this.state.client && 
              <ClientForm data={this.state.clientForm} handleInput={this.handleClientFormInput} handleSubmit={this.handleClientFormSubmit} handleReset={this.handleClientFormReset} />
            }
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
                      <th>Telefone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clients.map(item =>
                      this.row(item)
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
