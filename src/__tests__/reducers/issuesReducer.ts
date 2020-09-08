import reducer from '../../reducers/IssuesReducer';
import * as types from '../../actions/IssuesActionsTypes';

describe('Issues reducer', () => {
  it('should handle ISSUES_LOADING', () => {
    expect(
      reducer(
        {
          loading: false,
          issues: [],
          loadingFiltered: false,
          issuesFiltered: [],
          total_count: 0
        },
        {
          type: types.ISSUES_LOADING
        }
      )
    ).toEqual({
      issues: [],
      issuesFiltered: [],
      loading: true,
      loadingFiltered: false,
      total_count: 0
    });
  });
  it('should handle ISSUES_SUCCESS', () => {
    expect(
      reducer(
        {
          loading: false,
          issues: [],
          loadingFiltered: false,
          issuesFiltered: [],
          total_count: 0
        },
        {
          type: types.ISSUES_SUCCESS,
          total_count: 0,
          payload: []
        }
      )
    ).toEqual({
      issues: [],
      issuesFiltered: [],
      loading: false,
      loadingFiltered: false,
      total_count: 0
    });
  });
  it('should handle ISSUES_FAIL', () => {
    expect(
      reducer(
        {
          loading: false,
          issues: [],
          loadingFiltered: false,
          issuesFiltered: [],
          total_count: 0
        },
        {
          type: types.ISSUES_FAIL,
          payload: ''
        }
      )
    ).toEqual({
      issues: [],
      issuesFiltered: [],
      loading: false,
      loadingFiltered: false,
      total_count: 0,
      error: ''
    });
  });
});
describe('Issues Filtered reducer', () => {
  it('should handle ISSUES_FILTERED_LOADING', () => {
    expect(
      reducer(
        {
          loading: false,
          issues: [],
          loadingFiltered: false,
          issuesFiltered: [],
          total_count: 0
        },
        {
          type: types.ISSUES_FILTERED_LOADING
        }
      )
    ).toEqual({
      issues: [],
      issuesFiltered: [],
      loading: false,
      loadingFiltered: true,
      total_count: 0
    });
  });
  it('should handle ISSUES_FILTERED_SUCCESS', () => {
    expect(
      reducer(
        {
          loading: false,
          issues: [],
          loadingFiltered: false,
          issuesFiltered: [],
          total_count: 0
        },
        {
          type: types.ISSUES_FILTERED_SUCCESS,
          payload: []
        }
      )
    ).toEqual({
      issues: [],
      issuesFiltered: [],
      loading: false,
      loadingFiltered: false,
      total_count: 0
    });
  });
  it('should handle ISSUES_FILTERED_FAIL', () => {
    expect(
      reducer(
        {
          loading: false,
          issues: [],
          loadingFiltered: false,
          issuesFiltered: [],
          total_count: 0
        },
        {
          type: types.ISSUES_FILTERED_FAIL,
          payload: ''
        }
      )
    ).toEqual({
      issues: [],
      issuesFiltered: [],
      loading: false,
      loadingFiltered: false,
      total_count: 0,
      errorFiltered: ''
    });
  });
  it('should handle Default', () => {
    expect(
      reducer(undefined, {
        type: 'Default'
      })
    ).toEqual({
      issues: [],
      issuesFiltered: [],
      loading: false,
      loadingFiltered: false,
      total_count: 0
    });
  });
});
