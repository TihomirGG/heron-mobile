import { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './RegisterForm.scss';
import { FirebaseContext } from '../../Firebase';
import ErrorMessage from '../ErrorMessage';
import ROUTES from '../../Constants/Routes';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repassword: '',
            error: false,
        };
        this.errorMsg = 'Email already taken!';
    }

    componentDidMount() {
        this.firebase = this.context;
    }

    inputHandler = e => {
        const input = e.target.name;
        const value = e.target.value;

        this.setState(oldState => {
            return { ...oldState, [input]: value };
        });
    };

    buttonHandler = e => {
        e.preventDefault();

        const { email, password, repassword } = this.state;
        const { createUser } = this.firebase;
        createUser(email, password)
            .then(x => {
                this.props.history.push('/login');
            })
            .catch(e => {
                this.setState(oldState => {
                    return { ...oldState, error: true };
                });

                setTimeout(() => {
                    this.setState(oldState => {
                        return { ...oldState, error: false };
                    });
                },2000)
            });


    };

    static contextType = FirebaseContext;

    validateForm = () => {
        const { email, password, repassword } = this.state;
        if (!email.includes('@')) return false;
        if (password.length < 6) return false;
        if (repassword !== password) return false;

        return true;
    };

    render() {
        return (
            <Fragment>
                {this.state.error ? <ErrorMessage message={this.errorMsg} /> : null}
                <form className="register-form" action="" method="POST">
                    {this.state.error ? this.state.errorText : ''}
                    <h2 className="register-form__header">Sign Up</h2>
                    <label className="register-form__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="register-form__input"
                        required
                        type="email"
                        onChange={e => this.inputHandler(e)}
                        name="email"
                        placeholder="*******@gmail.com"
                    />
                    <label className="register-form__label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="register-form__input"
                        required
                        minLength="6"
                        type="password"
                        onChange={e => this.inputHandler(e)}
                        name="password"
                        placeholder="********"
                    />
                    <label className="register-form__label" htmlFor="repassword">
                        Repeat Password
                    </label>
                    <input
                        className="register-form__input"
                        required
                        minLength="6"
                        type="password"
                        onChange={e => this.inputHandler(e)}
                        name="repassword"
                        placeholder="********"
                    />
                    <Link className="register-form__link" to={ROUTES.SING_IN} >
                        You already have an account?
                    </Link>
                    <button
                        disabled={this.validateForm() ? false : true}
                        className="register-form__button"
                        type="submit"
                        onClick={e => this.buttonHandler(e)}
                    >
                        Register
                    </button>
                </form>
            </Fragment>
        );
    }
}

export default withRouter(RegisterForm);
