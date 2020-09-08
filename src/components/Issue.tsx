import React, { useState } from 'react';
import { IssueT } from '../actions/IssuesActionsTypes';
import { Card, Button, Collapse, Badge } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

interface IssueProps {
  issue: IssueT;
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="mb-3" data-testid="card-issue">
      <Card.Body>
        <Card.Title>{issue.title} - </Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          #{issue.number} opened on{' '}
          {new Date(issue.created_at).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </Card.Subtitle>
        <Card.Text data-testid="labels-wrapper">
          {issue.labels.map(label => (
            <React.Fragment key={label.id}>
              <Badge variant="secondary" className="mr-1">
                {label.name}
              </Badge>
            </React.Fragment>
          ))}
        </Card.Text>
        <Card.Text>
          <Button
            data-testid="button-details"
            onClick={() => setOpen(prevOpen => !prevOpen)}
            variant="primary"
          >
            {open ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={open} data-testid="collapse">
          <div className="mt-4">
            <ReactMarkdown source={issue.body} escapeHtml={false} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default Issue;
