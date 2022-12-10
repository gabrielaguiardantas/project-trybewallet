// Coloque aqui suas actions

// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

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

// thunk action creator: deve retornar uma função
export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(receiveCurrencies(currencies)));
}

// export function fetchCurrenciesWithExpense() {
//   return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((currencies) => dispatch(addExpense(state, currencies)));
// }
