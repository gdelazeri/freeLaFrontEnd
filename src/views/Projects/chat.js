import React, { Component } from 'react';
import { Row, Col, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form, Alert, Collapse } from 'reactstrap';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
          chatHistory: ['OLAR'],
          input: '',
          to: 'Dela',
        }
        this.updateChatHistory = this.updateChatHistory.bind(this)
        this.onMessageReceived = this.onMessageReceived.bind(this)
        this.onSendMessage = this.onSendMessage.bind(this)
        this.handleInput = this.handleInput.bind(this)
        socket.on('hello', (e,f,g,h) => { this.setState({ chatHistory: this.state.chatHistory.concat(e) }); console.log(f,g,h) });
      }

      handleInput(e, name){
        this.setState({ [name]: e.target.value });
      }
        
      leave(chatroomName, cb) {
        socket.emit('leave', chatroomName, cb);
      }

      componentWillMount() {
        socket.emit('register', sessionStorage.getItem('userEmail'));
      }

      componentWillUnmount() {
        socket.off('message')
      }
    
      updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
      }
        
      onMessageReceived() {
        // Socket.receiveMessage(function(kkk) { console.log(kkk); this.setState({ chatHistory: this.state.chatHistory.push(kkk) }) });
      }

      onSendMessage() {
        if (!this.state.input)
          return

        socket.emit('message',{ to: this.state.to, message: this.state.input });
        this.setState({ input: '' })
      }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <input className='form-control' onChange={(e) => this.handleInput(e, 'to')} value={this.state.to} />
          <br/>
          <br/>
          <br/>
          {this.state.chatHistory.map(msg => <p>{msg}</p>)}
          <br/>
          <br/>
          <br/>
          <br/>
          <input className='form-control' onChange={(e) => this.handleInput(e, 'input')} value={this.state.input} />
          <button className='btn btn-sm btn-success' onClick={this.onSendMessage}>Enviar</button>
        </Card>
      </div>
    )
  }
}

export default Chat;