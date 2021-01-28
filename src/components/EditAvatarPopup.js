import React from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditAvatarPopup = React.memo ((props) => {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef();
    const  [avatar, setAvatar] = React.useState('');

   React.useEffect( () => {
        setAvatar(currentUser.avatar);
   }, [currentUser]);

    React.useEffect(() => {
        if (!props.isOpen) {
            setAvatar(currentUser.avatar);
        }
    }, [currentUser, props.isOpen]);

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            subtitle="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__field popup__field_type_change-avatar"
                ref={avatarRef}
                value={avatar || ''}
                id="avatar"
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                minLength="4"
                maxLength="200"
                onChange={handleChangeAvatar}
            />
            <span
                id="avatar-error"
                className="error error_type_avatar"
            />
        </PopupWithForm>
    );
})

export default EditAvatarPopup;