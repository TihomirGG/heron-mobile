import { Component } from 'react';
import PageLayout from '../../Components/PageLayout';
import RegisterForm from '../../Components/RegisterForm';
import './Register.scss';

class Register extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <PageLayout>
                <RegisterForm value={this.props.value}></RegisterForm>
            </PageLayout>
        )
    }
}

export default Register;
