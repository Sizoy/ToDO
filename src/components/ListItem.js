import React from "react";
import "./../App.css";
import ControlButton from "./ControlButton";

const ListItem = (props) => {
  // state
  const [editor, setEditor] = React.useState(false); // стейт режиму редагування
  const [text, setText] = React.useState(props.text); // стейт тексту елемента списку
  // action
  function actionToggleEditor() {
    // Функція увімкнення/вимкнення режиму редагування
    setEditor(!editor);
  }
  function actionChange(event) {
    //Функція, що змінює стейт тексту при редагуванні текстового поля
    setText(event.target.value);
  }
  function actionSaveEditing() {
    // Функція вимкнення режиму редагування
    setEditor(false);
  }
  function actionCancelEditing() {
    //Функція вимкнення редагування і повернення тексту в початковий стан
    setEditor(false);
    setText(props.text);
  }
  function actionDelete() {
    //Функція, яка видаляє елемент списку при натисканні на іконку видалення
    props.delAction(props.id); // Викликаэться колбек функції видалення, який прийшов з List.js
  }
  return (
    <React.Fragment>
      {/* Якщо режим форматування ВИМКНЕНО */}
      {!editor && (
        //якщо стан елмента DONE, даємо йому два класи, інакше один
        <div className={props.done ? "item item--done" : "item"}>
          {/* залежно від стан елемента списку, даємо йому відповідну кнопку */}
          {!props.done && <ControlButton type="undone" />}
          {props.done && <ControlButton type="done" />}

          <div className="item__text">{text}</div>

          {/* Для UNDONE елементів даємо кнопку редагування тексту */}
          {!props.done && (
            <ControlButton type="edit" action={actionToggleEditor} />
          )}
          {/* всім елементам даємо кнопку видалення */}
          <ControlButton type="del" action={actionDelete} />
        </div>
      )}

      {/* Якщо режим форматування УВІМКНЕНО */}
      {editor && (
        //якщо стан елмента DONE, даємо йому два класи, інакше один
        <div className={props.done ? "item item--done" : "item"}>
          <input
            type="text"
            className="item__input"
            value={text} //текст перед редагуванням = текст зі стейту
            onChange={actionChange} // При написанні тексту викликаємо функцію, яка змінює стейт
          />
          {/* даємо кнопку зберігання відредагованого тексту */}
          <ControlButton type="do" action={actionSaveEditing} />
          {/* даємо кнопку відміни редагованого тексту */}
          <ControlButton type="del" action={actionCancelEditing} />
        </div>
      )}
    </React.Fragment>
  );
};

export default ListItem;
