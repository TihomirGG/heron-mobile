import { Component } from 'react';
import { FirebaseContext } from '../../Firebase';
import { keyGenerator } from '../../Utils';
import { withRouter } from 'react-router-dom';
import './CaseForm.scss';

class CaseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryTypes: [],
            title: '',
            color: '',
            quantity: '',
            phone: '',
            price: '',
            description: '',
            image: '',
            type: '',
        };
    }

    static contextType = FirebaseContext;

    componentDidMount() {
        const { takeCategoryTypes } = this.context;
        takeCategoryTypes('case').then(x => {
            this.setState({ categoryTypes: x.types });
        });
    }

    onChangeHandler = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState(oldState => {
            return { ...oldState, [name]: value };
        });
    };

    onChangeImage = e => {
        const image = e.target.files[0];

        this.setState(oldState => {
            return { ...oldState, image: image };
        });
    };

    onClickHanler = e => {
        e.preventDefault();
        const { color, image, title, price, quantity, type, phone, description } = this.state;
        const data = { color, image, title, price, quantity, type, phone, description, itemType: 'case' };
        const { uploadItem } = this.context;
        uploadItem(data).then(x => {
           console.log(this.props);
           this.props.history.push('/shop');
        });
    };

    render() {
        return (
            <form className="case-form">
                <label htmlFor="title">
                    Title:
                    <input onChange={e => this.onChangeHandler(e)} type="text" name="title" />
                </label>
                <label htmlFor="color">
                    Color:
                    <input onChange={e => this.onChangeHandler(e)} type="text" name="color" />
                </label>
                <label htmlFor="quantity">
                    Quantity:
                    <input onChange={e => this.onChangeHandler(e)} type="number" name="quantity" />
                </label>
                <label htmlFor="price">
                    Price:
                    <input onChange={e => this.onChangeHandler(e)} type="number" name="price" />
                </label>
                <label htmlFor="description">
                    Description:
                    <textarea onChange={e => this.onChangeHandler(e)} name="description" cols="30" rows="10"></textarea>
                </label>
                <label htmlFor="type">
                    Type:
                    <select defaultValue="default" onChange={e => this.onChangeHandler(e)} name="type">
                        <option value="default">None</option>
                        {this.state.categoryTypes.map(x => {
                            return (
                                <option key={keyGenerator()} value={x}>
                                    {x}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <label htmlFor="phone">
                    Phone:
                    <input onChange={e => this.onChangeHandler(e)} type="text" name="phone" />
                </label>
                <label htmlFor="image">
                    <input onChange={e => this.onChangeImage(e)} type="file" name="image" />
                </label>
                <button
                    onClick={e => {
                        this.onClickHanler(e);
                    }}
                >
                    Submit
                </button>
            </form>
        );
    }
}

export default withRouter(CaseForm);
