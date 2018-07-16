import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Link, IndexRoute, browserHistory, withRouter } from 'react-router';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const root = document.getElementById('root');
const NoMatch = () => <p>Page Not Found</p>;
const Dashboard = () => <p><Link to="/issues">home page! </Link> </p>;
const App = (props) => (
  <div>
    <div className="header">
      <h1>Issues Tracker</h1>
    </div>
    <div className="contents">
      {props.children}
    </div>
    <div className="footer">
      Full source code available at this
      <a href="https://github.com/vasansr/pro-mern-stack">Github respository</a>
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};
const RouteApp = () => (
  <Router history={browserHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={Dashboard} />
      <Route path="/issues" component={withRouter(IssueList)} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

ReactDOM.render(<RouteApp />, root);
if (module.hot) {
  module.hot.accept();
}
