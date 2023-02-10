import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Column from "./components/Column/Column";
import MyInput from "./UI/MyInput/MyInput";
import Modal from "./components/Modal/Modal";
import "./App.css";
import LogIn from "./components/LogIn/Login";
import LoginIcon from "./svg/LoginIcon/LoginIcon";

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
    name: "Открытые",
  },
  {
    id: uuid(),
    name: "В процессе",
  },
  {
    id: uuid(),
    name: "Завершенные",
  },
];

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
  const [tasks, setTasks] = useState(getTasks);
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
    setColumns(
      columns.map((column) => {
        if (column.id === id) {
          return { ...column, name: newColumnName };
        } else return column;
      })
    );
  }

  function addColumn(value) {
    let obj;
    obj = {
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
    localStorage.setItem(`tasks`, JSON.stringify([...tasks, obj]));
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
            id: uuid,
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
        name={column.name}
        deleteColumn={deleteColumn}
        addTask={addTask}
        bgColumn={bgColumn}
        onCLickCard={onCLickCard}
        columnTasks={tasks.filter(({ columnId }) => columnId === column.id)}
      />
    );
  });

  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);

  return (
    <div className="dataWrapper">
      <div className="header">
        <LoginIcon />
        {onSave ? (
          <>
            <div className="headerLogin">{userName}</div>
            <button
              onClick={() => {
                setOnSave(false);
                setUserName("");
              }}
            >
              Выйти
            </button>
          </>
        ) : (
          <LogIn
            userName={userName}
            setUserName={setUserName}
            saveUserName={saveUserName}
          />
        )}
      </div>
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
        />
      </div>
    </div>
  );
}
export default App;
