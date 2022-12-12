import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('some tests in the Login component', () => {
  it('has login and password inputs on the screen', () => {
    renderWithRouterAndRedux(<App />);

    const loginInputEl = screen.getByRole('textbox');
    const passwordInputEl = screen.getByPlaceholderText(/senha/i);
    expect(loginInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
  });
  it('has a login button and it starts disabled', () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  it('changes route to "/carteira" when we complete login and password then click', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const loginInputEl = screen.getByRole('textbox');
    const passwordInputEl = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(loginInputEl, 'gabriel@test.com');
    userEvent.type(passwordInputEl, '123456');
    userEvent.click(loginButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
  it('has a correct totalValue on the screen when we add a expense', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const valueInputEl = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const addExpenseButtonEl = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.type(valueInputEl, '1');
    userEvent.click(addExpenseButtonEl);

    expect(screen.findByText(/5\.24/i));
  });
});
