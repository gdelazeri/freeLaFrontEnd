import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';
import moment from 'moment';
import queryString from 'query-string';
import FreeLaApi from '../../services/freeLaApi';

class Project extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      project: {}
    }
    const parsedURLParams = queryString.parse(props.location.search);
    this.id = parsedURLParams.id;
  }

  async componentDidMount(){
    const project = await FreeLaApi.projectGet(this.id);
    if (project.success) {
      this.setState({ project: project.data });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong className='text-capitalize'><i className="icon-user"></i>&nbsp;{this.state.project.name}</strong>
            <Button type="button" className="pull-right" onClick={() => this.props.handleEdit(this.state.project)} size="sm" color="warning"><i className="fa fa-pencil"></i></Button>
          </CardHeader>
          <CardBody>
            <Row>
              <img style={{ maxHeight: '200px', margin: '0 auto' }} className='img-responsive rounded-circle' src="https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg" />
            </Row>
            <br />
            <Row>
              <label className='col-3 text-right'><b>CPF:</b></label>
              <label className='col-9'>{this.state.project.cpf ? this.state.project.cpf : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>E-mail:</b></label>
              <label className='col-9'>{this.state.project.email ? this.state.project.email : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Telefone 1:</b></label>
              <label className='col-9'>{this.state.project.phone1 ? this.state.project.phone1 : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Telefone 2:</b></label>
              <label className='col-9'>{this.state.project.phone2 ? this.state.project.phone2 : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Nascimento:</b></label>
              <label className='col-9'>{this.state.project.birthdate ? moment(this.state.project.birthdate).format('DD/MM/YYYY') : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Criado em:</b></label>
              <label className='col-9'>{this.state.project.createdat ? moment(this.state.project.createdat).format('DD/MM/YYYY HH:MM') : '-'}</label>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Project;
