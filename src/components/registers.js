import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';

class Registers extends Component {

  render() {
    const { registers, isRunning } = this.props;
    return (
      <Col>
        <Table bordered>
          <thead>
            <tr>
              <th colSpan="2">
                Registros
              </th>
            </tr>
          </thead>
          <tbody>
            { isRunning ? 
              Object.keys(registers).map(function(key, index) {
                return (
                  <tr key={index}>
                    <td>
                      {key+":"}
                    </td>
                    <td> 
                      {registers[key]}
                    </td>
                  </tr>
                )
              })
              :
              <tr>
                <td> 
                  No hay variables definidas
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </Col>
    )
  }
}

export default Registers;
