import React from 'react';
import { json, checkStatus } from './utils';
import Countries from './Countries';

class Worldlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: '',
    }
  }

  render() {
    return (
      <div>
        <p>test</p>
      </div>
    )
  }
}

export default Worldlist;