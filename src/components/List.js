import React, { useState } from "react";
import "./../App.css";
import ListItem from "./ListItem";

const List = (props) => {
  //state
  const [tasks, setTasks] = useState(props.tasks); // В стан приходить список з пропсів з App.js

  //Функція перенесення елемента списку з UNDONE в DONE
  function MoveFromUndoneToDone(key, text) {
    let newList = [];
    tasks.forEach((element) => {
      if (element.id === key) {
        element.done = true;
        element.text = text;
      }
      newList.push(element);
    });
    setTasks(newList);
  }

  //Функція перенесення елемента списку з DONE в UNDONE
  function MoveFromDoneToUndone(key) {
    let newList = [];
    tasks.forEach((element) => {
      if (element.id === key) {
        element.done = false;
      }
      newList.push(element);
    });
    setTasks(newList);
  }

  function actionDeleteTask(key) {
    // Функція кнопки видалення поста
    let newList = [];
    tasks.forEach((element) => {
      if (element.id !== key) {
        newList.push(element);
      }
    });
    setTasks(newList);
    // Загружаємо в стейт новий список без видаленого елемента
  }

  let doneList = []; // Два масиви: для зроблених і не зроблених
  let undoneList = [];
  tasks.forEach((element) => {
    //Проходимось по кожному елементу списку у стейті
    if (element.done) {
      //Якщо зроблений то його в перший масив
      doneList.push(element);
    } else {
      //Якщо незроблений то його в другий масив
      undoneList.push(element);
    }
  });

  return (
    <div className="list">
      {/* Якщо список задач порожній */}
      {tasks.length === 0 && (
        <div className="list__section">Nothing to do...</div>
      )}
      {/* Якщо список задач не порожній */}
      {tasks.length !== 0 && (
        <>
          {/* Якщо список НЕЗРОБЛЕНИХ задач не порожній виводимо компоненти з цього списку */}
          {undoneList.length !== 0 && (
            <div className="list__section">To do:</div>
          )}
          {undoneList.map((element1) => (
            <ListItem
              text={element1.text} //Текст елементу списку, приходить з пропсів
              done={element1.done} //Стан елементу списку, приходить з пропсів
              delAction={actionDeleteTask} //колбек функції видалення елемента списку
              removeToDoneAction={MoveFromUndoneToDone}
              key={element1.id}
              id={element1.id} //id елементу списку, приходить з пропсів
            />
          ))}

          {/* Якщо список ЗРОБЛЕНИХ задач не порожній виводимо компоненти з цього списку */}
          {doneList.length !== 0 && <div className="list__section">Done:</div>}
          {doneList.map((element2) => (
            <ListItem
              text={element2.text}
              done={element2.done}
              delAction={actionDeleteTask}
              removeToUndoneAction={MoveFromDoneToUndone}
              key={element2.id}
              id={element2.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default List;
