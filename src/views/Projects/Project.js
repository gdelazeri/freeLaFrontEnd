import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';
import moment from 'moment';

class Client extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const client = this.props.data;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong className='text-capitalize'><i className="icon-user"></i>&nbsp;{client.name}</strong>
            <Button type="button" className="pull-right" onClick={() => this.props.handleEdit(client)} size="sm" color="warning"><i className="fa fa-pencil"></i></Button>
          </CardHeader>
          <CardBody>
            <Row>
              <img style={{ maxHeight: '200px', margin: '0 auto' }} className='img-responsive rounded-circle' src="https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg" />
            </Row>
            <br />
            <Row>
              <label className='col-3 text-right'><b>CPF:</b></label>
              <label className='col-9'>{client.cpf ? client.cpf : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>E-mail:</b></label>
              <label className='col-9'>{client.email ? client.email : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Telefone 1:</b></label>
              <label className='col-9'>{client.phone1 ? client.phone1 : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Telefone 2:</b></label>
              <label className='col-9'>{client.phone2 ? client.phone2 : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Nascimento:</b></label>
              <label className='col-9'>{client.birthdate ? moment(client.birthdate).format('DD/MM/YYYY') : '-'}</label>
            </Row>
            <Row>
              <label className='col-3 text-right'><b>Criado em:</b></label>
              <label className='col-9'>{client.createdat ? moment(client.createdat).format('DD/MM/YYYY HH:MM') : '-'}</label>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Client;
