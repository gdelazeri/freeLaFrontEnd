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
    }

    this.handleDate = this.handleDate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount(){
    this.getAllProjects();  
  }

  async getAllProjects(){
    const projects = await FreeLaApi.projectList(sessionStorage.getItem('userEmail').trim());
    this.setState({ projectsFiltered: projects.data, projects: projects.data });
  }

  handleDate(e) {
    this.setState({ dateFilter: e.target.value });
  }

  handleInput(e, name) {
    this.setState({ [name]: e.target.value });
  }

  search(){
    console.log(this.state)
    const projectsFiltered = this.state.projects.filter(p => p[this.state.dateFilter] && moment(p[this.state.dateFilter]).format() < moment(this.state.filterDateEnd).format());
    this.setState({ projectsFiltered });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <strong><i className="fa fa-business"></i>  Projetos</strong>
                <a className="btn btn-sm btn-success pull-right" href="/#/projectAdd"><i className="fa fa-plus"></i> Novo</a>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                  <select className='form-control'>
                    <option value='name'>Projeto</option>
                    <option value='clientemail'>Cliente</option>
                  </select>
                  </Col>
                  <Col md={8}>
                  <input className='form-control' type='text' value={this.state.filter} />
                  </Col>
                  <Col md={4}>
                  <select className='form-control' defaultValue={this.state.dateFilter} onChange={this.handleDate}>
                    <option value='startdate'>Início</option>
                    <option value='enddate'>Fim</option>
                  </select>
                  De <input className='form-control' type='date' value={this.state.filterDateBegin} onChange={(e) => this.handleInput(e, 'filterDateBegin')} /> até <input className='form-control' type='date' value={this.state.filterDateEnd} onChange={(e) => this.handleInput(e, 'filterDateEnd')} />
                  </Col>
                  <button onClick={this.search}>Buscar</button>
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
                        <td><a href={`/#/project?id=${item.id}`}><b>{item.name}</b></a></td>
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
