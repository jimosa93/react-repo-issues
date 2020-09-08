import { getIssues, getFilteredIssues } from '../../actions/IssuesActions';
import * as types from '../../actions/IssuesActionsTypes';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
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
    var mock = new MockAdapter(axios);
    const data = { response: true };
    mock
      .onGet(
        'https://api.github.com/search/issues?q=state:open+repo:facebook/react+react+in:title&sort=created&order=asc&per_page=5&page=1'
      )
      .reply(404, data);

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
    var mock = new MockAdapter(axios);
    const data = { response: true };
    mock
      .onGet(
        'https://api.github.com/search/issues?q=state:open+repo:facebook/react+react+in:title&sort=created&order=asc&per_page=5&page=1'
      )
      .reply(404, data);

    return store.dispatch<any>(getFilteredIssues('')).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
