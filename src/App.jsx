import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";
import "./App.css";
import LogIn from "./components/LogIn/Login";
import Column from "./components/Column/Column.jsx";

const headColors = [
  "rgb(46, 215, 216)",
  "rgb(0, 170, 255)",
  "rgb(161, 121, 242)",
  "rgb(247, 87, 140)",
  "rgb(208, 31, 46)",
];
const initColumn = [
  {
    id: uuid(),
    columnIcon: 0,
    name: "Новые",
  },
  {
    id: uuid(),
    columnIcon: 1,
    name: "В процессе",
  },
  {
    id: uuid(),
    columnIcon: 2,
    name: "Завершенные",
  },
];

function App() {
  const icons = useSelector((state) => state.icons.icons);
  const getTasks = () => {
    const newTask = localStorage.getItem(`tasks`);
    if (newTask === null) {
      localStorage.setItem(`tasks`, JSON.stringify(initTasks));
      return initTasks;
    }
    return JSON.parse(newTask);
  };

  const getData = () => {
    const newData = localStorage.getItem(`data`);
    if (newData === null) {
      localStorage.setItem(`data`, JSON.stringify(initColumn));
      return initColumn;
    }
    return JSON.parse(newData);
  };
  const getUser = () => {
    const newUser = localStorage.getItem("userName");
    if (newUser === null) {
      localStorage.setItem(`userName`, null);
      return null;
    }
    return newUser;
  };

  const [userName, setUserName] = useState(getUser());
  const [modalActive, setModalActive] = useState(false);

  const [columns, setColumns] = useState(getData());
  const initTasks = [];
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(getTasks);
  const bgColors = ["rgb(235, 235, 235)", "rgb(240, 240, 240)"];
  const [currentCardId, setCurrentCardId] = useState("");
  const [onSave, setOnSave] = useState(false);

  function changeColumnIcon(columnId, index) {
    const newColumns = columns.map((column) => {
      if (column.id == columnId) {
        return { ...column, columnIcon: index };
      } else return column;
    });
    changeColumn(newColumns);
  }

  function saveUserName(userName) {
    localStorage.setItem("userName", userName);
    setOnSave(true);
  }

  function changeTask(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(`tasks`, JSON.stringify(newTasks));
  }

  function changeColumn(newColumns) {
    setColumns(newColumns);
    localStorage.setItem(`data`, JSON.stringify(newColumns));
  }

  function setTaskComlete() {
    let date = new Date();
    const newTasks = tasks.map((task) => {
      if (currentCardId === task.id) {
        return {
          ...task,
          isComplete: true,
          completeDate:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate(),
        };
      } else {
        return task;
      }
    });
    changeTask(newTasks);
  }

  function onCLickCard(cardId) {
    setModalActive(true);
    setCurrentCardId(cardId);
  }

  function deleteColumn(id) {
    const newColumns = columns.filter((column) => column.id !== id);
    changeColumn(newColumns);
  }

  function editColumnName(id, newColumnName) {
    const newColumns = columns.map((column) => {
      if (column.id === id) {
        return { ...column, name: newColumnName };
      } else return column;
    });
    changeColumn(newColumns);
  }

  function addColumn(value) {
    let obj;
    const iconIndex = columns.length % icons.length;

    obj = {
      columnIcon: iconIndex,
      id: uuid(),
      name: value,
    };
    const newColumns = [...columns, obj];
    changeColumn(newColumns);
    setValue("");
  }

  function addTask(taskName, columnId, completeDate) {
    let obj;
    let date = new Date();
    obj = {
      id: uuid(),
      columnId,
      taskName,
      comments: [],
      creator: userName,
      createDate:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      completeDate,
      isComplete: false,
    };
    const newTasks = [...tasks, obj];

    changeTask(newTasks);
  }

  function addComment(commentValue, id) {
    let date = new Date();
    const newTasks = tasks.map((task) => {
      if (id === task.id) {
        let arr = task.comments;
        arr.push({
          id: uuid(),
          content: commentValue,
          creator: userName,
          createDate:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate(),
        });
        return { ...task, comments: arr };
      }
      return task;
    });

    changeTask(newTasks);
  }

  function deleteComment(id, taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        let arr = task.comments;
        let arr1 = arr.filter((comment) => comment.id !== id);
        return { ...task, comments: arr1 };
      }

      return task;
    });

    changeTask(newTasks);
  }

  return (
    <div className="dataWrapper">
      <LogIn
        userName={userName}
        setUserName={setUserName}
        saveUserName={saveUserName}
        onSave={onSave}
        setOnSave={setOnSave}
      />

      <div className="resultWrapper">
        <Column
          arr={columns}
          headColors={headColors}
          bgColors={bgColors}
          tasks={tasks}
          // icons={icons}
          deleteColumn={deleteColumn}
          addTask={addTask}
          addColumn={addColumn}
          value={value}
          setValue={setValue}
          onCLickCard={onCLickCard}
          changeColumnIcon={changeColumnIcon}
          editColumnName={editColumnName}
          userName={userName}
        />

        <Modal
          cardId={currentCardId}
          setTaskComlete={setTaskComlete}
          active={modalActive}
          setActive={setModalActive}
          task={tasks.find(({ id }) => id === currentCardId)}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  );
}
export default App;
