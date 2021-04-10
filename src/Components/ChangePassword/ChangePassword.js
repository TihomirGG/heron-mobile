import { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../../Firebase';
import SuccessMessage from '../SuccessMessage';
import './ChangePassword.scss';

function ChangePassword(props) {
    const [currPass, setCurrPass] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [message, setMessage] = useState(null);
    const fireBase = useContext(FirebaseContext);

    useEffect(() => {
        fireBase.getCurrentPassword().then(x => {
            setCurrPass(x);
        });
    }, []);

    const onChangeOld = e => {
        setOldPassword(e.target.value);
    };

    const onChangeNew = e => {
        setNewPassword(e.target.value);
    };

    const validate = () => {
        if (!currPass) return false;
        if (currPass !== oldPassword) return false;
        if (newPassword.length < 6) return false;
        return true;
    };

    const onClick = e => {
        e.preventDefault();
        fireBase.changePassword(currPass, newPassword).then(x => {
            console.log(x);
            setMessage(x);
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        });
    };
    return (
        <div className="change-password">
            {message ? <SuccessMessage message={message} /> : null}
            <form className="change-password__form">
                <h2 className="change-password__header">Change Password</h2>
                <label className="change-password__label" htmlFor="cur">
                    Current Password
                </label>
                <input
                    onChange={e => onChangeOld(e)}
                    className="change-password__input"
                    required
                    type="password"
                    name=""
                    id="cur"
                />
                <label className="change-password__label" htmlFor="new">
                    New Password
                </label>
                <input
                    onChange={e => onChangeNew(e)}
                    className="change-password__input"
                    required
                    type="password"
                    id="new"
                />
                <button
                    onClick={e => {
                        onClick(e);
                    }}
                    disabled={validate() ? false : true}
                    className="change-password__btn"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
