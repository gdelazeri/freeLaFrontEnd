import React, { Component } from 'react';
import { Row, Col, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form, Alert, Collapse } from 'reactstrap';
import moment from 'moment';
import queryString from 'query-string';
import FreeLaApi from '../../services/freeLaApi';

class ProjectItem extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      item: {
        id: undefined,
        name: undefined,
        stageid: undefined,
        dependencies: [1, 2, 3],
        presentationdate: undefined,
        enddate: undefined,
        comments: [],
      },
      project: {}
    }
    const parsedURLParams = queryString.parse(props.location.search);
    this.id = parsedURLParams.id;
  }

  async componentWillMount(){
    const item = await FreeLaApi.projectGetItem(this.id);
    if (item.success) {
      const project = await FreeLaApi.projectGet(item.data.projectid);
      this.setState({ item: item.data, project: project.data });
    }
  }

  buildComments() {
    return this.state.item.comments.map((item) => {
      let comment;
      if (item.clientemail === sessionStorage.getItem('userEmail') || item.professionalemail.trim() === sessionStorage.getItem('userEmail')) {
        comment = { me: true, message: item.comment, email: sessionStorage.getItem('userEmail') };
      } else {
        comment = { me: false, message: item.comment, email: item.clientemail || item.professionalemail };
      }
      return <p className={`mb-0 ${comment.me ? 'text-left' : 'text-right'}`}>
          <b className={comment.me ? 'text-success' : 'text-danger'}>{comment.me ? 'Eu' : comment.email}:</b>&nbsp;{comment.message}
        </p>;
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong className='font-18'>{this.state.project.name} - {this.state.item.name}</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={4} className='mb-2'>
                <p className='mb-1 font-16'><b>Valor:</b></p>
                <p className='mb-1'>{this.state.item.value ? this.state.item.value : '-'}</p>
              </Col>
              <Col md={4} className='mb-2'>
                <p className='mb-1 font-16'><b>Data de fim esperada:</b></p>
                <p className='mb-1'>{this.state.item.expectedenddate ? moment(this.state.item.expectedenddate).format('DD/MM/YYYY') : '-'}</p>
              </Col>
              <Col md={4} className='mb-2'>
                <p className='mb-1 font-16'><b>Data de fim efetiva:</b></p>
                <p className='mb-1'>{this.state.item.enddate ? moment(this.state.item.enddate).format('DD/MM/YYYY') : 'Não finalizado'}</p>
              </Col>
              <Col md={12} className='mb-2'>
                <p className='mb-1 font-16'><b>Descrição:</b></p>
                <p className='mb-1'>{this.state.item.description}</p>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <strong className='font-18'>Comentários</strong>
          </CardHeader>
          <CardBody>
            <Row>
              {this.buildComments()}
            </Row>
          </CardBody>
        </Card>

        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModalItem}>
          <ModalHeader>Finalizar item</ModalHeader>
          <ModalBody>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ProjectItem;
