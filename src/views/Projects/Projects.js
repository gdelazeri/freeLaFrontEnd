import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Modal } from 'reactstrap';
import Auth from '../../helpers/auth';
import FreeLaApi from '../../services/freeLaApi';
import moment from 'moment';

class Projects extends Component {

  constructor(props) {
    super(props);
    Auth.checkSession();

    this.state = {
      projects: [],
      projectsFiltered: [],
      filterClient: "",
      filterName: "",
      filterDateBeginStart: "",
      filterDateEndStart: "",
      filterDateBeginExpected: "",
      filterDateEndExpected: "",
    }

    this.handleInput = this.handleInput.bind(this);
    this.search = this.search.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  componentWillMount(){
    this.getAllProjects();  
  }

  async getAllProjects(){
    const projects = await FreeLaApi.projectList(sessionStorage.getItem('userEmail').trim());
    this.setState({ projectsFiltered: projects.data, projects: projects.data });
  }

  handleInput(e, name) {
    this.setState({ [name]: e.target.value });
  }

  search(){
    const projectsFiltered = this.state.projects.filter(p => {
      let returnable = true;
      if (this.state.filterClient !== "")
        returnable = p['clientemail'].trim() === this.state.filterClient;
      
      if (this.state.filterName !== "" && returnable)
        returnable = p['name'].trim() === this.state.filterName;
      
     if (this.state.filterDateBeginStart !== "" && returnable)
        returnable = moment(p['startdate']).format() >= moment(this.state.filterDateBeginStart).format();
      
      if (this.state.filterDateEndStart !== "" && returnable)
        returnable = moment(p['startdate']).format() <= moment(this.state.filterDateEndStart).format();
      
      if (this.state.filterDateBeginExpected !== "" && returnable)
        returnable = moment(p['expectedenddate']).format() >= moment(this.state.filterDateBeginExpected).format();
      
      if (this.state.filterDateEndExpected !== "" && returnable)
        returnable = moment(p['expectedenddate']).format() <= moment(this.state.filterDateEndExpected).format();

      if (returnable)
        return p;
    });
    this.setState({ projectsFiltered });
  }

  removeFilter(){
    this.setState({ projectsFiltered: this.state.projects,
                    filterClient: "",
                    filterName: "",
                    filterDateBeginStart: "",
                    filterDateEndStart: "",
                    filterDateBeginExpected: "",
                    filterDateEndExpected: "",
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <strong><i className="fa fa-briefcase"></i>  Projetos</strong>
                <a className="btn btn-sm btn-success pull-right" href="/#/projectAdd"><i className="fa fa-plus"></i> Novo</a>
              </CardHeader>
              <CardBody>
                <p>Refine sua busca:</p>
                <Row>
                  <Col md={2}>
                    <strong>Projeto</strong>
                  </Col>
                  <Col md={2}>
                    <strong>Cliente (email)</strong>
                  </Col>
                  <Col md={4}>
                    <strong>Data início</strong>
                  </Col>
                  <Col md={4}>
                    <strong>Data fim (previsão)</strong>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <input className='form-control' type='text' value={this.state.filterName} onChange={(e) => this.handleInput(e, 'filterName')} />
                  </Col>
                  <Col md={2}>
                    <input className='form-control' type='text' value={this.state.filterClient} onChange={(e) => this.handleInput(e, 'filterClient')} />
                  </Col>
                  <Col md={2}>
                    <input className='form-control' type='date' value={this.state.filterDateBeginStart} onChange={(e) => this.handleInput(e, 'filterDateBeginStart')} /> 
                  </Col>
                  <Col md={2}>
                    <input className='form-control' type='date' value={this.state.filterDateEndStart} onChange={(e) => this.handleInput(e, 'filterDateEndStart')} />
                  </Col>
                  <Col md={2}>
                    <input className='form-control' type='date' value={this.state.filterDateBeginExpected} onChange={(e) => this.handleInput(e, 'filterDateBeginExpected')} />
                  </Col>
                  <Col md={2}>
                    <input className='form-control' type='date' value={this.state.filterDateEndExpected} onChange={(e) => this.handleInput(e, 'filterDateEndExpected')} />
                  </Col>
                </Row>
                <Row style={{paddingTop: '10px', paddingBottom: '15px'}}>
                  <Col md={11}>
                    <button className="btn btn-sm btn btn-warning" onClick={this.removeFilter}><i className="fa fa-eraser"></i> Remover Filtros</button>
                  </Col>
                  <Col md={1}>
                    <button className="btn pull-right btn-sm btn btn-info" onClick={this.search}><i className="fa fa-search"></i> Buscar</button>
                  </Col>
                </Row> 
                <Table hover responsive className="table-outline mb-0 d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th>Nome</th>
                      <th>Cliente</th>
                      <th>Início</th>
                      <th>Fim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.projectsFiltered.map((item) => {
                      let enddate = 'A definir';
                      if (item.enddate) {
                        enddate = <td>{moment(item.enddate).format('DD/MM/YYYY')}</td>;
                      } else if (item.expectedenddate) {
                        enddate = <td>{moment(item.expectedenddate).format('DD/MM/YYYY')} <sub>previsão</sub></td>;
                      }
                      return <tr key={item.id.toString()}>
                        <td><a href={`/#/project?id=${item.id}`} className='text-bold'><b>{item.name}</b></a></td>
                        <td>{item.clientemail}</td>
                        <td>{moment(item.startdate).format('DD/MM/YYYY')}</td>
                        {enddate}
                      </tr> 
                    }
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

export default Projects;
