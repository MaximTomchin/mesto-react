import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = React.memo ((props) => {
    const currentUser = useContext(CurrentUserContext);
    const [formValues, setFormValues] = useState({
        userName:  "",
        description: "",
    });

    const {userName, description} = formValues;

    useEffect(() => {
        setFormValues({
            userName: currentUser.name,
            description: currentUser.about,});
    }, [currentUser, props.isOpen]);

    useEffect(() => {
        if (!props.isOpen) {
            setFormValues({
                userName:  currentUser.name,
                description: currentUser.about,
            });
        }
    }, [currentUser, props.isOpen]);

    function handleInputChange (e) {
        const {name, value} = e.target;
        setFormValues(prevState => ({...prevState, [name] : value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: userName,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            subtitle="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >

            <input
                className="popup__field"
                type="text"
                name="userName"
                value={userName  || ''}
                placeholder="Имя"
                onChange={handleInputChange}
            />

            <input
                className="popup__field"
                type="text"
                name="description"
                value={description || ''}
                placeholder="Описание"
                onChange={handleInputChange}
            />
        </PopupWithForm>
    );
})

export default EditProfilePopup;

