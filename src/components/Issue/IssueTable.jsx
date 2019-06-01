import React from 'react'
import IssueRow from './IssueRow.jsx';

const borderedStyle = { border: '1px solid silver', padding:'6px 4px' };
const IssueTable = (props => {
  const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} />);
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
})

export default IssueTable;