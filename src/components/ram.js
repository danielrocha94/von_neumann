import React, { Component } from 'react';
import { Table, Col, Input } from 'reactstrap';
import '../App.css';

class Ram extends Component {
  componentDidMount() {
    var stateObject = function() {
      var returnObj = this.props.instructions;
      returnObj.map((i) => {
        return returnObj[i] = "";
      });
      return returnObj;
    }.bind(this)();

    this.setState({ instructions: stateObject});
  }

  render() {
    const {dirId, isRunning} = this.props;
    return (
      <Col className="ram-table">
        <Table bordered>
          <thead>
          <tr>
            <th colSpan="2">RAM</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>Dir</th>
            <th>Contenido</th>
          </tr>
          {[...Array(this.props.instructions.length)].map((x, i) => {
            return (
              <tr key={i} className={isRunning && i == dirId-1 ? "currentDirection" : ""}>
                <td>{i}</td>
                <td>
                  <Input 
                    data-id={i}
                    onChange={this.props.handleInstructionChange}
                    value={this.state ? this.state["instructions"][i] : ""}
                    contentEditable="true"
                    className={"editable-td"}
                  />
                </td>
              </tr>
            )}
          )}
          </tbody>
        </Table>
      </Col>
    );
  }
}

export default Ram;
