import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = React.memo ((props) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardDeleteButtonClassName = (
        `element__button-reset ${isOwn ? 'element__button-reset_active' : ''}`
    );
    const cardLikeButtonClassName = (
        `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
    );

    function handleClick () {
        props.onCardClick(props.card);
    }

    function handleLikeClick () {
        props.onCardLike(props.card);
    }

    function handleDeleteClick () {
        props.onCardDelete(props.card);
    }

    return (
        <figure className="element">
            <button
                className={cardDeleteButtonClassName}
                type="reset"
                aria-label="Delete"
                onClick={handleDeleteClick}
            />
            <div className="element__image-box">
                <img
                    src={props.card.link}
                    className="element__image"
                    alt={props.card.name}
                    onClick={handleClick}
                />
            </div>
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-block">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Like"
                        onClick={handleLikeClick}
                    />
                    <p className="element__number-of-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </figure>
    );
})

export default Card;
