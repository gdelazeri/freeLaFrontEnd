import React, { Component } from 'react';
import { Row, Col, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form, Alert, Collapse } from 'reactstrap';
import moment from 'moment';
import queryString from 'query-string';
import FreeLaApi from '../../services/freeLaApi';

class Project extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      project: {
      },
      briefing: [],
      itens: [],
      briefingHistory: false,
      modalOpenAdd: false,
    }
    const parsedURLParams = queryString.parse(props.location.search);
    this.id = parsedURLParams.id;
    this.toggleModalAddItem = this.toggleModalAddItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleBriefingHistory = this.toggleBriefingHistory.bind(this);
  }

  async componentWillMount(){
    const project = await FreeLaApi.projectGet(this.id);
    const briefing = await FreeLaApi.projectGetBriefing(this.id);
    const itens = await FreeLaApi.projectGetItens(this.id);
    if (project.success) {
      this.setState({ project: project.data, briefing: briefing.data, itens: itens.data });
    }
  }

  toggleModalAddItem(itemId) {
    if (itemId) {
      const item = this.state.itens.find(i => i.id === itemId) || { };;
      this.setState({ modalItem: item, modalOpenAdd: !this.state.modalOpenAdd });
    } else {
      this.setState({ modalOpenAdd: !this.state.modalOpenAdd });
    }
  }

  handleInput(e) {
    if (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ modalItem: { ...this.state.modalItem, [name]: value } });
    }
  }

  async handleSubmit() {
    let item = this.state.modalItem;
    if (item.id) {
      item = await FreeLaApi.projectItemAdd(item, this.state.project.id);
    } else {
      item = await FreeLaApi.projectItemEdit(item, this.state.project.id);
    }
    if (item.success) {
      const itens = await FreeLaApi.projectGetItens(this.state.project.id);
      this.setState({ itens: itens.data, modalOpenAdd: false });
    }
  }

  toggleBriefingHistory(){
    this.setState({ briefingHistory: !this.state.briefingHistory });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong className='font-18'>{this.state.project.name}</strong>
            <Button type="button" className="pull-right" onClick={() => this.props.handleEdit(this.state.project)} size="sm" color="warning"><i className="fa fa-pencil"></i></Button>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={12} className='mb-2'>
                <p className='mb-1 font-16'><b>Briefing:</b>&nbsp;
                  {this.state.briefing.length > 1 && <a className='font-12' onClick={this.toggleBriefingHistory}>{this.state.briefingHistory ? 'Ocultar histórico' : 'Ver histórico'}</a>}
                </p>
                <p className='mb-1'>{this.state.briefing.length > 0 ? this.state.briefing[0].briefing : ''}</p>
                <Collapse isOpen={this.state.briefingHistory}>
                  {this.state.briefing.map((bri, index) => {
                    if (index > 0) {
                      return <p className='mb-1'>
                        <b>{moment(bri.date).format('DD/MM/YYYY HH:MM')}</b> - {bri.briefing}
                      </p>
                    }
                  })}
                </Collapse>
              </Col>
              <Col md={6} className='mb-2'>
                <p className='mb-1 font-16'><b>Preferências:</b></p>
                <p className='mb-1'>{this.state.project.likes ? this.state.project.likes : '-'}</p>
              </Col>
              <Col md={6} className='mb-2'>
                <p className='mb-1 font-16'><b>O que evitar:</b></p>
                <p className='mb-1'>{this.state.project.dislikes ? this.state.project.dislikes : '-'}</p>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col md={4} className='mb-2'>
                <p className='mb-1 font-16'><b>Data de início:</b></p>
                <p className='mb-1'>{this.state.project.startdate ? moment(this.state.project.startdate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={4} className='mb-2'>
                <p className='mb-1 font-16'><b>Data de fim:</b></p>
                <p className='mb-1'>{this.state.project.enddate ? moment(this.state.project.enddate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={4} className='mb-2'>
                <p className='mb-1 font-16'><b>Data da apresentação:</b></p>
                <p className='mb-1'>{this.state.project.presentationdate ? moment(this.state.project.presentationdate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={6} className='mb-2'>
                <p className='mb-1 font-16'><b>Valor Total:</b></p>
                <p className='mb-1'>R$ {this.state.project.totalvalue ? this.state.project.totalvalue : '-'}</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong className=''>Itens do projeto</strong>
            <Button type="button" className="pull-right" onClick={this.toggleModalAddItem} size="sm" color="success"><i className="fa fa-plus"></i></Button>
          </CardHeader>
          <CardBody>
            <Table hover responsive className="table-outline mb-0 d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th>Nome</th>
                  <th width="15%">Etapa</th>
                  <th width="15%">Fim</th>
                  <th width="10%"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.itens.map(item =>
                  <tr key={item.id.toString()}>
                    <td><a href={`/#/projectItem?id=${item.id}`}><b>{item.name}</b></a></td>
                    <td>{item.stageid}</td>
                    <td>
                      {item.enddate ? moment(item.enddate).format('DD/MM/YYYY') : [moment(item.presentationdate).format('DD/MM/YYYY'), <sub> previsão</sub>]}</td>
                    <td><a className="btn btn-sm btn-warning pull-right" href={`/#/projectAddItem?id=${item.id}&projectId=${item.projectid}`}><i className="fa fa-pencil"></i></a></td>
                  </tr>
                )}
                {this.state.itens.length === 0 &&
                  <tr><td className='text-center' colSpan={4}>Nenhum item foi adicionado</td></tr>
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Project;
