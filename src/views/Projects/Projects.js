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
    }
  }

  componentWillMount(){
    this.getAllProjects();  
  }

  async getAllProjects(){
    const projects = await FreeLaApi.projectList(Number(sessionStorage.getItem('userId')));
    this.setState({ projects: projects.data });
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
                <Table hover responsive className="table-outline mb-0 d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th>Nome</th>
                      <th>Início</th>
                      <th>Fim</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.projects.map(item =>
                      <tr key={item.id.toString()}>
                        <td><a href={`/#/project?id=${item.id}`}><b>{item.name}</b></a></td>
                        <td>{moment(item.startDate).format('DD/MM/YYYY')}</td>
                        <td>{moment(item.endDate).format('DD/MM/YYYY')}</td>
                        <td>{item.value}</td>
                      </tr> 
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
