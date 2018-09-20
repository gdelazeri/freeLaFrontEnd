import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';

class ClientForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      client: this.props.data || {},
    }
  }

  componentWillReceiveProps(nextProps){
    console.log({nextProps})
    this.setState({
      client: nextProps.data || { },
    })
    console.log({ state: this.state })
  }

  render() {
    return (
        <Card>
          <CardHeader>
            <strong>Adicionar cliente</strong>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Nome</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input value={this.state.client.name} onChange={this.props.handleInput} type="text" id="text-input" name="name" placeholder="Digite o nome completo" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="email-input">E-mail</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input value={this.state.client.email} onChange={this.props.handleInput} type="email" id="email-input" name="email" placeholder="Digite o e-mail" autoComplete="email"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="cpf-input">CPF</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input value={this.state.client.cpf} onChange={this.props.handleInput} type="text" maxLength={9} id="cpf-input" name="cpf" placeholder="Informe o CPF" />
                  <FormText color="muted">Somente números</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="birthDate-input">Nascimento</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input value={this.state.client.birthDate} onChange={this.props.handleInput} type="date" id="birthDate-input" name="birthDate" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="phone1-input">Telefone 1</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input value={this.state.client.phone1} onChange={this.props.handleInput} type="text" maxLength={12} id="phone1-input" name="phone1" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="phone2-input">Telefone 2</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input value={this.state.client.phone2} onChange={this.props.handleInput} type="text" maxLength={12} id="phone2-input" name="phone2" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="photo-input">Foto</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input value={this.state.client.photo} onChange={this.props.handleInput} type="file" id="photo-input" name="photo" />
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter className="text-right">
            <Button type="button" onClick={this.props.handleSubmit} size="sm" color="success"><i className="fa fa-check"></i> Salvar</Button>&nbsp;
            <Button type="reset" onClick={this.props.handleReset} size="sm" color="outline-danger"><i className="fa fa-times"></i> Cancelar</Button>
          </CardFooter>
        </Card>
    )
  }
}

export default ClientForm;
