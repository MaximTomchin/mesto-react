import React from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletionPopup = React.memo ((props) => {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard(props.card);
    }

    return (
        <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            subtitle="Да"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    );
})

export default ConfirmDeletionPopup;