import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Column from "./components/Column/Column";
import MyInput from "./UI/MyInput/MyInput";
import Modal from "./components/Modal/Modal";
import "./App.css";
import LogIn from "./components/LogIn/Login";
import { ReactComponent as Icons1 } from "./img/icons1.svg";
import { ReactComponent as Icons3 } from "./img/icons3.svg";
import { ReactComponent as Icons2 } from "./img/icons2.svg";
import { ReactComponent as Icons4 } from "./img/icons4.svg";
import { ReactComponent as Icons5 } from "./img/icons5.svg";
import { ReactComponent as Icons6 } from "./img/icons6.svg";
import { ReactComponent as Icons7 } from "./img/icons7.svg";
import { ReactComponent as Icons8 } from "./img/icons8.svg";
import { ReactComponent as Icons9 } from "./img/icons9.svg";
import { ReactComponent as Icons10 } from "./img/icons10.svg";
import { ReactComponent as Icons11 } from "./img/icons11.svg";
import { ReactComponent as Icons12 } from "./img/icons12.svg";

const icons = [
  <Icons1 />,
  <Icons2 />,
  <Icons3 />,
  <Icons3 />,
  <Icons4 />,
  <Icons5 />,
  <Icons6 />,
  <Icons7 />,
  <Icons8 />,
  <Icons9 />,
  <Icons10 />,
  <Icons11 />,
  <Icons12 />,
];

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
    columnName: "Открытые",
    icon: icons[0],
  },
  {
    id: uuid(),
    columnName: "В процессе",
    icon: icons[1],
  },
  {
    id: uuid(),
    columnName: "Завершенные",
    icon: icons[2],
  },
];
console.log(Icons12);
function App() {
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
    const saved = localStorage.getItem("userName");
    return saved || "";
  };

  const [userName, setUserName] = useState(getUser());
  const [modalActive, setModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [columns, setColumns] = useState(getData());
  const initTasks = [];
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(getTasks());
  const bgColors = ["rgb(235, 235, 235)", "rgb(240, 240, 240)"];
  const [currentCardId, setCurrentCardId] = useState("");
  const [onSave, setOnSave] = useState(false);

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
        return { ...column, columnName: newColumnName };
      } else return column;
    });
    changeColumn(newColumns);
  }

  function addColumn(value) {
    let obj;
    let iconIndex = (columns.length + 1) % icons.length;
    obj = {
      id: uuid(),
      columnName: value,
      icon: icons[iconIndex],
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

  const onBlur = () => {
    setIsEdit(false);
    if (value) {
      addColumn(value);
      setIsEdit(false);
    }
    setValue("");
  };

  function addComment(commentValue, id) {
    let date = new Date();
    setTasks(
      tasks.map((task) => {
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
      })
    );
    const newTasks = [...tasks];
    changeTask(newTasks);
  }

  function deleteComment(id, taskId) {
    const newTasks = setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          let arr = task.comments;
          // arr.map((item) => console.log(item));
          let arr1 = arr.filter((comment) => comment.id !== id);

          return { ...task, comments: arr1 };
        }
        return task;
      })
    );
    console.log(newTasks);
    changeTask(newTasks);
  }

  const result = columns.map((column, index) => {
    const bgIndex = index % 2;
    const bgColumn = bgColors[bgIndex];
    const colorIndex = index % 5;
    const colorHead = headColors[colorIndex];

    return (
      <Column
        key={column.id}
        id={column.id}
        columnId={column.id}
        colorhead={colorHead}
        icon={column.icon}
        columnName={column.columnName}
        deleteColumn={deleteColumn}
        addTask={addTask}
        bgColumn={bgColumn}
        editColumnName={editColumnName}
        onCLickCard={onCLickCard}
        columnTasks={tasks.filter(({ columnId }) => columnId === column.id)}
      />
    );
  });

  // useEffect(() => {
  //   console.log("tasks", tasks);
  // }, [tasks]);

  return (
    <div className="dataWrapper">
      <LogIn
        userName={userName}
        setUserName={setUserName}
        saveUserName={saveUserName}
        setOnSave={setOnSave}
        onSave={onSave}
      />

      <div className="result">
        {result}
        <div className="column">
          {!isEdit ? (
            <div className="head">
              <p onClick={() => setIsEdit(true)}>Добавить раздел</p>
            </div>
          ) : (
            <div
              className="columnHead"
              style={{ backgroundColor: headColors[columns.length % 5] }}
            >
              <MyInput
                value={value}
                autoFocus
                onFocus={() => setValue("")}
                onChange={(event) => setValue(event.target.value)}
                onBlur={onBlur}
              />
            </div>
          )}

          <div
            className="columnContent"
            style={
              !(columns.length % 2)
                ? { backgroundColor: "rgb(235, 235, 235)" }
                : { backgroundColor: "rgb(240, 240, 240)" }
            }
          >
            <Icons12 />
            Добавить участников
          </div>
        </div>
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
