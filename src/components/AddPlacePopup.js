import PopupWithForm from "./PopupWithForm";
import React from "react";

const AddPlacePopup = React.memo ((props) => {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        if (!props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            subtitle="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__field popup__field_type_add"
                value={name || ''}
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                onChange={handleChangeName}
            />
            <span
                id="name-card-error"
                className="error error_type_title"
            />
            <input
                className="popup__field popup__field_type_add"
                value={link || ''}
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                minLength="4"
                maxLength="200"
                onChange={handleChangeLink}
            />
            <span
                id="link-error"
                className="error error_type_link"
            />
        </PopupWithForm>
    );
})

export default AddPlacePopup;