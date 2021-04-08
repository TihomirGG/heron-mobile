import { useLocation, Link } from 'react-router-dom';
import './Option.scss';

function Option(props) {
    const { pathname } = useLocation();
    const productType = pathname.substring(6);
    const { content, route } = props;

    const shouldNotDisplayLink = content === productType;

    if (shouldNotDisplayLink) {
        return null;
    }
    return (
        <Link to={route} className="options-link">
            {`${content.charAt(0).toUpperCase()}${content.slice(1)}`}
        </Link>
    );
}

export default Option;
