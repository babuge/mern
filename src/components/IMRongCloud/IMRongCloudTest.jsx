import React from 'react';

export default class IMRongCloudTest extends React.Component {
  constructor() {
    super();
    this.selfFun = this.selfFun.bind(this);
  }
  selfFun() {
    this.props.loadIM();
  }
  render() {
    const styleString = { backgroundColor: '#aaddaa', height: '40px', width: '180px',borderRadius: 20, display: 'inline-block' };
    return (
      <div>
        <button style={styleString} onClick={this.selfFun}>IMRongcloud in</button>
      </div>
    );
  }
}

