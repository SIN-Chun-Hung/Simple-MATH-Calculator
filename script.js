const initializeKeyStyle = {
  background: 'rgb(0, 153, 204)',
  width: '250px',
  height: '40px',
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  borderRadius: '10px' };


const numberKeysStyle = {
  background: 'rgb(89,89,89)' };


const equalKeyStyle = {
  background: 'rgb(255, 153, 51)' };


const operatorKeysStyle = {
  background: 'rgb(204, 153, 0)' };


const isOperator = /[x/+-]/;

const negativeSignEndSpecial = /\d[x/+-]{1}-$/;

const operatorEnd = /[x/+-]$/;

class ScreenFormula extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "formula-string", className: "screen-formula" },
      this.props.formula));


  }}
;

class ScreenValue extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "display", className: "screen-value" }, /*#__PURE__*/
      React.createElement("span", null, this.props.screenValue)));


  }}
;

class Buttons extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "buttons" }, /*#__PURE__*/
      React.createElement("button", { id: "clear", value: "AC", onClick: this.props.initialize, style: initializeKeyStyle }, "Clear Button (Initialization)"), /*#__PURE__*/
      React.createElement("div", { id: "buttons-group" }, /*#__PURE__*/
      React.createElement("button", { id: "add", value: "+", onClick: this.props.operators, style: operatorKeysStyle, className: "buttons-same-prop" }, "+"), /*#__PURE__*/
      React.createElement("button", { id: "seven", value: "7", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "eight", value: "8", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "nine", value: "9", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "9"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", value: "-", onClick: this.props.operators, style: operatorKeysStyle, className: "buttons-same-prop" }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "four", value: "4", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "five", value: "5", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "six", value: "6", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "6"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", value: "x", onClick: this.props.operators, style: operatorKeysStyle, className: "buttons-same-prop" }, "x"), /*#__PURE__*/
      React.createElement("button", { id: "one", value: "1", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "two", value: "2", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "three", value: "3", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "3"), /*#__PURE__*/
      React.createElement("button", { id: "divide", value: "/", onClick: this.props.operators, style: operatorKeysStyle, className: "buttons-same-prop" }, "/"), /*#__PURE__*/
      React.createElement("button", { id: "zero", value: "0", onClick: this.props.numbers, style: numberKeysStyle, className: "buttons-same-prop" }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "decimal", value: ".", onClick: this.props.decimal, style: numberKeysStyle, className: "buttons-same-prop" }, "."), /*#__PURE__*/
      React.createElement("button", { id: "equals", value: "=", onClick: this.props.evaluate, style: equalKeyStyle, className: "buttons-same-prop" }, "="))));



  }}

;

class MyCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenVal: '0',
      screenForm: '',
      preVal: '0',
      evaluate: false };

    this.screenMaxLimit = this.screenMaxLimit.bind(this);
    this.numberKey = this.numberKey.bind(this);
    this.operatorKey = this.operatorKey.bind(this);
    this.decimalKey = this.decimalKey.bind(this);
    this.acKey = this.acKey.bind(this);
    this.evaluateKey = this.evaluateKey.bind(this);
  }

  screenMaxLimit() {
    this.setState({
      screenVal: 'Max Digit!',
      preVal: this.state.screenVal });


    setTimeout(() => this.setState({
      screenVal: this.state.preVal }),
    1000);
  }

  numberKey(e) {
    if (!this.state.screenVal.includes('Max')) {
      const clickKeyVal = e.target.value;
      const { screenVal, screenForm, evaluate } = this.state;
      this.setState({
        evaluate: false });


      if (screenVal.length > 18) {
        this.screenMaxLimit();
      } else if (evaluate === false) {
        this.setState({
          screenVal:
          screenVal === '0' || isOperator.test(screenVal) ? clickKeyVal : screenVal + clickKeyVal,
          screenForm:
          screenVal === '0' && clickKeyVal === '0' ?
          screenForm === '' ?
          screenVal : screenForm :
          /([^.0-9]0|^0)$/.test(screenForm) ?
          screenForm.slice(0, -1) + clickKeyVal :
          screenForm + clickKeyVal });

      } else {
        this.setState({
          screenVal: clickKeyVal,
          screenForm:
          clickKeyVal === '0' ? '' : clickKeyVal });

      }
    }
  }


  operatorKey(e) {
    if (!this.state.screenVal.includes('Max')) {
      const clickKeyVal = e.target.value;
      const { screenForm, preVal, evaluate } = this.state;
      this.setState({
        screenVal: clickKeyVal,
        evaluate: false });


      if (evaluate === true) {
        this.setState({
          screenForm: preVal + clickKeyVal });

      } else

      if (!operatorEnd.test(screenForm)) {
        this.setState({
          preVal: screenForm,
          screenForm: screenForm + clickKeyVal });

      } else if (!negativeSignEndSpecial.test(screenForm)) {
        this.setState({
          screenForm: (negativeSignEndSpecial.test(screenForm + clickKeyVal) ? screenForm : preVal) + clickKeyVal });

      } else if (clickKeyVal !== '-') {
        this.setState({
          screenForm: preVal + clickKeyVal });

      }
    }
  }

  decimalKey() {
    if (this.state.evaluate == true) {
      this.setState({
        screenVal: '0.',
        screenForm: '0.',
        evaluate: false });

    } else

    if (!this.state.screenVal.includes('Max') && !this.state.screenVal.includes('.')) {
      if (this.state.screenVal.length > 18) {
        this.screenMaxLimit();
      } else

      if (operatorEnd.test(this.state.screenForm) || this.state.screenVal === '0' && this.state.screenForm === '') {
        this.setState({
          screenVal: '0.',
          screenForm: this.state.screenForm + '0.' });

      } else {
        this.setState({
          screenVal: this.state.screenVal + '.',
          screenForm: this.state.screenForm + '.' });

      }
    }
  }

  acKey() {
    this.setState({
      screenVal: '0',
      screenForm: '',
      preVal: '',
      evaluate: false });

  }

  evaluateKey() {
    if (!this.state.screenVal.includes('Max')) {
      let preCal = this.state.screenForm;

      while (operatorEnd.test(preCal)) {
        preCal = preCal.slice(0, -1);
      }

      preCal = preCal.replace(/x/g, '*').replace('--', '+0+0+0+');
      let ans = Math.round(1000000000000 * eval(preCal)) / 1000000000000;

      this.setState({
        screenVal: ans.toString(),
        preVal: ans,
        screenForm: preCal.replace(/\*/g, '⋅').replace('+0+0+0+', '--') + '=',
        evaluate: true });

    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "myCal" }, /*#__PURE__*/
      React.createElement("div", { id: "cal-info" }, /*#__PURE__*/
      React.createElement("div", { id: "title" }, "Simple Mathematics Calculator"), /*#__PURE__*/
      React.createElement("div", { id: "author" }, "SIMON SIN Chun Hung")), /*#__PURE__*/

      React.createElement(ScreenFormula, { formula: this.state.screenForm.replace(/x/g, '⋅') }), /*#__PURE__*/
      React.createElement(ScreenValue, { screenValue: this.state.screenVal }), /*#__PURE__*/
      React.createElement(Buttons, { initialize: this.acKey, numbers: this.numberKey, operators: this.operatorKey, evaluate: this.evaluateKey, decimal: this.decimalKey })));


  }}
;


ReactDOM.render( /*#__PURE__*/React.createElement(MyCal, null), document.getElementById('mySimpleCal'));