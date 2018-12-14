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
      itensFiltered: [],
      briefingHistory: false,
      modalOpenAdd: false,
      filterName: "",
      filterDateBeginExpected: "",
      filterDateEndExpected: "",
    }
    const parsedURLParams = queryString.parse(props.location.search);
    this.id = parsedURLParams.id;
    this.toggleModalAddItem = this.toggleModalAddItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleBriefingHistory = this.toggleBriefingHistory.bind(this);
    this.search = this.search.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.handleInputFilter = this.handleInputFilter.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  async componentWillMount(){
    const project = await FreeLaApi.projectGet(this.id);
    const briefing = await FreeLaApi.projectGetBriefing(this.id);
    const itens = await FreeLaApi.projectGetItens(this.id);
    if (project.success) {
      this.setState({ project: project.data, briefing: briefing.data, itens: itens.data, itensFiltered: itens.data });
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

  handleInputFilter(e, name) {
    this.setState({ [name]: e.target.value });
  }

  search(){
    const itensFiltered = this.state.itens.filter(i => {
      let returnable = true;
      if (this.state.filterName !== "")
        returnable = i['name'].trim() === this.state.filterName;
      
      if (this.state.filterDateBeginExpected !== "" && returnable)
        returnable = moment(i['expectedenddate']).format() >= moment(this.state.filterDateBeginExpected).format();
      
      if (this.state.filterDateEndExpected !== "" && returnable)
        returnable = moment(i['expectedenddate']).format() <= moment(this.state.filterDateEndExpected).format();

      if (returnable)
        return i;
    });
    this.setState({ itensFiltered });
  }

  removeFilter(){
    this.setState({ itensFiltered: this.state.itens,
                    filterName: "",
                    filterDateBeginExpected: "",
                    filterDateEndExpected: "",
    });
  }

  toggleVisible(itemId) {
    const itemIndex = this.state.itens.findIndex(item => item.id === itemId);
    const itens = this.state.itens;
    itens[itemIndex].visibility = !itens[itemIndex].visibility;
    this.setState({ itens });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong className='font-18'>{this.state.project.name}</strong>
            <a className="btn btn-sm btn-warning pull-right" href={`/#/projectEdit?id=${this.state.project.id}`}><i className="fa fa-pencil"></i></a>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={12} className='mb-2'>
                <p className='mb-1'><b>Briefing:</b></p>
                <p className='mb-1'>{this.state.project.briefing}</p>
              </Col>
              <Col md={6} className='mb-2'>
                <p className='mb-1'><b>Preferências:</b></p>
                <p className='mb-1'>{this.state.project.likes ? this.state.project.likes : '-'}</p>
              </Col>
              <Col md={6} className='mb-2'>
                <p className='mb-1'><b>O que evitar:</b></p>
                <p className='mb-1'>{this.state.project.dislikes ? this.state.project.dislikes : '-'}</p>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col md={3} className='mb-2'>
                <p className='mb-1'><b>Data de início:</b></p>
                <p className='mb-1'>{this.state.project.startdate ? moment(this.state.project.startdate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={3} className='mb-2'>
                <p className='mb-1'><b>Data da apresentação:</b></p>
                <p className='mb-1'>{this.state.project.presentationdate ? moment(this.state.project.presentationdate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={3} className='mb-2'>
                <p className='mb-1'><b>Data esperada de fim:</b></p>
                <p className='mb-1'>{this.state.project.expectedenddate ? moment(this.state.project.expectedenddate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={3} className='mb-2'>
                <p className='mb-1'><b>Data de fim:</b></p>
                <p className='mb-1'>{this.state.project.enddate ? moment(this.state.project.enddate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={6} className='mb-2'>
                <p className='mb-1'><b>Valor Total:</b></p>
                <p className='mb-1'>{this.state.project.totalvalue ? this.state.project.totalvalue : '-'}</p>
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
            <p>Refine sua busca:</p>
            <Row>
              <Col md={2}>
                <strong>Nome</strong>
              </Col>
              <Col md={4}>
                <strong>Data fim (Prevista)</strong>
              </Col>
              <Col md={3}>
                <strong>Visibilidade</strong>
              </Col>
              <Col md={3}>
                <strong>Status</strong>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <input className='form-control' type='text' value={this.state.filterName} onChange={(e) => this.handleInputFilter(e, 'filterName')} />
              </Col>
              <Col md={2}>
                <input className='form-control' type='date' value={this.state.filterDateBeginExpected} onChange={(e) => this.handleInputFilter(e, 'filterDateBeginExpected')} />
              </Col>
              <Col md={2}>
                <input className='form-control' type='date' value={this.state.filterDateEndExpected} onChange={(e) => this.handleInputFilter(e, 'filterDateEndExpected')} />
              </Col>
              <Col md={3}>
                <select className='form-control'>
                  <option disabled selected value> -- Selecione visibilidade -- </option>
                  <option value='name'>Visível</option>
                  <option value='clientemail'>Oculto</option>
                </select>
              </Col>
              <Col md={3}>
                <select className='form-control'>
                  <option disabled selected value> -- Selecione status -- </option>
                  <option value='name'>Aprovado</option>
                  <option value='clientemail'>Pendente</option>
                  <option value='clientemail'>Rejeitado</option>
                </select>
              </Col>
            </Row>
            <Row style={{paddingTop: '10px', paddingBottom: '15px'}}>
              <Col md={12}>
                <button className="btn btn-sm btn btn-warning" onClick={this.removeFilter}><i className="fa fa-eraser"></i> Remover Filtros</button>
                <button className="btn pull-right btn-sm btn btn-info" onClick={this.search}><i className="fa fa-search"></i> Buscar</button>
              </Col>
            </Row> 
            <Table hover responsive className="table-outline mb-0 d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th>Nome</th>
                  <th className='text-center' width="15%">Fim</th>
                  <th className='text-center' width="15%">Visibilidade</th>
                  <th className='text-center' width="15%">Status</th>
                  <th width="5%"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.itensFiltered.map(item =>
                  <tr key={item.id.toString()}>
                    <td><a href={`/#/projectItem?id=${item.id}`}><b>{item.name}</b></a></td>
                    <td className='text-center'>
                      {item.enddate ? moment(item.enddate).format('DD/MM/YYYY') : [moment(item.expectedenddate).format('DD/MM/YYYY'), <sub> previsão</sub>]}</td>
                    <td className='text-center'>
                      {item.visibility && <i title='Visível para o cliente' onClick={() => this.toggleVisible(item.id)} className="pointer fa fa-eye" style={{fontSize: '20px'}}></i>}
                      {!item.visibility && <i title='Oculto para o cliente' onClick={() => this.toggleVisible(item.id)} className="pointer fa fa-eye-slash" style={{color: '#a4a6a8', fontSize: '20px'}}></i>}
                    </td>
                    <td className='text-center'>
                      {item.visibility && <i title='Aguardando aprovação' className='fa fa-clock-o text-warning' style={{fontSize: '20px', marginLeft: '0.5em'}}></i>}
                      {!item.visibility && <i title='Em andamento' className='fa fa-cogs text-info' style={{fontSize: '20px', marginLeft: '0.5em'}}></i>}
                    </td>
                    <td><a className="btn btn-sm btn-warning pull-right" href={`/#/projectAddItem?id=${item.id}&projectId=${item.projectid}`}><i className="fa fa-pencil"></i></a></td>
                  </tr>
                )}
                {this.state.itens.length === 0 &&
                  <tr><td className='text-center' colSpan={5}>Nenhum item foi adicionado</td></tr>
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
