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
      itens: [],
      itensOpened: [],
      error: '',
    }
    const parsedURLParams = queryString.parse(props.location.search);
    this.id = parsedURLParams.id;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getItens = this.getItens.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.next = this.next.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  handleInput(e) {
    if (e) {
      const name = e.target.name;
      const value = e.target ? e.target.value : undefined;
      this.setState({ item: { ...this.state.item, [name]: value } });
    }
  }

  componentWillMount() {
    this.getItens();
  }

  async getItens() {
    const itens = await FreeLaApi.projectGetItens(this.id);
    if (itens.success) {
      this.setState({ itens: itens.data });
    }
  }

  async handleSubmit() {
    const item = this.state.item;
    const response = await FreeLaApi.projectItemAdd(item, this.id);
    if (response.success) {
      this.setState({ item: {} });
    }
    this.getItens();
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
                <strong><i className="fa fa-list-alt"></i>&nbsp;Adicione itens ao seu projeto</strong>
              </CardHeader>
              <CardBody>
                {this.state.itens.map((item, index) => 
                  <Card key={index}>
                    <CardHeader onClick={() => this.toggleItem(item.id)}><strong>#{index+1}</strong>&nbsp;&nbsp;{item.name}</CardHeader>
                    <Collapse isOpen={this.state.itensOpened.includes(item.id)}>
                      <CardBody>
                        <a className='btn btn-sm btn-warning pull-right' onClick={() => this.editItem(item)}><i className='fa fa-pencil'/></a>
                        <Row>
                          <Col md={6} className='mb-2'>
                            <p className='mb-1'><b>Valor:</b></p>
                            <p className='mb-1'>{item.value ? `${item.value}` : '-'}</p>
                          </Col>
                          <Col md={6} className='mb-2'>
                            <p className='mb-1'><b>Data estimada de entrega:</b></p>
                            <p className='mb-1'>{item.expectedenddate ? moment(item.expectedenddate).format('DD/MM/YYYY') : '-'}</p>
                          </Col>
                          <Col md={12} className='mb-2'>
                            <p className='mb-1'><b>Descrição:</b></p>
                            <p className='mb-1'>{item.description}</p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                )}
                <Card>
                  <Form encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}>
                    {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                    <CardBody>
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
                    </CardBody>
                    <CardFooter className='text-right'>
                      <Button onClick={this.handleSubmit} className='mr-1 btn-sm' color='success'>Salvar item</Button>
                    </CardFooter>
                  </Form>
                </Card>
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
