import React, { Component } from 'react';
import './App.css';

class Button extends Component {
  render() {
    return (
      <button className={"btn-" + this.props.value + " btn"} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Monitor extends Component {
  render() {
    return (
      <div className="monitor">{this.props.value}</div>
    );
  }
}

class App extends Component {
  state = {
    firstNumber: 0,
    secondNumber: 0,
    operator: null,
    displayValue: '0',
    isFirst: true,
    isDot: false,
    numberAfterDot: 1,
    previousState: []
  }

  renderButton(key) {
    return (
      <Button value={key} onClick={() => this.handleClick(key)} />
    );
  }

  handleClick(key) {
    // const squares = this.state.squares.slice();
    // squares[i] = 'X';
    // this.setState({squares: squares});

    switch (key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.handleNumber(parseInt(key, 10));
        break;
      case ".":
        this.handleDot();
        break;
      case "DEL":
        this.handleDel();
        break;
      case "C":
        this.resetValue();
        break;
      case "+/-":
        this.handlePlusMinus();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        this.handleOperator(key);
        break;
      case "=":
        this.handleOperator(null);
        break;
      default:
        break;
    }
  }

  handlePlusMinus() {
    let firstNumber = this.state.firstNumber,
      secondNumber = this.state.secondNumber,
      displayValue;
    if (this.state.isFirst) {
      firstNumber *= -1;
      displayValue = firstNumber;
    } else {
      secondNumber *= -1;
      displayValue = firstNumber + this.state.operator + secondNumber;
    }

    this.setState({
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      displayValue: displayValue
    });
  }

  handleDel() {
    
  }

  resetValue() {
    this.setState({
      firstNumber: 0,
      secondNumber: 0,
      operator: null,
      displayValue: '0',
      isFirst: true,
      isDot: false,
      numberAfterDot: 1,
      previousState: []
    });
  }

  handleDot() {
    if (!this.state.isDot) {
      if (!this.state.isFirst && this.state.secondNumber === 0) {
        this.setState({
          isDot: true,
          displayValue: this.state.displayValue + "0."
        });
      } else {
        this.setState({
          isDot: true,
          displayValue: this.state.displayValue + "."
        });
      }

    }
  }

  handleNumber(number) {
    let firstNumber = this.state.firstNumber,
      secondNumber = this.state.secondNumber,
      displayValue,
      numberAfterDot = this.state.numberAfterDot;
    if (this.state.isFirst) {
      let rate = (this.state.firstNumber / Math.abs(this.state.firstNumber));
      rate = isNaN(rate) ? 1 : rate;
      if (this.state.isDot) {
        firstNumber = this.state.firstNumber + number / Math.pow(10, this.state.numberAfterDot) * rate;
        displayValue = firstNumber.toFixed(numberAfterDot);
        numberAfterDot = this.state.numberAfterDot + 1;
      } else {
        firstNumber = this.state.firstNumber * 10 + number * rate;
        displayValue = firstNumber;
      }
    } else {
      let rate = (this.state.secondNumber / Math.abs(this.state.secondNumber));
      rate = isNaN(rate) ? 1 : rate;
      if (this.state.isDot) {
        secondNumber = this.state.secondNumber + number / Math.pow(10, this.state.numberAfterDot) * rate;
        displayValue = firstNumber + this.state.operator + secondNumber.toFixed(numberAfterDot);
        numberAfterDot = this.state.numberAfterDot + 1;
      } else {
        secondNumber = this.state.secondNumber * 10 + number * rate;
        displayValue = firstNumber + this.state.operator + secondNumber;
      }
    }
    this.setState({
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      numberAfterDot: numberAfterDot,
      displayValue: displayValue
    });
  }

  handleOperator(operator) {
    let isFirst = !this.state.isFirst,
      firstNumber = this.state.firstNumber,
      secondNumber = this.state.secondNumber,
      displayValue, result;
    if (this.state.isFirst) {
      if (operator == null) return;
      displayValue = this.state.firstNumber + operator;
    } else {
      switch (this.state.operator) {
        case "+":
          result = firstNumber + secondNumber;
          break;
        case "-":
          result = firstNumber - secondNumber;
          break;
        case "*":
          result = firstNumber * secondNumber;
          break;
        case "/":
          result = firstNumber / secondNumber;
          break;
        default:
          break;
      }
      isFirst = operator == null;
      firstNumber = result;
      displayValue = result + operator;
      secondNumber = 0;
    }

    this.setState({
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      isFirst: isFirst,
      operator: operator,
      numberAfterDot: 1,
      isDot: false,
      displayValue: displayValue
    });
  }

  render() {
    return (
      <div className="App">
        <Monitor value={this.state.displayValue} />
        <div className="container-btn">
          <table>
            <tbody>
              <tr>
                <td>
                  {this.renderButton("C")}
                </td>
                <td>
                  {this.renderButton("DEL")}
                </td>
                <td>
                  {this.renderButton("+/-")}
                </td>
                <td>
                  {this.renderButton("/")}
                </td>
              </tr>
              <tr>
                <td>
                  {this.renderButton("7")}
                </td>
                <td>
                  {this.renderButton("8")}
                </td>
                <td>
                  {this.renderButton("9")}
                </td>
                <td>
                  {this.renderButton("*")}
                </td>
              </tr>
              <tr>
                <td>
                  {this.renderButton("4")}
                </td>
                <td>
                  {this.renderButton("5")}
                </td>
                <td>
                  {this.renderButton("6")}
                </td>
                <td>
                  {this.renderButton("-")}
                </td>
              </tr>
              <tr>
                <td>
                  {this.renderButton("1")}
                </td>
                <td>
                  {this.renderButton("2")}
                </td>
                <td>
                  {this.renderButton("3")}
                </td>
                <td>
                  {this.renderButton("+")}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {this.renderButton("0")}
                </td>
                <td>
                  {this.renderButton(".")}
                </td>
                <td>
                  {this.renderButton("=")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
