import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';

class User extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.data;
    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {user.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td className='text-capitalize'>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
      </div>
    )
  }
}

export default User;
