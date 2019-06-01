import React from 'react';
import moment from 'moment';
import Footer from '../WebsiteApprove/Footer.jsx';

export default class Framework extends React.Component {
    constructor() {
      super();
      this.state = { time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') };
      this.timer = this.timer.bind(this);
      this.timerCount = null;
    }
    timer(){
      if( this.timerCount ){
        clearTimeout( this.timerCount );
      }
      this.timerCount = setTimeout(() => {
        this.setState({
          time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })
        this.timer();
      }, 1000);
    }
    
    componentDidMount(){
      this.timer();
    }
    render() {
      return (
        <div>
          <section className="header">
              <p className="fr timer mr8">{this.state.time}</p>
              <p className="left-title ml8">Issues Tracker</p>
          </section>
          <div className="contents">
              {this.props.children}
          </div>
          <div className="footer">
              Full source code available at this <a href="https://github.com/babuge" target="_blank">Github respository</a>
          </div>
          <Footer />
        </div>
      )
    }
  }
Framework.propTypes = {
  children: React.PropTypes.object.isRequired,
};