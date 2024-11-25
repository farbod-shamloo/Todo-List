import { useState } from "react";
import styles from "../components/ToDoList.module.css";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addHandler = () => {
    if (!inputValue.trim()) {
      setError("Please Add a Task");
      return;
    }

    if (editIndex !== null) {
      // ویرایش تسک
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = inputValue;
      setTasks(updatedTasks);
      setEditIndex(null); // خروج از حالت ویرایش
    } else {
      // اضافه کردن تسک جدید
      setTasks([...tasks, inputValue]);
    }

    setInputValue(""); // خالی کردن ورودی
    setError(""); // حذف ارور
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editHandler = (index) => {
    setEditIndex(index); // تنظیم اندیس تسک در حال ویرایش
    setInputValue(tasks[index]); // انتقال مقدار تسک به ورودی
  };

  return (
    <div className={styles.container}>
      <h2>ToDo List</h2>
      <input
        type="text"
        value={inputValue}
        placeholder="Add a New Task..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.btn} onClick={addHandler}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>
      {error && <p className={styles.error}>{error}</p>}

      {tasks.length === 0 ? (
        <p className={styles.noTasks}>No tasks available. Add a task to get started!</p>
      ) : (
        <ul className={styles.tasks}>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <div>
                <button onClick={() => editHandler(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ToDoList;
