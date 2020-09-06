import { Dispatch } from 'redux';
import axios from 'axios';
import {
  IssuesDispatchTypes,
  ISSUES_FAIL,
  ISSUES_LOADING,
  ISSUES_SUCCESS,
  ISSUES_FILTERED_SUCCESS,
  ISSUES_FILTERED_LOADING,
  ISSUES_FILTERED_FAIL
} from './IssuesActionsTypes';

const BASE_URL = 'https://api.github.com/search/issues';

export const getIssues = (search: string, page: number = 1) => async (
  dispatch: Dispatch<IssuesDispatchTypes>
) => {
  try {
    dispatch({
      type: ISSUES_LOADING
    });
    const { data } = await axios.get(
      `${BASE_URL}?q=state:open+repo:facebook/react+${search}+in:title&sort=created&order=desc&per_page=20&page=${page}`
    );
    dispatch({
      type: ISSUES_SUCCESS,
      payload: data.items,
      total_count: data.total_count
    });
  } catch (error) {
    dispatch({ type: ISSUES_FAIL, payload: error.message });
  }
};

export const getFilteredIssues = (search: string) => async (
  dispatch: Dispatch<IssuesDispatchTypes>
) => {
  try {
    dispatch({
      type: ISSUES_FILTERED_LOADING
    });
    const { data } = await axios.get(
      `${BASE_URL}?q=state:open+repo:facebook/react+${search}+in:title&sort=created&order=desc&per_page=50`
    );
    dispatch({ type: ISSUES_FILTERED_SUCCESS, payload: data.items });
  } catch (error) {
    dispatch({ type: ISSUES_FILTERED_FAIL, payload: error.message });
  }
};
