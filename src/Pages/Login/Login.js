import { Component } from 'react';
import { withRouter } from 'react-router';
import PageLayout from '../../Components/PageLayout';
import { FirebaseContext } from '../../Firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
        };
    }

    onChangeHandler = e => {
        const input = e.target.name;
        const value = e.target.value;

        this.setState(oldState => {
            return { ...oldState, [input]: value };
        });
    };

    onClickHandler = e => {
        e.preventDefault();
        const { email, password } = this.state;
        const { loginUser } = this.context;
        const { history } = this.props;
        loginUser(email, password)
        .then(_ => {
            history.push('/');
        });
    };

    static contextType = FirebaseContext;

    render() {
        return (
            <PageLayout>
                <main className="login-wrapper no-height">
                    <form action="" className="login-form">
                        <label htmlFor="email" className="login-form__email-label">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            onChange={e => {
                                this.onChangeHandler(e);
                            }}
                            className="login-form__email"
                        />
                        <label htmlFor="password" className="login-form__password-label">
                            Password
                        </label>
                        <input
                            type="text"
                            name="password"
                            onChange={e => {
                                this.onChangeHandler(e);
                            }}
                            className="login-form__password"
                        />
                        <button
                            className="login-form__button"
                            onClick={e => {
                                this.onClickHandler(e);
                            }}
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </main>
            </PageLayout>
        );
    }
}

export default withRouter(Login);
