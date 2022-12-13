import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { addExpense, completeEditExpenseAc, fetchCurrencies } from '../redux/actions';

const alimentacao = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
    exchangeRates: '',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { expenses, idToEdit, editor } = this.props;
    if (editor !== prevProps.editor) {
      console.log('re-renderizou po');
      this.setState({
        ...expenses[idToEdit],
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch, expenseId, editor } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        delete currencies.USDT;
        this.setState((prevState) => ({
          ...prevState,
          exchangeRates: currencies,
          id: expenseId,
        }), () => {
          if (editor) {
            dispatch(completeEditExpenseAc(this.state));
            this.setState((prevState) => ({
              ...prevState,
              value: '',
              description: '',
              method: 'Dinheiro',
              tag: alimentacao,
            }));
          } else {
            dispatch(addExpense(this.state));
            this.setState((prevState) => ({
              ...prevState,
              value: '',
              description: '',
              currency: 'USD',
              method: 'Dinheiro',
              tag: alimentacao,
            }));
          }
        });
      });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          {
            currencies.map((currencyTX, index) => (
              <option
                key={ index }
                value={ currencyTX }
              >
                {currencyTX}
              </option>
            ))
          }
        </select>
        <select
          name="method"
          id="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito"> Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {
          editor ? (
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Editar despesa
            </button>
          )
            : (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
        }

      </form>
    );
  }
}

WalletForm.propTypes = ({
  dispatch: Proptypes.func.isRequired,
  currencies: Proptypes.arrayOf(Proptypes.string.isRequired).isRequired,
  expenseId: Proptypes.number.isRequired,
  editor: Proptypes.bool.isRequired,
  expenses: Proptypes
    .arrayOf(Proptypes.shape(Proptypes.any.isRequired).isRequired).isRequired,
  idToEdit: Proptypes.number.isRequired,
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseId: state.wallet.expenses.length,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
