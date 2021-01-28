import React from 'react';

const PopupWithForm = React.memo ((props) => {

    return (
        <div className={`popup popup_type_${props.name}` + (props.isOpen ? ' popup_opened' : '')}>
            <div className="popup__overlay" onClick={props.onClose} />
            <form className={`popup__container popup__container_type_${props.name}`} name={props.name}
                  onSubmit={props.onSubmit}>
                <button className="popup__close-button" type="reset" aria-label="Close" onClick={props.onClose}/>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button className={`popup__button popup__button_${props.name}`}>{props.subtitle}</button>
            </form>
        </div>
    );
})

export default PopupWithForm;