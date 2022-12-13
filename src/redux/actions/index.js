// Coloque aqui suas actions

// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const COMPLETE_EDIT_EXPENSE = 'COMPLETE_EDIT_EXPENSE';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const addExpense = (state) => ({
  type: ADD_EXPENSE,
  state,
});

export const deleteExpenseAc = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});

export const editExpenseAc = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});
export const completeEditExpenseAc = (expense) => ({
  type: COMPLETE_EDIT_EXPENSE,
  expense,
});

// thunk action creator: deve retornar uma função
export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      delete currencies.USDT;
      dispatch(receiveCurrencies(currencies));
    });
}
