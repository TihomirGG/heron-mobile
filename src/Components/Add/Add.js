import { Component } from 'react';
import CaseForm from '../CaseForm';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            case: false,
            protector: false,
            cable: false,
        };
    }

    onChangeHandler = e => {
        const name = e.target.id;
        this.setState({ case: false, protector: false, cable: false, [name]: true });
    };

    render() {
        return (
            <div>
                <h2>What are you going to add?</h2>
                <label htmlFor="case">Case</label>
                <input
                    onChange={e => this.onChangeHandler(e)}
                    type="radio"
                    id="case"
                    name="option"
                    value="case"
                ></input>
                <label htmlFor="cable">Cable</label>
                <input
                    onChange={e => this.onChangeHandler(e)}
                    type="radio"
                    id="cable"
                    name="option"
                    value="cable"
                ></input>
                <label htmlFor="protector">Protector</label>
                <input
                    onChange={e => this.onChangeHandler(e)}
                    type="radio"
                    id="protector"
                    name="option"
                    value="protector"
                ></input>
                {this.state.case ? <CaseForm></CaseForm> : ''}
            </div>
        );
    }
}

export default Add;
