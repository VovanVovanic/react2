import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext('');

const login = {
  email: 'stu@dent.com',
  password: '123'
};

const initDates = {
  email: '',
  isAuthorized: false,
  authorizeError: ''
};

class AuthProvider extends PureComponent {
  state = {
    ...initDates
  }

  authorize = (email , password) => {
    if ((email === login.email) && (password === login.password)) {
      this.setState({
        email,
        isAuthorized: true,
        authorizeError: ''
      });
    } else {
      this.setState({
        authorizeError: 'Email или пароль введён не верно'
      });
    }
  }

  logout = () => {
    this.setState({
      ...initDates
    });
  }

  getProviderValue = () => {
    const { email, isAuthorized, authorizeError } = this.state;

    return {
      email,
      isAuthorized,
      authorizeError,
      authorize: this.authorize,
      logout: this.logout
    };
  }

  render() {
    const { children } = this.props;
    
    return (
      <Provider value={this.getProviderValue()}>
        {children}
      </Provider>
    );
  }
}

const TestProvider = Provider;

export { AuthProvider, AuthConsumer, TestProvider };
