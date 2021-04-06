import { useLocation, Link } from 'react-router-dom';

function Option(props) {
    const { pathname } = useLocation();
    const productType = pathname.substring(6);
    const { content, route } = props;

    const shouldNotDisplayLink = content === productType;

    if (shouldNotDisplayLink) {
        return null;
    }
    return (
        <Link to={route} className="">
            {`${content.charAt(0).toUpperCase()}${content.slice(1)}`}
        </Link>
    );
}

export default Option;
