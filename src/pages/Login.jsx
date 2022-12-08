import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  isValidLogin = () => {
    const { email, password } = this.state;
    const minimumPasswordLength = 6;
    if (email.includes('@') && email.includes('.com')
    && password.length >= minimumPasswordLength) return true;
  };

  onClickChange = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <br />
        Trybewallet
        <br />
        <br />
        <input
          type="text"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          value={ email }
          required
          placeholder="email"
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ password }
          required
          placeholder="senha"
        />
        <br />
        <br />
        <button
          type="button"
          disabled={ !this.isValidLogin() }
          onClick={ this.onClickChange }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default connect(mapStateToProps)(Login);
