import PageLayout from '../../Components/PageLayout';
import ChangePassword from '../../Components/ChangePassword';
import Orders from '../../Components/Orders';
import './Profile.scss';

function Profile(props) {
    return (
        <PageLayout>
            <ChangePassword></ChangePassword>
            <Orders></Orders>
        </PageLayout>
    );
}

export default Profile;
