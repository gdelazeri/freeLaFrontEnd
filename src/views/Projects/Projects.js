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
    const projects = await FreeLaApi.projectList(sessionStorage.getItem('userEmail').trim());
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
                    {this.state.projects.map((item) => {
                      let enddate = 'A definir';
                      if (item.enddate) {
                        enddate = <td>{moment(item.enddate).format('DD/MM/YYYY')}</td>;
                      } else if (item.expectedenddate) {
                        enddate = <td>{moment(item.expectedenddate).format('DD/MM/YYYY')} <sub>previsão</sub></td>;
                      }
                      return <tr key={item.id.toString()}>
                        <td><a href={`/#/project?id=${item.id}`}><b>{item.name}</b></a></td>
                        <td>{moment(item.startdate).format('DD/MM/YYYY')}</td>
                        {enddate}
                        <td>{item.value}</td>
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
