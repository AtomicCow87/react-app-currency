import React from 'react';
import { json, checkStatus } from './utils';
import { Link } from 'react-router-dom';

class Worldlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = (props.location && props.location.state) || 
    {
      currencies: {},
      selectStartValue: 'USD',
      selectEndValue: 'EUR',
      startAmount: 1,
      endAmount: 1,
      rates: {},
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
    this.fetchList;
  }

  //fetching 
  componentDidMount () {
    let currencyApi = 'https://api.frankfurter.app/currencies';
    let listApi = 'https://api.frankfurter.app/latest?from=USD'
    

    let promise1 = fetch(currencyApi)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({ currencies: data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });

    let promise2 = fetch(listApi)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({ rates: data.rates });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });

    Promise.all([promise1, promise2]);
  }

  render() {
    const { currencies, selectStartValue, startAmount, rates } = this.state;

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
        <div className="row align-items-center gx-5 mt-5">
          <div className="col-md">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope='col'>Countries</th>
                  <th scope='col'>Base Rates</th>
                  <th scope='col'>Adjusted Rates</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(rates).map((sym) => {
                  <tr key={sym}>
                    <td>{sym}</td>
                    <td>{rates[sym]}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>         
        </div>
      </div>
    )
  }
}

export default Worldlist;