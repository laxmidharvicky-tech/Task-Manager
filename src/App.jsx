import { useState } from "react";
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");

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
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
        <p className="mt-1 text-slate-500">Organize your daily Task</p>
        <div className="mt-6 rounded-xl bg-white p-4 shadow">
          <input
            type="text"
            value={task}
            placeholder="Enter your task"
            onChange={(e) => setTask(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 "
          />
          <div className="m-5 flex justify-between">
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
        <div className="mt-6 space-y-6">
          {tasks.map((iteam) => (
            <div className="rounded-xl bg-white p-4 shadow">
              <p>ID:{iteam.id}</p>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={iteam.completed}
                  className="mt-1 h-5 w-5"
                  onChange={() => toogleTask(iteam.id)}
                />
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {iteam.tittle}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{iteam.addDate}</p>
                  {iteam.completed && (
                    <p className="text-sm text-green-600">
                      Completed: {iteam.completedDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
