import React from "react";
import "./../App.css";
import ListItem from "./ListItem";

const List = (props) => {
  //state
  const [tasks, setTasks] = React.useState(props.tasks); // В стан приходить список з пропсів з App.js

  let doneList = []; // Два масиви: для зроблених і не зроблених
  let undoneList = [];
  tasks.forEach((element, index) => {
    //Проходимось по кожному елементу списку у стейті
    element.key = index;
    if (element.done) {
      //Якщо зроблений то його в перший масив
      doneList.push(element);
    } else {
      //Якщо незроблений то його в другий масив
      undoneList.push(element);
    }
  });

  function actionDeleteTask(key) {
    // Функція кнопки видалення поста
    let newList = [];
    tasks.forEach((element) => {
      // Проходимось по кожному елементу списку, що зберігається у стейті
      if (element.key !== key) {
        newList.push(element); // Якщо ключ поточного елемента не дорівнює ключу елемента який ми хочемо видалити,
        // То він проходить далі
      }
    });
    setTasks(newList); // Загружаємо в стейт новий список без видаленого елемента
  }

  return (
    <div className="list">
      {/* Якщо список задач порожній */}
      {tasks.length === 0 && (
        <div className="list__section">Nothing to do...</div>
      )}
      {/* Якщо список задач не порожній */}
      {tasks.length !== 0 && (
        <React.Fragment>
          {/* Якщо список НЕЗРОБЛЕНИХ задач не порожній виводимо компоненти з цього списку */}
          {undoneList.length !== 0 && (
            <div className="list__section">To do:</div>
          )}
          {undoneList.map((element) => (
            <ListItem
              text={element.text} //Текст елементу списку, приходить з пропсів
              done={element.done} //Стан елементу списку, приходить з пропсів
              key={element.key} //Ключ елементу списку (формується на етапі розділення списків на зроблені/незроблені)
              delAction={actionDeleteTask} //колбек функції видалення елемента списку
              id={element.key} //Ключ елементу списку (формується на етапі розділення списків на зроблені/незроблені)
            />
          ))}

          {/* Якщо список ЗРОБЛЕНИХ задач не порожній виводимо компоненти з цього списку */}
          {doneList.length !== 0 && <div className="list__section">Done:</div>}
          {doneList.map((element) => (
            <ListItem
              text={element.text}
              done={element.done}
              key={element.key}
              delAction={actionDeleteTask}
              id={element.key}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default List;
