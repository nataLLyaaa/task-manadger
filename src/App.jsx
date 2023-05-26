import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Column from "./components/Column/Column";
import MyInput from "./UI/MyInput/MyInput";
import Modal from "./components/Modal/Modal";
import "./App.css";
import LogIn from "./components/LogIn/Login";
import Icon1 from "./svg/FreeIcons/Icon1/Icon1.tsx";
import Icon2 from "./svg/FreeIcons/Icon2/Icon2.tsx";
import Icon3 from "./svg/FreeIcons/Icon3/Icon3.tsx";
import Icon4 from "./svg/FreeIcons/Icon4/Icon4.tsx";
import Icon5 from "./svg/FreeIcons/Icon5/Icon5.tsx";
import Icon6 from "./svg/FreeIcons/Icon6/Icon6.tsx";
import Icon7 from "./svg/FreeIcons/Icon7/Icon7.tsx";
import Icon8 from "./svg/FreeIcons/Icon8/Icon8.tsx";
import Icon9 from "./svg/FreeIcons/Icon9/Icon9.tsx";

const icons = [
  <Icon1 />,
  <Icon2 />,
  <Icon8 />,
  <Icon5 />,
  <Icon3 />,
  <Icon4 />,
  <Icon6 />,
  <Icon7 />,
  <Icon9 />,
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
    console.log(onSave);
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

  const result = columns.map((column, index) => {
    const bgIndex = index % 2;
    const bgColumn = bgColors[bgIndex];
    const colorIndex = index % 5;
    const colorHead = headColors[colorIndex];

    return (
      <Column
        key={column.id}
        column={column}
        colorhead={colorHead}
        icons={icons}
        deleteColumn={deleteColumn}
        addTask={addTask}
        bgColumn={bgColumn}
        onCLickCard={onCLickCard}
        columnTasks={tasks.filter(({ columnId }) => columnId === column.id)}
        editColumnName={editColumnName}
        changeColumnIcon={changeColumnIcon}
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
        onSave={onSave}
        setOnSave={setOnSave}
      />
      <div className="resultWrapper">
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
            n{" "}
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
