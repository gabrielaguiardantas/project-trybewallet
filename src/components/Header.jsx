import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const totalField = '0';
    const currencyField = 'BRL';
    const { email /* expenses, currency */ } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p data-testid="total-field">
          Despesa Total: R$
          {' '}
          {totalField}
        </p>
        <p data-testid="header-currency-field">
          {currencyField}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
