import React, { useState } from "react";
import uuid from "react-uuid";
import Column from "./components/Column/Column";
import MyInput from "./UI/MyInput/MyInput";
import Modal from "./components/Modal/Modal";
import "./App.css";

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
  const [modalActiv, setModalActiv] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [columns, setColumns] = useState(initColumn);
  const initTasks = [];
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(initTasks);
  const bgColors = ["rgb(235, 235, 235)", "rgb(240, 240, 240)"];

  const onCLickCard = (cardId) => {
    //setModalVisible
    //данные карточки = массив всех данных таск].find(({id} = id === cardId))
    //setModalData(все данные карточки)
  };

  function deleteColumn(id) {
    setColumns(columns.filter((column) => column.id !== id));
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
  function addColumn() {
    let obj;
    obj = {
      id: uuid(),
      name: value,
    };
    setColumns([...columns, obj]);
    setValue("");
  }
  function addTask(taskName, columnId) {
    let obj;
    obj = {
      id: uuid(),
      columnId,
      taskName,
    };
    setTasks([...tasks, obj]);
  }
  const onBlur = () => {
    setIsEdit(false);
    if (value) {
      addColumn(value);
      setIsEdit(false);
    }
    setValue("");
  };
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
        tasks={tasks.filter(({ columnId }) => columnId === column.id)}
      />
    );
  });

  return (
    <div className="result">
      {result}
      <div className="column">
        {!isEdit ? (
          <div className="head">
            <p onClick={() => setIsEdit(true)}>Добавить раздел</p>
          </div>
        ) : (
          <div className="columnHead">
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
      <Modal activ={modalActiv} setActiv={setModalActiv} />
    </div>
  );
}
export default App;
