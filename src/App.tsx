import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from './store';
import { getIssues, getFilteredIssues } from './actions/IssuesActions';
import Issue from './components/Issue';
import { IssueT } from './actions/IssuesActionsTypes';
import Search from './components/Search';

import Pagination from '@material-ui/lab/Pagination';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [issueSearch, setIssueSearch] = useState('');
  const [issueFilterSearch, setIssueFilterSearch] = useState('');
  const { loading, issues, error, total_count } = useSelector(
    (state: RootStore) => state.issues
  );
  const { loadingFiltered, issuesFiltered, errorFiltered } = useSelector(
    (state: RootStore) => state.issues
  );
  const pages = Math.ceil(total_count / 20);

  useEffect(() => {
    dispatch(getIssues(''));
    dispatch(getFilteredIssues(''));
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (issueFilterSearch.length > 2) {
        dispatch(getFilteredIssues(issueFilterSearch));
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [issueFilterSearch, dispatch]);

  const handleSubmitSearch = (searchValue: string) => {
    dispatch(getIssues(searchValue));
  };

  const handleSubmitButton = () => {
    dispatch(getIssues(issueSearch));
  };

  const handlePaginationChange = (event: Object, page: number) => {
    dispatch(getIssues(issueSearch, page));
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Issues Finder for React’s repo</h1>
      <Search
        issueFilterSearch={issueFilterSearch}
        issuesFiltered={issuesFiltered}
        loadingFiltered={loadingFiltered}
        setIssueFilterSearch={setIssueFilterSearch}
        setIssueSearch={setIssueSearch}
        errorFiltered={errorFiltered}
        handleSubmitButton={handleSubmitButton}
        handleSubmitSearch={handleSubmitSearch}
      />
      {pages > 1 && (
        <>
          <Row className="justify-content-md-center my-3">
            <Col md="auto">
              <Pagination count={pages} onChange={handlePaginationChange} />
            </Col>
          </Row>
          <Row>
            <Alert variant="light">{total_count} issues found</Alert>
          </Row>
        </>
      )}

      {loading && <Alert variant="info">Loading...</Alert>}
      {error && (
        <Alert variant="danger">Error fetching issues. Try Refreshing.</Alert>
      )}
      {issues.length === 0 && !error && !loading && (
        <Alert variant="secondary">No issues found.</Alert>
      )}
      {issues.map((issue: IssueT) => (
        <Issue data-testid="issue-item" key={issue.id} issue={issue} />
      ))}
      {pages > 1 && (
        <Row className="justify-content-md-center my-3">
          <Col md="auto">
            <Pagination count={pages} onChange={handlePaginationChange} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
