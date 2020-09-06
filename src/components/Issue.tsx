import React, { useState } from 'react';
import { Issue as IssueType } from '../actions/IssuesActionsTypes';
import { Card, Button, Collapse, Badge } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

interface IssueProps {
  issue: IssueType;
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{issue.title} - </Card.Title>
        <Card.Text>
          {issue.labels.map(label => (
            <Badge key={label.id} variant="secondary" className="mr-1">
              {label.name}
            </Badge>
          ))}
        </Card.Text>
        <Card.Text>
          <Button
            onClick={() => setOpen(prevOpen => !prevOpen)}
            variant="primary"
          >
            {open ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={issue.body} escapeHtml={false} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default Issue;
