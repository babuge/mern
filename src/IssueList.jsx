import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';

import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFitter.jsx';
import FaceApiTest from './FaceApiTest.jsx';
import IMRongCloudTest from './IMRongCloudTest.jsx';

const borderedStyle = { border: '1px solid silver', padding: 4 };
function IssueTable(props) {
  const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} />);
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={borderedStyle}>Id</th>
          <th style={borderedStyle}>Status</th>
          <th style={borderedStyle}>Owner</th>
          <th style={borderedStyle}>Created</th>
          <th style={borderedStyle}>Effort</th>
          <th style={borderedStyle}>Completion Date</th>
          <th style={borderedStyle}>Title</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}
//  为了性能，‘无状态类’使用 无状态函数
const IssueRow = (props) => (
  <tr>
    <td style={borderedStyle}>
      <Link to={`/issues/${props.issue.id}`} >{props.issue._id.substr(-4)}</Link>
    </td>
    <td style={borderedStyle}>{props.issue.status}</td>
    <td style={borderedStyle}>{props.issue.owner}</td>
    <td style={borderedStyle}>{props.issue.created.toDateString()}</td>
    <td style={borderedStyle}>{props.issue.effort}</td>
    <td style={borderedStyle}>
      {props.issue.completionDate ? props.issue.completionDate.toDateString() : ' '}
    </td>
    <td style={borderedStyle}>{props.issue.title}</td>
  </tr>
);

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    // this.createTestIssue = this.createTestIssue.bind(this);
    // setTimeout(this.createTestIssue,2000);//hadle add issue
    // add bind this for subComponent
    this.createIssue = this.createIssue.bind(this);
    // this.loadData();
    this.setFilter = this.setFilter.bind(this);
    this.loadDatas = this.loadDatas.bind(this);
    this.loadIM = this.loadIM.bind(this);
  }
  componentDidUpdate(prevprops) {
    const oldQuery = prevprops.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status 
      && oldQuery.effort_gte === newQuery.effort_gte 
      && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }

  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }
  loadData() { // get issues
    fetch(`/api/issues${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log('Total count of records:', data._metadata.total_count);
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          alert('Failed to fetch issues:'.concat(error.message));
        });
      }
    }).catch(err => {
      alert('Error in fetching data from server:', err);
    });
  }
  createIssue(newIssue) { // add issue
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        console.log(response);
        response.json().then(updateIssue => {
          console.log(updateIssue);
          updateIssue.created = new Date(updateIssue.created);
          if (updateIssue.completionDate) {
            updateIssue.completionDate = new Date(updateIssue.completionDate);
          }
          const newIssues = this.state.issues.concat(updateIssue);
// get subArray of array (or subString) by slice(start,end);slice(),get a copy of Array/String
          this.setState({ issues: newIssues });
        });
      } else {
        response.json().then(error => {
          alert('faild to add issue:'.concat(error.message));
        });
      }
    }).catch(err => {
      alert('Error in sending data to server:'.concat(err.message));
    });
  }

  loadIM() {
    const body = {
      userId:1,
      userName:'babuge',
    };
    fetch('/api/IMRongCloudToken',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(body),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log('IMRongCloudToken:', data);
        });
      } else {
        response.json().then(error => {
          alert('Failed to fetch IMRongCloudToken:'.concat(error.message));
        });
      }
    }).catch(err => {
      alert('Error in fetching data from server:', err);
    });
  }


  loadDatas() { // get face
    fetch('/api/faceConstrat',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({test:123}) ,
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log('faceConstrat:', data);
        });
      } else {
        response.json().then(error => {
          alert('Failed to fetch faceConstrat:'.concat(error.message));
        });
      }
    }).catch(err => {
      alert('Error in fetching data from server:', err);
    });
  }
  render() {
    return (
      <div>
        <IssueFilter setFilter={this.setFilter} initFilter={this.props.location.query} />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <hr />
        <FaceApiTest loadDatas={this.loadDatas} />
        <hr/>
        <IMRongCloudTest loadIM={this.loadIM} />
      </div>
    );
  }
}
IssueList.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};
