import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';

class ControlPanel extends Component {
  render() {
    const { handleRunClick, handleStepClick, currentRegister } = this.props;
    return (
      <Col>
        <div className="control-buttons">
          <Button onClick={handleRunClick} color="success">Run</Button>
          <Button onClick={handleStepClick} color="danger">Step Run</Button>
        </div>
        <div className="currentRegister">
          {currentRegister.toUpperCase() || "Nombre de Registro"}
        </div>
        <div>
          <h3>Secuencia de Micro-operaciones </h3>
          <h4>Instruccion en ejecucion y/o fetch</h4>
        </div>
      </Col>
    )
  }
}
export default ControlPanel;
