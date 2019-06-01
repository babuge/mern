import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, withRouter } from 'react-router';
import IssueList from '../Issue/IssueList.jsx';
import IssueEdit from '../Issue/IssueEdit.jsx';
import Framework from '../Framework/Framework.jsx';
import Wellcome from '../Wellcome/Wellcome.jsx';

const root = document.getElementById('root');
const NoMatch = () => <p>Page Not Found</p>;
hideLoading();
const RouteApp = () => (
  <Router history={browserHistory} >
    <Route path="/" component={Framework} >
      <IndexRoute component={Wellcome} />
      <Route path="/issues" component={withRouter(IssueList)} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

ReactDOM.render(<RouteApp />, root);
// if (module.hot) {
//   module.hot.accept();
// }
