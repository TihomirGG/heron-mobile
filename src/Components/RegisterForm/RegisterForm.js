import { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './RegisterForm.scss';
import { FirebaseContext } from '../../Firebase';
import ROUTES from '../../Constants/Routes';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repassword: '',
            error: false,
            errorText: '',
        };
        this.passwordMatchMsg = 'Passwords field dont match';
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

    passwordsMatchCheck = (password, repassword) => {
        if (password !== repassword) {
            this.setState(oldState => {
                return { ...oldState, error: true, errorText: this.passwordMatchMsg };
            });
            setTimeout(() => {
                this.setState(oldState => {
                    return { ...oldState, error: false, errorText: '' };
                });
            }, 2500);
            return;
        }
    };

    buttonHandler = e => {
        e.preventDefault();

        const { email, password, repassword } = this.state;
        const { createUser } = this.firebase;
        this.passwordsMatchCheck();
        createUser(email, password);
        this.props.history.push('/login');
    };

    static contextType = FirebaseContext;

    render() {
        return (
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
                <Link to={ROUTES.SING_IN} class="register-form__link">You already an account?</Link>
                <button className="register-form__button" type="submit" onClick={e => this.buttonHandler(e)}>
                    Register
                </button>
                ;
            </form>
        );
    }
}

export default withRouter(RegisterForm);
