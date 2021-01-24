import React from 'react';

function Card(props) {
    function handleClick () {
        props.onCardClick(props.card);
    }

    return (
        <figure className="element">
            <button className="element__button-reset" type="reset" aria-label="Delete"/>
            <div className="element__image-box"><img src={props.card.link} className="element__image" alt={props.card.name} onClick= {handleClick}/></div>
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-block">
                    <button className="element__button-like" type="button" aria-label="Like"/>
                    <p className="element__number-of-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </figure>
    );
}

export default Card;
