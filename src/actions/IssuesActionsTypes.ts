export const ISSUES_LOADING = 'LOAD_DATA_REQUEST';
export const ISSUES_SUCCESS = 'LOAD_DATA_SUCCESS';
export const ISSUES_FAIL = 'LOAD_DATA_FAILURE';
export const ISSUES_FILTERED_LOADING = 'LOAD_DATA_FILTERED_REQUEST';
export const ISSUES_FILTERED_SUCCESS = 'LOAD_DATA_FILTERED_SUCCESS';
export const ISSUES_FILTERED_FAIL = 'LOAD_DATA_FILTERED_FAIL';

type IssueLabelT = {
  id: number;
  name: string;
};

export type IssueT = {
  title: string;
  id: number;
  number: number;
  body: string;
  created_at: Date;
  labels: IssueLabelT[];
};

export interface IssuesLoading {
  type: typeof ISSUES_LOADING;
}
export interface IssuesSuccess {
  total_count: number;
  type: typeof ISSUES_SUCCESS;
  payload: IssueT[];
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
  payload: IssueT[];
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
