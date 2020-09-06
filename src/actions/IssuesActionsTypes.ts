export const ISSUES_LOADING = 'LOAD_DATA_REQUEST';
export const ISSUES_SUCCESS = 'LOAD_DATA_SUCCESS';
export const ISSUES_FAIL = 'LOAD_DATA_FAILURE';
export const ISSUES_FILTERED_LOADING = 'LOAD_DATA_FILTERED_REQUEST';
export const ISSUES_FILTERED_SUCCESS = 'LOAD_DATA_FILTERED_SUCCESS';
export const ISSUES_FILTERED_FAIL = 'LOAD_DATA_FILTERED_FAIL';

type IssueLabel = {
  id: number;
  name: string;
};

export type Issue = {
  title: string;
  id: number;
  body: string;
  labels: IssueLabel[];
};

export interface IssuesLoading {
  type: typeof ISSUES_LOADING;
}
export interface IssuesSuccess {
  total_count: number;
  type: typeof ISSUES_SUCCESS;
  payload: Issue[];
}
export interface IssuesFail {
  type: typeof ISSUES_FAIL;
  payload: string;
}
export interface IssuesFilteredLoading {
  type: typeof ISSUES_FILTERED_LOADING;
}
export interface IssuesFilteredSuccess {
  type: typeof ISSUES_FILTERED_SUCCESS;
  payload: Issue[];
}
export interface IssuesFilteredFail {
  type: typeof ISSUES_FILTERED_FAIL;
  payload: string;
}

export type IssuesDispatchTypes =
  | IssuesLoading
  | IssuesSuccess
  | IssuesFail
  | IssuesFilteredLoading
  | IssuesFilteredSuccess
  | IssuesFilteredFail;
