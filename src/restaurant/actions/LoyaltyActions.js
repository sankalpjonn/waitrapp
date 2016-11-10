import AppDispatcher from './../../dispatcher/AppDispatcher';
import { statement, debit, credit } from './../WebAPIUtils/orders';

export function getStatement(phoneNumber) {
  statement({ UserPhoneNo: phoneNumber });
}

export function savePhoneNumber(details) {
  AppDispatcher.dispatch({
    actionType: 'SAVE_PHONE_NUMBER',
    details,
  });
}

export function statementSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'STATEMENT_SUCCESS',
    result,
  });
}

export function statementFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'STATEMENT_FAILED',
    error,
  });
}

export function postDebit(phoneNumber, value) {
  debit(phoneNumber, value);
}

export function debitSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'DEBIT_SUCCESS',
    result,
  });
}

export function debitFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'DEBIT_FAILED',
    error,
  });
}

export function postCredit(phoneNumber, value) {
  credit(phoneNumber, value);
}

export function creditSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'CREDIT_SUCCESS',
    result,
  });
}

export function creditFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'CREDIT_FAILED',
    error,
  });
}
