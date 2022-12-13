import { ADD_EXPENSE,
  COMPLETE_EDIT_EXPENSE,
  DELETE_EXPENSE, EDIT_EXPENSE, RECEIVE_CURRENCIES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES: {
    const currenciesList = [...Object.keys(action.currencies)];
    currenciesList.splice(1, 1);
    return {
      ...state,
      currencies: currenciesList,
    };
  }
  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.state],
      idToEdit: action.state.id,
    };
  }
  case DELETE_EXPENSE: {
    const expensesList = [...state.expenses];

    return {
      ...state,
      expenses: expensesList.filter((expense) => expense.id !== action.expenseId),
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state,
      editor: true,
      idToEdit: action.expense.id,
    };
  }
  case COMPLETE_EDIT_EXPENSE: {
    const expenseToEdit = state.expenses
      .find((expense) => expense.id === action.expense.id);
    const expensesList = [...state.expenses];
    expensesList.splice(expensesList.indexOf(expenseToEdit), 1, action.expense);
    return {
      ...state,
      editor: false,
      expenses: expensesList,
    };
  }
  default:
    return state;
  }
};

export default wallet;
