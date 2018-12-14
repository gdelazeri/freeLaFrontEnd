import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import FreeLaApi from '../../../services/freeLaApi';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obs: [],
      name: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      phone1: undefined,
    }

    this.createAccount = this.createAccount.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async createAccount(){
    const { name, email, password, confirmPassword, phone1 } = this.state;
    let obs = [];
    if (!name) obs.push('Enter your name');
    if (!email) obs.push('Enter your e-mail');
    if (!password) obs.push('Enter your password');
    if (!phone1) obs.push('Enter your phone number');

    if (obs.length === 0) {
      if (password === confirmPassword) {
        const professional = { name, email, password, confirmPassword, phone1 };
        const resp = await FreeLaApi.professionalAdd(professional);
        if (resp.success) {
          window.location.href = '/#/';
        } else {
          obs.push('Error');
        }
      } else {
        obs.push('The passwords are different');
      }
    }
    this.setState({ obs });
  }

  handleInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Oi freela, registre-se aqui!</h1>
                    <p className="text-muted">Preencha com seus dados e cria sua conta</p>
                    {this.state.obs.map(o => <Alert color="danger">{o}</Alert>)}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Insira seu nome" autoComplete="name" name="name" onChange={this.handleInput} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder=" Insira seu email" autoComplete="email" name="email" onChange={this.handleInput} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Insira seu senha" autoComplete="new-password" name="password" onChange={this.handleInput} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Insira sua senha novamente" autoComplete="new-password" name="confirmPassword" onChange={this.handleInput} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Insira seu telefone" autoComplete="phone" name="phone1" onChange={this.handleInput} />
                    </InputGroup>
                    <Button color="success" block onClick={this.createAccount}>Criar Conta</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
