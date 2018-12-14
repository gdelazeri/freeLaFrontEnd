import React, { Component } from 'react';
import { Button, Form, Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalHeader, ModalBody, Label, Input, FormGroup } from 'reactstrap';
import Auth from '../../helpers/auth';
import FreeLaApi from '../../services/freeLaApi';
import moment from 'moment'

const clientModel = {
  name: undefined,
  email: undefined,
  cpf: undefined,
  phone1: undefined,
  phone2: undefined,
}

class Clients extends Component {

  constructor(props) {
    super(props);
    Auth.checkSession();

    this.state = {
      client: { },
      clients: [],
      clientProjects: [],
      modalOpen: false,
      modalAdd: false,
      editClient: false,
    }

    this.toggleClientDetails = this.toggleClientDetails.bind(this);
    this.toggleClientAdd = this.toggleClientAdd.bind(this);
    this.addClient = this.addClient.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.getClientProjects = this.getClientProjects.bind(this);
    this.editClient = this.editClient.bind(this);
  }

  componentWillMount(){
    this.getAllClients();  
  }

  async getAllClients(){
    const clients = await FreeLaApi.clientList();
    this.setState({ clients: clients.data });
  }

  async getClientProjects(clientemail){
    const professionalemail = sessionStorage.getItem('userEmail').trim();
    if (clientemail) {
      const clients = await FreeLaApi.projectList(professionalemail, clientemail);
      this.setState({ clientProjects: clients.data });
    } else {
      this.setState({ clientProjects: [] });
    }
  }

  async editClient() {
    const client = this.state.client;
    this.toggleEdit();
  }

  async addClient(){
    const client = this.state.client;
    client.professionalemail = sessionStorage.getItem('userEmail');
    await FreeLaApi.clientAdd(client);
    this.toggleClientAdd();
  }

  toggleEdit(){
    this.setState({ editClient: !this.state.editClient });
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ client: { ...this.state.client, [name]: value } });
  }

  async toggleClientDetails(client) {
    if (client.clientemail) {
      await this.getClientProjects(client.clientemail.trim());
    }
    this.setState({ client: client || { }, modalOpen: !this.state.modalOpen });
  }

  toggleClientAdd() {
    this.setState({ modalAdd: !this.state.modalAdd });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <strong><i className="fa fa-users"></i>  Clientes</strong>
                <Button className='btn btn-sm btn-success pull-right' onClick={this.toggleClientAdd}><i className="fa fa-plus"></i></Button>
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
                      <tr onClick={() => this.toggleClientDetails(item)} key={item.clientemail}>
                        <td><a className='text-bold'>{item.name}</a></td>
                        <td>{item.clientemail}</td>
                      </tr> 
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modalOpen} size="md" toggle={this.toggleClientDetails}>
          <ModalHeader toggle={this.toggleClientDetails}>
            {this.state.editClient ? 'Editar cliente' : 'Detalhes do cliente'}
          </ModalHeader>
          <ModalBody>
            {/* <Button onClick={this.toggleEdit} className='btn-sm float-right' color='warning'><i className='fa fa-pencil'></i></Button> */}
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="text-input">Nome</Label>
                {!this.state.editClient && <p className='mb-0'>{this.state.client.name}</p>}
                {this.state.editClient && <Input value={this.state.client.name} onChange={this.handleInput} type="text" id="text-input" name="name" placeholder="Digite o nome completo" />}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="clientemail-input">E-mail</Label>
                {!this.state.editClient && <p className='mb-0'>{this.state.client.clientemail}</p>}
                {this.state.editClient && <Input value={this.state.client.clientemail} onChange={this.handleInput} type="email" id="email-input" name="clientemail" placeholder="Digite o e-mail" autoComplete="email"/>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="cpf-input">CPF</Label>
                {!this.state.editClient && <p className='mb-0'>{this.state.client.cpf}</p>}
                {this.state.editClient && <Input value={this.state.client.cpf} onChange={this.handleInput} type="text" maxLength={11} id="cpf-input" name="cpf" placeholder="Informe o CPF (somente números)" />}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="phone1-input">Telefone 1</Label>
                {!this.state.editClient && <p className='mb-0'>{this.state.client.phone1}</p>}
                {this.state.editClient && <Input value={this.state.client.phone1} onChange={this.handleInput} type="text" maxLength={12} id="phone1-input" name="phone1" />}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="phone2-input">Telefone 2</Label>
                {!this.state.editClient && <p className='mb-0'>{this.state.client.phone2}</p>}
                {this.state.editClient && <Input value={this.state.client.phone2} onChange={this.handleInput} type="text" maxLength={12} id="phone2-input" name="phone2" />}
              </Col>
            </FormGroup>
            {this.state.editClient && <Button className='btn pull-right btn-sm btn-success' onClick={this.editClient}>Salvar</Button>}
            {!this.state.editClient &&
            <Row>
              <br/>
              <Col xs="12">
                <h5>Projetos recentes</h5>
                <Table>
                  <tbody>
                    {this.state.clientProjects.length > 0 && this.state.clientProjects.map(item =>
                      <tr key={item.id}>
                        <td><a href={`/#/project?id=${item.id}`}>{item.name}</a></td>
                      </tr> 
                    )}
                    {this.state.clientProjects.length === 0 && <tr>
                        <td className='text-center'>Nenhum projeto ainda</td>
                      </tr>}
                  </tbody>
                </Table>
              </Col>
            </Row>}
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalAdd} size="md" toggle={this.toggleClientAdd}>
          <ModalHeader toggle={this.toggleClientAdd}>Adicionar cliente</ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="text-input">Nome</Label>
                <Input value={this.state.client.name} onChange={this.handleInput} type="text" id="text-input" name="name" placeholder="Digite o nome completo" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="clientemail-input">E-mail</Label>
                <Input value={this.state.client.clientemail} onChange={this.handleInput} type="email" id="email-input" name="clientemail" placeholder="Digite o e-mail" autoComplete="email"/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="cpf-input">CPF</Label>
                <Input value={this.state.client.cpf} onChange={this.handleInput} type="text" maxLength={11} id="cpf-input" name="cpf" placeholder="Informe o CPF (somente números)" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="phone1-input">Telefone 1</Label>
                <Input value={this.state.client.phone1} onChange={this.handleInput} type="text" maxLength={12} id="phone1-input" name="phone1" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <Label className='mb-0 text-bold' htmlFor="phone2-input">Telefone 2</Label>
                <Input value={this.state.client.phone2} onChange={this.handleInput} type="text" maxLength={12} id="phone2-input" name="phone2" />
              </Col>
            </FormGroup>
            <Button className='btn pull-right btn-sm btn-success' onClick={this.addClient}>Salvar</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default Clients;
