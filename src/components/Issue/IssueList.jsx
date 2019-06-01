import React,{Component} from 'react';
import 'whatwg-fetch';

import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFitter.jsx';
import FaceApiTest from '../FaceApi/FaceApiTest.jsx';
import IMRongCloudTest from '../IMRongCloud/IMRongCloudTest.jsx';

export default class IssueList extends Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
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
  componentDidMount(){
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
      <div className="issue-list-cont">
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
