import React from 'react';
import Card from './Card';
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = React.memo ((props) => {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <figure className="profile__box">
                    <figure className="profile__avatar-box">
                        <img className="profile__avatar" src = {currentUser.avatar} alt="Фотопортрет"/>
                        <button className="profile__change-avatar-button" type="button" aria-label="Edit" onClick={props.onEditAvatar}/>
                    </figure>
                    <div className="profile__info">
                        <div className="profile__text-block">
                            <h1 className="profile__name" id="">{currentUser.name}</h1>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                        <button className="profile__edit-button" type="button" aria-label="Edit" onClick={props.onEditProfile}/>
                    </div>
                </figure>
                <button className="profile__add-button"  type="button" area-label="Add" onClick={props.onAddPlace}
                />
            </section>

            <section className="elements">
                {props.cards.map((card) =>
                    (<Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike = {props.onCardLike}
                        onCardDelete = {props.onCardDelete}
                    />)
                    )}
            </section>
        </main>
    );
})

export default Main;