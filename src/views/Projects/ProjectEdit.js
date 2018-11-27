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
import FreeLaApi from '../../services/freeLaApi';
import queryString from 'query-string';

class ProjectAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: {
        professionalEmail: sessionStorage.getItem('email'),
        name: undefined,
        startdate: moment().format('YYYY-MM-DD'),
        enddate: undefined,
        presentationdate: undefined,
        totalvalue: undefined,
        likes: undefined,
        dislikes: undefined,
        briefing: undefined,
      },
      error: '',
    }

    const parsedURLParams = queryString.parse(props.location.search);
    this.id = parsedURLParams.id;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    if (this.id) {
      const project = await FreeLaApi.projectGet(this.id);
      this.setState({ project: project.data });
    }
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
    const response = await FreeLaApi.projectEdit(project);
    if (response.success) {
      window.location.href = `/#/project?id=${response.data.id}`;
    } else {
      this.setState({ error: 'Erro ao editar o projeto, confira se os campos obrigatórios foram preenchidos e salve novamente' });
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
                        <Input required value={this.state.project.totalvalue} onChange={this.handleInput} type="text" name="totalvalue" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data de Início*</Label>
                        <Input required value={this.state.project.startdate} onChange={this.handleInput} type="date" name="startdate" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data de Fim*</Label>
                        <Input required value={this.state.project.enddate} onChange={this.handleInput} type="date" name="enddate" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                        <Label htmlFor="text-input">Data de Apresentação</Label>
                        <Input required value={this.state.project.presentationdate} onChange={this.handleInput} type="date" name="presentationdate" />
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
                      <Label htmlFor="text-input">Preferências</Label>
                      <Input type="textarea" rows={4} value={this.state.project.likes} onChange={this.handleInput} name="likes" placeholder="Descreva as características que o cliente deseja expressar em seu projeto, gostos pessoais, imagem que gostaria de passar aos seus clientes..." />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="text-input">O que evitar</Label>
                      <Input type="textarea" rows={4} value={this.state.project.dislikes} onChange={this.handleInput} name="dislikes" placeholder="Descreva as características que o cliente NÃO deseja expressar em seu projeto..." />
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
