import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick () {
       setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick () {
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleCardClick (card) {
        setSelectedCard({
            name: card.name,
            link: card.link
        });
    }

    function closeAllPopups () {
       if (isAddPlacePopupOpen) {
           setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
       }
       if(isEditProfilePopupOpen) {
           setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
       }
       if(isEditAvatarPopupOpen) {
           setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
       }
       if(selectedCard)
           setSelectedCard(!selectedCard);
    }

    return (
        <div className="page">
            <Header />

            <Main onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}/>

            <Footer />

            <PopupWithForm name="edit"
                           title="Редактировать профиль"
                           subtitle="Сохранить"
                           isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}>
                <input className="popup__field" id="user-name" type="text" name="name" defaultValue="Имя"
                       placeholder="Имя" minLength="2" maxLength="40" required />
                <span id="user-name-error" className="error error_type_name"></span>
                <input className="popup__field" id="about" type="text" name="about" defaultValue="Описание"
                       placeholder="Описание" minLength="2" maxLength="200" required />
                <span id="about-error" className="error error_type_about"></span>
            </PopupWithForm>

            <PopupWithForm name="add"
                           title="Новое место"
                           subtitle="Создать"
                           isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups}>
                <input className="popup__field popup__field_type_add" id="name-card" type="text" name="name"
                       defaultValue=""
                   placeholder="Название" minLength="2" maxLength="30" />
                <span id="name-card-error" className="error error_type_title"></span>
                <input className="popup__field popup__field_type_add" id="link" type="url" name="link"
                       defaultValue="" placeholder="Ссылка на картинку" minLength="4" maxLength="200"/>
                <span id="link-error" className="error error_type_link"></span>
            </PopupWithForm>

            <PopupWithForm name="change-avatar"
                           title="Обновить аватар"
                           subtitle="Сохранить"
                           isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}>
                <input className="popup__field popup__field_type_change-avatar" id="avatar" type="url" name="avatar"
                       defaultValue="" placeholder="Ссылка на картинку" minLength="4" maxLength="200" />
                <span id="avatar-error" className="error error_type_avatar"></span>
            </PopupWithForm>

            <PopupWithForm name="delete-card" title="Вы уверены?" subtitle="Да" />

            <ImagePopup
                card = {selectedCard}
                onClose={closeAllPopups}/>

        </div>
    );
}

export default App;
