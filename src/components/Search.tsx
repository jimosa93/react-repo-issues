import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Issue as IssueType } from '../actions/IssuesActionsTypes';
import TextField from '@material-ui/core/TextField';

interface SearchProps {
  issueFilterSearch: string;
  issuesFiltered: IssueType[];
  loadingFiltered: boolean;
  setIssueFilterSearch: React.Dispatch<React.SetStateAction<string>>;
  setIssueSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitSearch: (searchValue: string) => void;
  handleSubmitButton: () => void;
  errorFiltered: string | undefined;
}

const Search: React.FC<SearchProps> = ({
  issueFilterSearch,
  issuesFiltered,
  loadingFiltered,
  setIssueFilterSearch,
  setIssueSearch,
  handleSubmitSearch,
  handleSubmitButton,
  errorFiltered
}) => {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Autocomplete
          freeSolo
          disableClearable
          inputValue={issueFilterSearch}
          id="search-issues"
          options={issuesFiltered.map(option => option.title)}
          onInputChange={(event, newInputValue: any) => {
            setIssueFilterSearch(newInputValue);
            setIssueSearch(newInputValue);
          }}
          onChange={(event, newValue: any) => {
            handleSubmitSearch(newValue);
          }}
          loading={loadingFiltered}
          style={{ width: 400 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Search issue"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingFiltered ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
            />
          )}
        />
        <Button
          className="ml-2 my-1"
          size="lg"
          onClick={handleSubmitButton}
          variant="primary"
        >
          Search
        </Button>
        {errorFiltered && (
          <Alert variant="danger" className="m-2">
            Error fetching input data. Try refreshing
          </Alert>
        )}
      </Form.Row>
    </Form>
  );
};

export default Search;
