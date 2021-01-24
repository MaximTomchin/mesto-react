import React, {useState, useEffect} from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

    const [userInfo, setUserInfo] = useState([]);
    const [cards, setCards] = useState([]);

    let userName = "";
    let userDescription = "";
    let userAvatar = "";

    useEffect(() => {
        api.getUserInfo().then(userInfo => {
            setUserInfo(userInfo);
        })
            .catch((err) => alert(err));
    }, []);

    userName  = userInfo.name;
    userDescription = userInfo.about;
    userAvatar = userInfo.avatar;

    useEffect(() => {
        api.getInitialCards().then(cards => {
            setCards(cards)
        })
            .catch((err) => alert(err));
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <figure className="profile__box">
                    <figure className="profile__avatar-box">
                        <img className="profile__avatar" src = {userAvatar} alt="Фотопортрет"/>
                        <button className="profile__change-avatar-button" type="button" aria-label="Edit" onClick={props.onEditAvatar}/>
                    </figure>
                    <div className="profile__info">
                        <div className="profile__text-block">
                            <h1 className="profile__name" id="">{userName}</h1>
                            <p className="profile__description">{userDescription}</p>
                        </div>
                        <button className="profile__edit-button" type="button" aria-label="Edit" onClick={props.onEditProfile}/>
                    </div>
                </figure>
                <button className="profile__add-button"  type="button" area-label="Add" onClick={props.onAddPlace}
                />
            </section>

            <section className="elements">
                {cards.map((card, i) =>
                    <Card
                        key={i}
                        card={card}
                        onCardClick={props.onCardClick}
                    />
                    )}
            </section>
        </main>
    );
}

export default Main;