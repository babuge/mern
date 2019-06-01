import React from 'react';
import { Link } from 'react-router';

//  为了性能，‘无状态类’使用 无状态函数
const borderedStyle = { border: '1px solid silver', padding:'6px 4px' };
const IssueRow = (props) => (
    <tr>
      <td style={borderedStyle}>
        <Link to={`/issues/${props.issue._id}`} >{props.issue._id.substr(-4)}</Link>
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
export default IssueRow;