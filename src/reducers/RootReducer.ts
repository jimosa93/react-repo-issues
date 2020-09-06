import { combineReducers } from 'redux';
import issuesReducer from './IssuesReducer';

const RootReducer = combineReducers({
  issues: issuesReducer
});

export default RootReducer;
