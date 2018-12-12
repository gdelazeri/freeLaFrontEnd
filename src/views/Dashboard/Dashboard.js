import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import Auth from '../../helpers/auth';
import moment from 'moment';
import FreeLaApi from '../../services/freeLaApi'
import { Link } from 'react-router-dom';
Auth.checkSession();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    Auth.checkSession();

    this.state = {
      projects: [],
      nextItens: [],
    }
  }

  async componentWillMount(){
    await this.getAllProjects();
    this.listNextItens();
  }

  async listNextItens(){
    const itens = await FreeLaApi.listNextItens(sessionStorage.getItem('userEmail'));
    this.setState({ nextItens: itens.data });
  }

  async getAllProjects(){
    const projects = await FreeLaApi.projectListCurrent(sessionStorage.getItem('userEmail'));
    this.setState({ projects: projects.data });
  }

  getColor(date) {
    const days = moment(date).diff(moment(), 'days');

    if (days <= 0) {
      return 'text-white bg-danger';
    } else if (days < 7) {
      return 'text-dark bg-warning';
    } else {
      return 'text-white bg-success';
    }
  }

  
  getColorItem(date) {
    const days = moment(date).diff(moment(), 'days');
    if (days <= 0) {
      return 'text-danger';
    } else if (days < 7) {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {this.state.projects.map(project => 
            <Col xs="12" sm="6" lg="3">
              <Link to={`/project?id=${project.id}`}  >
                <Card className={this.getColor(project.expectedenddate)}>
                  <CardBody className="pb-0">
                    <div className="text-value">{project.name}</div>
                    <div><i className='fa fa-calendar'></i>&nbsp;{moment(project.expectedenddate).format('DD/MM/YYYY')}</div>
                    <br/>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Próximas entregas
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-left">Item</th>
                      <th className="text-center">Data de Entrega</th>
                      <th className="text-left">Projeto</th>
                      <th className="text-left">Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.nextItens.map(item => {
                      return <tr>
                        <td className="text-center"><i className={`fa fa-circle ${this.getColorItem(item.expectedenddate)}`}></i></td>
                        <td><Link to={`/projectItem?id=${item.id}`} className="text-bold">{item.name}</Link></td>
                        <td className="text-center">{moment(item.expectedenddate).format('DD/MM/YYYY')}</td>
                        <td><Link to={`/project?id=${item.projectid}`} className="text-bold">{item.projectname}</Link></td>
                        <td>{item.clientemail}</td>
                      </tr>
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
