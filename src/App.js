import React, { Component } from 'react';
import './App.css';
import Ram from './components/ram';
import Registers from './components/registers';
import ControlPanel from './components/controlPanel';
import { Container, Row, Table, Col } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.setInstrucciones = ["NOP", "CLA", "NEG", "INTON", "INTOF", "LDA", "STA", "ADD", "SUB", "JMP", "JMZ", "JMN", "LDSP", "STSP", "PUSHA", "POPA", "JSR", "RTN", "RTI", "IN", "OUT", "HLT"];
    this.state = {
      registers: {
        ac: 0,
      },
      isRunning: false,
      dirId: 0,
      currentRegister: '',
      instructions: [
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
      ]
    }

    window.settings = {
      NOP: this.nop.bind(this),
      CLA: this.cla.bind(this),
      NEG: this.neg.bind(this),
      INTON: this.inton.bind(this),
      INTOF: this.intof.bind(this),
      LDA: this.lda.bind(this),
      STA: this.sta.bind(this),
      ADD: this.add.bind(this),
      SUB: this.sub.bind(this),
      JMP: this.jmp.bind(this),
      JMZ: this.jmz.bind(this),
      JMN: this.jmn.bind(this),
      LDSP: this.ldsp.bind(this),
      STSP: this.stsp.bind(this),
      PUSHA: this.pusha.bind(this),
      POPA: this.popa.bind(this),
      JSR: this.jsr.bind(this),
      RTN: this.rtn.bind(this),
      RTI: this.rti.bind(this),
      IN: this.in.bind(this),
      OUT: this.out.bind(this),
      HLT: this.hlt.bind(this),
    }
  }

  registersStateObject(id, value) {
    var stateObject = function() {
      var returnObj = this.state.registers;
      returnObj[id] = value;
      return returnObj;
    }.bind(this)();
    return stateObject;
  }

  nop(){}
  cla(dir, val){
    this.setState({registers: this.registersStateObject("ac", 0)});
  }
  neg(dir, val){
    this.setState({registers: this.registersStateObject("ac", this.state.registers.ac * -1)})
  }
  inton(){}
  intof(){}
  lda(dir, val){ 
    if(dir.toLowerCase() === "a") {
      this.setState({registers: this.registersStateObject("ac", parseInt(val))});
    }
  }
  sta(dir, x){ 
    if(dir.toLowerCase() === "a") {
			this.setState({ registers: this.registersStateObject(x, parseInt(this.state.registers.ac))})
    }
  }
  add(dir, x){ 
    if(dir.toLowerCase() === "a") {
			this.setState({ registers: this.registersStateObject("ac", this.state.registers.ac + this.state.registers[x])})
    }
  }
  sub(dir, x){
    if(dir.toLowerCase() === "a") {
			this.setState({ registers: this.registersStateObject("ac", this.state.registers.ac - this.state.registers[x])})
    }
  }
  jmp(){}
  jmz(){}
  jmn(){}
  ldsp(){}
  stsp(){}
  pusha(){}
  popa(){}
  jsr(){}
  rtn(){}
  rti(){}
  in(){}
  out(){}
  hlt(){ 
    this.setState({ isRunning: false })
    console.log('stopped');
  }

  handleInstructionChange = (e) => {
    let id = e.target.dataset.id;
    let value = e.target.value;

    var stateObject = function() {
      var returnObj = this.state.instructions;
      returnObj[id] = value;
      return returnObj;
    }.bind(this)();

    this.setState({ instructions: stateObject});
  }

  runInstruction(content) {
    var cont = content.split(' ');
    var instr;
    var val;
    var dir;
    if (cont.length === 3) {
      instr = cont[0].toUpperCase().trim();
      dir = cont[1];
      val = cont[2]; 
    } else if (cont.length === 2) {
      var variable = cont[0];
      val = cont[1];
    } else {
      instr = cont[0].toUpperCase().trim();
    }
    var fn = window.settings[instr];
    if (typeof fn === 'function' && this.state.isRunning) {
      fn(dir, val);
    }
  }

  componentDidUpdate() {
  }

  startProgram() {
    this.setState({ isRunning: true });

    this.state.instructions.map((instruction) => {
      this.runInstruction(instruction);
    });

  }

  startStepProgram(dirId) {
    var instruction = this.state.instructions[dirId];
    if (instruction) {
      this.setState({ isRunning: true, currentRegister: instruction});
      this.runInstruction(instruction);
      this.setState({dirId: dirId +1 });
    } else {
      this.setState({dirId: 0, isRunning: false})
    }
  }

  handleRunClick(e) {
    this.startProgram()
  }

  handleStepClick(e) {
    this.startStepProgram(this.state.dirId)
  }

  render() {
    const { instructions, registers, isRunning, dirId, currentRegister } = this.state;
    return (
      <Container className="main-container">
        <Row>
          <Ram 
            instructions={ instructions }
            handleInstructionChange={this.handleInstructionChange.bind(this)}
            dirId={dirId}
            isRunning={isRunning}
            setInstrucciones={this.setInstrucciones}
          />
          <Registers 
            registers={registers}
            isRunning={isRunning}
          />
          <ControlPanel 
            handleRunClick={this.handleRunClick.bind(this)}
            handleStepClick={this.handleStepClick.bind(this)}
            currentRegister={currentRegister}
          />  
        </Row>
        <Row>
          <Col>
          <h3 style={{paddingTop: "20px"}}>
            Set de instrucciones
          </h3>
          <Table>
            <tr>
              <th>
                NOP
              </th>
              <td>
                00
              </td>
              <td>
                No Operation
              </td>
            </tr>
            <tr>
              <th>
                CLA
              </th>
              <td>
                01
              </td>
              <td>
                Clear Accumulator
              </td>
            </tr>
            <tr>
              <th>
                NEG
              </th>
              <td>
                02
              </td>
              <td>
                Negative
              </td>
            </tr>
            <tr>
              <th>
                INTON
              </th>
              <td>
                03
              </td>
              <td>
                Interrupt On
              </td>
            </tr>
            <tr>
              <th>
                INTOF
              </th>
              <td>
                04
              </td>
              <td>
                Interrupt Off
              </td>
            </tr>
             <tr>
              <th>
                LDA
              </th>
              <td>
                10
              </td>
              <td>
                Load Accumulator
              </td>
            </tr>
            <tr>
              <th>
                STA
              </th>
              <td>
                11
              </td>
              <td>
                Store Accumulator
              </td>
            </tr>
            <tr>
              <th>
                ADD
              </th>
              <td>
                20
              </td>
              <td>
                Add
              </td>
            </tr>
            <tr>
              <th>
                SUB
              </th>
              <td>
                21
              </td>
              <td>
                Substract
              </td>
            </tr>
            <tr>
              <th>
                JMP
              </th>
              <td>
                30
              </td>
              <td>
                Jump
              </td>
            </tr>
            <tr>
              <th>
                JMZ
              </th>
              <td>
                31
              </td>
              <td>
                Jump on Zero
              </td>
            </tr>
            <tr>
              <th>
                JMN
              </th>
              <td>
                32
              </td>
              <td>
                Jump on Negative
              </td>
            </tr>
            <tr>
              <th>
                HLT
              </th>
              <td>
                63
              </td>
              <td>
                Halt
              </td>
            </tr>
          </Table>
          </Col>
          <Col>
            <h3 style={{paddingTop: "20px"}}>
              Tipos de Direccionamiento
            </h3>
            <Table>
              <tr>
                <th>
                  0
                </th>
                <td>
                  (I)
                </td>
                <td>
                  Inmediato
                </td>
              </tr>
              <tr>
                <th>
                  1
                </th>
                <td>
                  (R)
                </td>
                <td>
                  Relatvo
                </td>
              </tr>
              <tr>
                <th>
                  2
                </th>
                <td>
                  (A)
                </td>
                <td>
                  Absoluto
                </td>
              </tr>
              <tr>
                <th>
                  3
                </th>
                <td>
                  (D)
                </td>
                <td>
                  Indirecto
                </td>
              </tr>

            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
