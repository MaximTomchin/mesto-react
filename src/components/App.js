import React, {useEffect, useState} from 'react';
import '../index.css';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from './ImagePopup';
import ConfirmDeletionPopup from "./ConfirmDeletionPopup";

const App = React.memo ((props) =>  {
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [removedCard, setRemovedCard] = React.useState(null);


    useEffect(() => {
        api.getAllNeededData().then(argument => {
            const [ currentUser, cards ] = argument
            setCurrentUser(currentUser)
            setCards(cards)
        })
        .catch((err) => alert(err));
    }, []);

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick () {
       setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick () {
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleConfirmDeletionClick (card) {
        setIsConfirmDeletionPopupOpen(!isConfirmDeletionPopupOpen);
        setRemovedCard({
            _id: card._id,
        })
    }

    function handleCardClick (card) {
        setSelectedCard({
            name: card.name,
            link: card.link
        });
    }

    function handleUpdateUser (avatar) {
        api.setUserInfo(avatar).then(currentUser => {
            setCurrentUser(currentUser);
            closeAllPopups()
        })
            .catch((err) => alert(err));
    }

    function handleUpdateAvatar (data) {
        api.setUserAvatar(data).then(currentUser => {
            setCurrentUser(currentUser);
            closeAllPopups()
        })
            .catch((err) => alert(err));
    }

    function handleAddPlaceSubmit (card) {
        api.setNewCard(card).then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups()
        })
            .catch((err) => alert(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        })
            .catch((err) => alert(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter(c => c._id !== card._id);
            setCards(newCards);
            closeAllPopups()
        })
        .catch((err) => alert(err));
    }

    function closeAllPopups () {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDeletionPopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <div className="page">

            <CurrentUserContext.Provider value={currentUser}>

                <Header />

                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards = {cards}
                    onCardLike = {handleCardLike}
                    onCardDelete = {handleConfirmDeletionClick}
                />

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ConfirmDeletionPopup
                    isOpen={isConfirmDeletionPopupOpen}
                    card = {removedCard}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete}
                />

                <ImagePopup
                    card = {selectedCard}
                    onClose={closeAllPopups}
                />
            </CurrentUserContext.Provider>

        </div>
    );
})

export default App;
