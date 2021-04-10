import { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PageLayout from '../../Components/PageLayout';
import { FirebaseContext } from '../../Firebase';
import ErrorMessage from '../../Components/ErrorMessage';
import ROUTES from '../../Constants/Routes';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            email: undefined,
            password: undefined,
            error: undefined,
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
            .then(err => {
                console.log(err);
                if (typeof err === 'string') {
                    this.setState(oldState => {
                        return { ...oldState, error: err };
                    });
                    return;
                }
                history.push('/shop');
            })
            .catch(e => {
                this.setState(oldState => {
                    return { ...oldState, error: "Invalid email or password" };
                });
                setTimeout(() => {
                    this.setState(oldState => {
                        return { ...oldState, error: undefined };
                    });
                },2000)
            });
    };

    static contextType = FirebaseContext;

    render() {
        return (
            <PageLayout>
                {this.state.error ? <ErrorMessage message={this.state.error} /> : null}
                <main className="login-wrapper">
                    <form action="" className="login-wrapper__login-form">
                        <h2 className="login-wrapper__header">Sign In</h2>
                        <label htmlFor="email" className="login-wrapper__label">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            onChange={e => {
                                this.onChangeHandler(e);
                            }}
                            className="login-wrapper__input"
                        />
                        <label htmlFor="password" className="login-wrapper__label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={e => {
                                this.onChangeHandler(e);
                            }}
                            className="login-wrapper__input"
                        />
                        <Link className="login-wrapper__link" to={ROUTES.SIGN_UP}>
                            Dont have an Accout?
                        </Link>
                        <button
                            className="login-wrapper__button"
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
