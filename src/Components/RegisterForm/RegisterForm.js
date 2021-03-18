import { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './RegisterForm.scss';
import { FirebaseContext } from '../../Firebase';

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
            <form action="" method="POST">
                {this.state.error ? this.state.errorText : ''}
                <label htmlFor="email">Email</label>
                <input
                    required
                    type="email"
                    onChange={e => this.inputHandler(e)}
                    name="email"
                    placeholder="*******@gmail.com"
                />
                <label htmlFor="password">Password</label>
                <input
                    required
                    minLength="6"
                    type="password"
                    onChange={e => this.inputHandler(e)}
                    name="password"
                    placeholder="********"
                />
                <label htmlFor="repassword">Repeat Password</label>
                <input
                    required
                    minLength="6"
                    type="password"
                    onChange={e => this.inputHandler(e)}
                    name="repassword"
                    placeholder="********"
                />
                <button type="submit" onClick={e => this.buttonHandler(e)}>
                    Register
                </button>
                ;
            </form>
        );
    }
}

export default withRouter(RegisterForm);
