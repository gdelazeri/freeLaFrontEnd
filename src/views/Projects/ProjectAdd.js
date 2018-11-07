import React, { Component } from 'react';
import moment from 'moment';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import FreeLaApi from '../../services/freeLaApi'

class ClientForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: { }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    if (e) {
      const name = e.target.name;
      const value = e.target ? e.target.value : undefined;
      this.setState({ project: { ...this.state.project, [name]: value } });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const project = this.state.project;
    FreeLaApi.projectAdd(project);
    return false;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>  
                <strong><i className="fa fa-business"></i>  Novo Projeto</strong>
              </CardHeader>
              <CardBody>
                <Form encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                        <Label htmlFor="text-input">Nome do Projeto*</Label>
                        <Input required value={this.state.project.name} onChange={this.handleInput} type="text" name="name" placeholder="Nome" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data de Início*</Label>
                        <Input required value={this.state.project.initDate} onChange={this.handleInput} type="date" name="initDate" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data Estimada de Fim*</Label>
                        <Input required value={this.state.project.estimatedEndDate} onChange={this.handleInput} type="date" name="estimatedEndDate" />
                    </FormGroup>
                  </Col>
                  <br />
                  <Col md="12">
                    <FormGroup>
                      <Label htmlFor="text-input">Briefing do Projeto*</Label>
                      <Input type="textarea" rows={5} value={this.state.project.briefing} onChange={this.handleInput} name="briefing" />
                    </FormGroup>
                  </Col>
                  <br />
                  <Col md="4">
                    <FormGroup>
                        <Label htmlFor="text-input">Nome do Cliente*</Label>
                        <Input required value={this.state.project.clientName} onChange={this.handleInput} type="text" name="clientName" placeholder="Digite o nome completo" />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                        <Label htmlFor="text-input">E-mail do Cliente*</Label>
                        <Input required value={this.state.project.clientEmail} onChange={this.handleInput} type="email" name="clientEmail" placeholder="Digite o e-mail do cliente" />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                        <Label htmlFor="text-input">Telefone do Cliente*</Label>
                        <Input required value={this.state.project.clientPhone} onChange={this.handleInput} type="text" name="clientPhone" placeholder="(XX) XXXXX-XXXX" />
                    </FormGroup>
                  </Col>
                </Row>
                </Form>
              </CardBody>
              <CardFooter className='text-right'>
                  <Button onClick={this.handleSubmit} className='mr-1' color='success'>Salvar</Button>
                  <Button className='' color='outline-danger'>Cancelar</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ClientForm;
