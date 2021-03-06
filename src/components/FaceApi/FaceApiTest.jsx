import React from 'react';

export default class FaceApiTest extends React.Component {
  constructor() {
    super();
    this.selfFun = this.selfFun.bind(this);
  }
  selfFun() {
    this.props.loadDatas();
  }
  render() {
    const styleString = { backgroundColor: '#aaddaa', height: '40px',borderRadius: 20, width: '180px' };
    return (
      <div>
        <button style={styleString} onClick={this.selfFun}>Face Cloud</button>
      </div>
    );
  }
}

