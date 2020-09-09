import { getIssues, getFilteredIssues } from '../../actions/IssuesActions';
import * as types from '../../actions/IssuesActionsTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('load getIssues success', () => {
    fetchMock.get('*', { response: 200 });

    const expectedActions = [types.ISSUES_LOADING, types.ISSUES_SUCCESS];
    const store = mockStore({ issues: [] });

    return store.dispatch<any>(getIssues('')).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it('load getFilteredIssues success', () => {
    fetchMock.get('*', { response: 200 });

    const expectedActions = [
      types.ISSUES_FILTERED_LOADING,
      types.ISSUES_FILTERED_SUCCESS
    ];
    const store = mockStore({ issues: [] });

    return store.dispatch<any>(getFilteredIssues('')).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it('load getIssues failure', () => {
    const store = mockStore({});
    const expectedActions = [types.ISSUES_LOADING, types.ISSUES_FAIL];
    fetchMock.getOnce('/', {});

    return store.dispatch<any>(getIssues('')).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it('load getFilteredIssues failure', () => {
    const store = mockStore({});
    const expectedActions = [
      types.ISSUES_FILTERED_LOADING,
      types.ISSUES_FILTERED_FAIL
    ];
    fetchMock.getOnce('/', {});

    return store.dispatch<any>(getFilteredIssues('')).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
