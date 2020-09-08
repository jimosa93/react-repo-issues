import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '../../components/Search';

describe('Search button', () => {
  const requestSearch = jest.fn();
  const requestSubmitSearch = jest.fn();
  const requestSubmitButton = jest.fn();
  const issuesFiltered = [
    {
      title: 'issue title',
      id: 1234,
      number: 1234,
      body: 'some body',
      created_at: new Date('2015-12-21T16:28:31Z'),
      labels: [{ id: 12345, name: 'label 1' }]
    }
  ];

  const searchProps = {
    issueFilterSearch: 'React',
    issuesFiltered: issuesFiltered,
    loadingFiltered: false,
    setIssueFilterSearch: jest.fn(),
    setIssueSearch: requestSearch,
    handleSubmitSearch: requestSubmitSearch,
    handleSubmitButton: requestSubmitButton,
    errorFiltered: undefined
  };

  it('trigger request setIssueSearch', () => {
    const { getByTestId } = render(<Search {...searchProps} />);
    const searchAutocomplete = getByTestId('search-autocomplete');
    fireEvent.change(searchAutocomplete);
    expect(requestSearch).toHaveBeenCalled();
  });
  it('trigger request handleSubmitSearch function', () => {
    const { getByTestId } = render(<Search {...searchProps} />);
    const searchAutocomplete = getByTestId('search-autocomplete');
    fireEvent.change(searchAutocomplete);
    fireEvent.keyPress(searchAutocomplete, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(searchAutocomplete, { key: 'Enter', keyCode: 13 });
    expect(requestSubmitSearch).toHaveBeenCalled();
  });
  it('trigger request handleSubmitButton', () => {
    const { getByTestId } = render(<Search {...searchProps} />);
    const formAutocomplete = getByTestId('form-autocomplete');
    fireEvent.submit(formAutocomplete);
  });
  it('trigger error fetching input data', () => {
    const searchProps = {
      issueFilterSearch: 'React',
      issuesFiltered: issuesFiltered,
      loadingFiltered: false,
      setIssueFilterSearch: jest.fn(),
      setIssueSearch: requestSearch,
      handleSubmitSearch: requestSubmitSearch,
      handleSubmitButton: requestSubmitButton,
      errorFiltered: 'Error'
    };
    render(<Search {...searchProps} />);
  });
});
