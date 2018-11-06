import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import FreeLaApi from '../../../services/freeLaApi';
import Auth from '../../../helpers/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: undefined,
        password: undefined,
      },
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user = await FreeLaApi.login(this.state.user);
    if (user.success && user.data.length === 1) {
      Auth.setSession(user.data[0]);
      window.location.href = '/#/'
    }
    return false;
  }

  handleInput(e) {
    if (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        user: {
          ...this.state.user,
          [name]: value
        }
      })
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Enter your e-mail" autoComplete="email" value={this.state.user.email} onChange={this.handleInput} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Enter your password" autoComplete="current-password" value={this.state.user.password} onChange={this.handleInput} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Participe!</h2>
                      <p>Se você é freelancer, cadastre-se para organizar seus projetos e clientes.</p>
                      <a href='/#/register' className="btn btn-secondary mt-3" active>Registrar-se já!</a>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
