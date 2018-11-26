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
  Collapse,
} from 'reactstrap';
import FreeLaApi from '../../services/freeLaApi'
import queryString from 'query-string';

class ProjectAddItens extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: { },
      error: '',
    }
    const parsedURLParams = queryString.parse(props.location.search);
    this.projectId = parsedURLParams.projectId;
    this.id = parsedURLParams.id;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    if (this.id) {
      const item = await FreeLaApi.projectGetItem(this.id);
      this.setState({ item });
    }
  }

  handleInput(e) {
    if (e) {
      const name = e.target.name;
      const value = e.target ? e.target.value : undefined;
      this.setState({ item: { ...this.state.item, [name]: value } });
    }
  }

  async handleSubmit() {
    const item = this.state.item;
    let response;
    if (item.id) {
      response = await FreeLaApi.projectItemEdit(item, this.id);
    } else {
      response = await FreeLaApi.projectItemAdd(item, this.id);
    }
    if (response.success) {
      window.location.href = `/#/projectItem?id=${item.id}`;
    }
    return false;
  }

  toggleItem(id) {
    let itensOpened = this.state.itensOpened;
    if (itensOpened.includes(id)) {
      itensOpened = itensOpened.filter(itemId => itemId !== id);
    } else {
      itensOpened.push(id);
    }
    this.setState({ itensOpened });
  }

  next() {
    window.location.href = `/#/project?id=${this.id}`;
  }

  editItem(item) {
    this.setState({ item });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>  
                <strong><i className="fa fa-list-alt"></i>&nbsp;{this.id ? 'Editar' : 'Novo'} item</strong>
              </CardHeader>
              <CardBody>
                <Form encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}>
                  {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="text-input">Nome do item*</Label>
                        <Input required value={this.state.item.name} onChange={this.handleInput} type="text" name="name" />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label htmlFor="text-input">Valor</Label>
                        <Input required value={this.state.item.value} onChange={this.handleInput} type="text" name="value" />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label htmlFor="text-input">Data estimada de fim</Label>
                        <Input required value={this.state.item.expectedEndDate ? this.state.item.expectedEndDate : undefined} onChange={this.handleInput} type="date" name="expectedEndDate" />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label htmlFor="text-input">Descrição do item</Label>
                        <Input type="textarea" rows={5} value={this.state.item.description} onChange={this.handleInput} name="description" placeholder="Escreva a descrição do item do projeto..." />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter className='text-right'>
                <Button onClick={this.next} className='mr-1' color='success'>Avançar</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProjectAddItens;
