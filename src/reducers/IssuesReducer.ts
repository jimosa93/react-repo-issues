import {
  IssueT,
  IssuesDispatchTypes,
  ISSUES_LOADING,
  ISSUES_SUCCESS,
  ISSUES_FAIL,
  ISSUES_FILTERED_LOADING,
  ISSUES_FILTERED_SUCCESS,
  ISSUES_FILTERED_FAIL
} from '../actions/IssuesActionsTypes';

interface DefaultStateI {
  loading: boolean;
  issues: IssueT[];
  error?: string;
  loadingFiltered: boolean;
  issuesFiltered: IssueT[];
  errorFiltered?: string;
  total_count: number;
}

const defaultState: DefaultStateI = {
  loading: false,
  issues: [],
  loadingFiltered: false,
  issuesFiltered: [],
  total_count: 0
};

const issuesReducer = (
  state: DefaultStateI = defaultState,
  action: IssuesDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case ISSUES_LOADING:
      return { ...state, loading: true };
    case ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.payload,
        total_count: action.total_count
      };
    case ISSUES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ISSUES_FILTERED_LOADING:
      return { ...state, loadingFiltered: true };
    case ISSUES_FILTERED_SUCCESS:
      return {
        ...state,
        loadingFiltered: false,
        issuesFiltered: action.payload
      };
    case ISSUES_FILTERED_FAIL:
      return {
        ...state,
        loadingFiltered: false,
        errorFiltered: action.payload
      };
    default:
      return state;
  }
};

export default issuesReducer;
