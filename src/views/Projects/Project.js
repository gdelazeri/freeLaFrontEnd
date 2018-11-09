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
      console.log(project.data);
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
              <img style={{ maxHeight: '200px', margin: '0 auto' }} className='img-responsive rounded-circle' src="https://assets.pcmag.com/media/images/481950-project-management.jpg?thumb=y&width=810&height=456" />
            </Row>
            <br />
            <Row>
              <label className='col-3 text-right'><b>Start Date:</b></label>
              <label className='col-9'>{this.state.project.startdate ? moment(this.state.project.startdate).format('DD/MM/YYYY') : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>End Date:</b></label>
              <label className='col-9'>{this.state.project.enddate ? moment(this.state.project.enddate).format('DD/MM/YYYY') : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Presentation Date:</b></label>
              <label className='col-9'>{this.state.project.presentationdate ? moment(this.state.project.presentationdate).format('DD/MM/YYYY') : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Gostos:</b></label>
              <label className='col-9'>{this.state.project.likes ? this.state.project.likes : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Desgostos:</b></label>
              <label className='col-9'>{this.state.project.dislikes ? this.state.project.dislikes : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Valor Total:</b></label>
              <label className='col-9'>R$ {this.state.project.totalvalue ? this.state.project.totalvalue : '-'}</label>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Project;
