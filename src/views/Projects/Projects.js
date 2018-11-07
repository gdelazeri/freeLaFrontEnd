import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Modal } from 'reactstrap';
import Auth from '../../helpers/auth';
import FreeLaApi from '../../services/freeLaApi';

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

  handleEdit(projectId) {

  }

  handleDetails(projectId) {
    
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <strong><i className="fa fa-business"></i>  Projetos</strong>
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th>Nome</th>
                      <th>Cliente</th>
                      <th>Início</th>
                      <th>Valor</th>
                      <th width="10%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.projects.map(item =>
                      <tr key={item.id.toString()}>
                        <td><a onClick={() => this.toggleClientDetails(item)}><b>{item.name}</b></a></td>
                        <td>{item.name}</td>
                        <td>{item.name}</td>
                        <td>{item.name}</td>
                        <td>{item.name}</td>
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
