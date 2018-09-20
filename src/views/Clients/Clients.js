import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import Client from './Client'
import ClientForm from './ClientForm'
import usersData from './UsersData'

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      client: undefined,
      clientForm: undefined
    }

    this.toggleClientDetails = this.toggleClientDetails.bind(this);
    this.row = this.row.bind(this);
    this.handleClientFormInput = this.handleClientFormInput.bind(this);
    this.handleClientFormSubmit = this.handleClientFormSubmit.bind(this);
    this.handleClientFormReset = this.handleClientFormReset.bind(this);
  }

  toggleClientDetails(client) {
    this.setState({ client });
  }

  row(client) {
    const getBadge = (status) => {
      return status === 'Active' ? 'success' :
        status === 'Inactive' ? 'secondary' :
          status === 'Pending' ? 'warning' :
            status === 'Banned' ? 'danger' :
              'primary'
    }
  
    return (
      <tr onClick={() => this.toggleClientDetails(client)} key={client.id.toString()}>
          <td>{client.name}</td>
          <td>{client.registered}</td>
          <td>{client.role}</td>
          <td><Badge color={getBadge(client.status)}>{client.status}</Badge></td>
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

  handleClientFormSubmit(){
    const client = this.state.clientForm;
    if (client) {
      if (client.id) {
        // ADD
      } else {
        // EDIT
      }
    }
  }

  handleClientFormReset(){
    this.setState({ 
      clientForm: undefined,
    });
  }

  render() {
    const userList = usersData.filter((user) => user.id < 10)
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
                  <thead className="thead-light text-capitalize">
                    <tr>
                      <th>name</th>
                      <th>registered</th>
                      <th>role</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      this.row(user)
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
