import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTask = localStorage.getItem("tasks");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function addTask(e) {
    e.preventDefault();
    if (task.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      tittle: task,
      addDate: date,
      completed: false,
      completedDate: null,
    };
    setTasks([...tasks, newTask]);
    setTask("");
    setDate("");
  }
  function toogleTask(id) {
    setTasks(
      tasks.map((iteam) => {
        if (iteam.id === id) {
          return {
            ...iteam,
            completed: !iteam.completed,
            completedDate: !iteam.completed
              ? new Date().toISOString().split("T")[0]
              : null,
          };
        }
        return iteam;
      }),
    );
  }
  function deleteTask(id) {
    setTasks(tasks.filter((iteam) => iteam.id !== id));
  }
  const filteredTask = tasks.filter((iteam) => {
    if (filter === "active") {
      return !iteam.completed;
    }
    if (filter === "completed") {
      return iteam.completed;
    }
    return true;
  });
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
        <p className="mt-1 text-slate-500">Organize your daily Task</p>
        <p className="mt-1 text-slate-500">Made with ❤️ By Vicky</p>
        <div className="mt-6 rounded-xl bg-white p-4 shadow max-w-md">
          <input
            type="text"
            value={task}
            placeholder="Enter your task"
            onChange={(e) => setTask(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 "
          />
          <div className="m-5 flex flex-col gap-5 sm:flex-row">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-48 rounded-lg border border-slate-300 py-3 outline-none focus:border-teal-500 text-center"
            />
            <button
              className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="flex gap-5 mt-6">
          <button
            onClick={() => setFilter("all")}
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm hover:bg-slate-500 hover:cursor-pointer"
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm  hover:bg-slate-500 hover:cursor-pointer"
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm  hover:bg-slate-500 hover:cursor-pointer"
          >
            Completed
          </button>
        </div>
        <div className="mt-6 space-y-6">
          {filteredTask.map((iteam) => (
            <div key={ iteam.id} className="rounded-xl bg-white p-4 shadow max-w-md">
              <p>ID:{iteam.id}</p>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={iteam.completed}
                  className="mt-1 h-5 w-5"
                  onChange={() => toogleTask(iteam.id)}
                />
                <div>
                  <h2
                    className={`font-semibold ${iteam.completed ? "text-slate-400 line-through " : "text-slate-800"}`}
                  >
                    {iteam.tittle}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{iteam.addDate}</p>
                  {iteam.completed && (
                    <p className="text-sm text-green-600">
                      Completed: {iteam.completedDate}
                    </p>
                  )}
                </div>
                <button onClick={() => deleteTask(iteam.id)}>
                  {" "}
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
