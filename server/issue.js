const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issuesFieldType = {
  status: 'required',
  owner: 'effort',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};

function cleanIssue(issue) {
  const cleanedUpIssue = {};
  Object.keys(issue).forEach(field => {
    if (issuesFieldType[field]) {
      cleanedUpIssue[field] = issue[field];
    }
  });
  return cleanedUpIssue;
}

function validateIssue(issue) { // 验证必要字段
  const errors = [];
  Object.keys(issuesFieldType).forEach(field => {
    if (issuesFieldType[field] === 'required' && !issue[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });
  if (!validIssueStatus[issue.status]) {
    errors.push(`${issue.statues} is not a valid status.`);
  }
  return (errors.length ? errors.join('; ') : null);
}

export default {
  validateIssue,
  cleanIssue,
};

