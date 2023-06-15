import React from 'react';
import { json, checkStatus } from './utils';
import { Link } from 'react-router-dom';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = (props.location && props.location.state) || 
    {
      currencies: {},
      selectStartValue: 'USD',
      selectEndValue: 'EUR',
      startAmount: 1,
      endAmount: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //setting the dropdown value when changed
  handleChange(event) {
    const value = event.target.value;
    this.setState({ 
      ...this.state,
      [event.target.name]: value
    });
  }

  //fetching list of currencies for dropdowns
  componentDidMount () {   
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({ currencies: data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });
  }

  render() {
    const { currencies, selectStartValue, selectEndValue, startAmount } = this.state;

    return (
      <div className="container text-center px-4">
        <div className="row align-items-center row-cols-2 gx-5 ">
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' name='selectStartValue' value={selectStartValue} onChange={this.handleChange}>
                <option disabled>Choose your Starting Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}
              </select>
              <label for='floatingSelectGrid'>Starting Country</label>
            </div>
          </div>
          <div className="col-md">
            <div className='form-floating'>
              <input type='number' className='form-control' name='startAmount' value={startAmount} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="row justify-content-between gx-5 mt-5">
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' name='selectEndValue' value={selectEndValue} onChange={this.handleChange}>
                <option disabled>Choose your Destination Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}
              </select>
              <label for='floatingSelectGrid'>Destination Country</label>
              <Link to={{ pathname: "/Converter/", state: this.state }}>
                <button type="button" className="btn btn-danger btn-lg">Fight</button>
              </Link>
              <h1>this button does nothing just brings you here</h1>
            </div>
          </div>
          <div className="col-md">
            <p>--converter page--</p>
          </div>
          <div className="col-md">
            <Link to={{ pathname: "/Worldlist/", state: this.state }}>
              <button type="button" className="btn btn-warning btn-lg">Brawl</button>
            </Link>
            <h1>1 vs. The World!</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Converter;