import { Link } from 'react-router-dom';
import ROUTES from '../../Constants/Routes';
import Option from '../Option';
import './Options.scss';

function Options(props) {
    

    return (
        <div className="options-wrapper">
            <h2 className="options-wrapper__header">Dont miss ours</h2>
            <div className="options-wrapper__options">
               <Option route={ROUTES.CASES} content="cases"></Option>
               <Option route={ROUTES.PROTECTORS} content="protectors"></Option>
               <Option route={ROUTES.CABLES} content="cables"></Option>
            </div>
        </div>
    );
}

export default Options;
