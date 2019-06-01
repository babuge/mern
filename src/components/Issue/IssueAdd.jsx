import React from 'react';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();// 不写会去请求并发生页面刷新
    const form = document.forms.issueAdd;
    if (!form.owner.value || (''.concat(form.owner.value)).trim().length <= 0) {
      console.log('owner is required!');
      return;
    }
    if (!form.title.value || (''.concat(form.owner.value)).trim().length <= 0) {
      console.log('title is required!');
      return;
    }
    this.props.createIssue({ // eslint-disable-line
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    // clean the from value for the next input
    form.owner.value = '';// owner ---input[name='owner']
    form.title.value = '';
  }
  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="author" placeholder="author" />
          <button>Add</button>
        </form>
      </div>
      );
  }
}
