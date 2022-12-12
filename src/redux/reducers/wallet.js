import { ADD_EXPENSE, DELETE_EXPENSE, RECEIVE_CURRENCIES } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
