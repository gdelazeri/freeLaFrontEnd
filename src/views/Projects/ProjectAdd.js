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
  Alert,
} from 'reactstrap';
import FreeLaApi from '../../services/freeLaApi'

class ProjectAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: {
        
      },
      error: '',
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

  async handleSubmit() {
    const project = this.state.project;
    const response = await FreeLaApi.projectAdd(project);
    if (response.success) {
      window.location.href = '/#/projects';
    } else {
      this.setState({ error: 'Erro ao salvar o projeto, confira se os campos obrigatórios foram preenchidos e salve novamente' });
    }
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
                {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                <Row>
                  <Col md="6">
                    <FormGroup>
                        <Label htmlFor="text-input">Nome do Projeto*</Label>
                        <Input required value={this.state.project.name} onChange={this.handleInput} type="text" name="name" placeholder="Nome" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Valor total</Label>
                        <Input required value={this.state.project.totalValue} onChange={this.handleInput} type="text" name="totalValue" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data de Início*</Label>
                        <Input required value={this.state.project.startDate} onChange={this.handleInput} type="date" name="startDate" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data de Fim*</Label>
                        <Input required value={this.state.project.endDate} onChange={this.handleInput} type="date" name="endDate" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data de Apresentação</Label>
                        <Input required value={this.state.project.presentationDate} onChange={this.handleInput} type="date" name="presentationDate" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label htmlFor="text-input">Briefing do Projeto*</Label>
                      <Input type="textarea" rows={5} value={this.state.project.briefing} onChange={this.handleInput} name="briefing" placeholder="Escreva a descrição principal do projeto, ideias e os objetivos..." />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="text-input">Gostos</Label>
                      <Input type="textarea" rows={4} value={this.state.project.likes} onChange={this.handleInput} name="likes" placeholder="Descreva as características que o cliente deseja expressar em seu projeto, gostos pessoais, imagem que gostaria de passar aos seus clientes..." />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="text-input">Desgostos</Label>
                      <Input type="textarea" rows={4} value={this.state.project.dislikes} onChange={this.handleInput} name="dislikes" placeholder="Descreva as características que o cliente NÃO deseja expressar em seu projeto..." />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
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

export default ProjectAdd;
