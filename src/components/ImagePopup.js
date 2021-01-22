import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${(props.card ? ' popup_opened' : '')}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <figure className="popup__image-block">
                <button className="popup__close-button popup__close-button_type_image" type="reset"
                        aria-label="Close" onClick={props.onClose}></button>
                <img src={props.card ? props.card.link : ''} className="popup__image" alt={props.card ? props.card.name : ''}/>
                <p className="popup__caption">{props.card ? props.card.name : ''}</p>
            </figure>
        </div>
    );
}

export default ImagePopup