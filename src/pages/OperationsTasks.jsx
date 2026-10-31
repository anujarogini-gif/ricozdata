import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Review data quality alerts", assignee: "Data Team", priority: "High", status: "To Do", dueDate: "" },
  { id: 2, title: "Prepare weekly operations report", assignee: "Operations", priority: "Medium", status: "In Progress", dueDate: "" },
];

export default function OperationsTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: title.trim(),
        assignee: assignee.trim() || "Unassigned",
        priority,
        status: "To Do",
        dueDate,
      },
    ]);

    setTitle("");
    setAssignee("");
    setPriority("Medium");
    setDueDate("");
  }

  function updateStatus(id, status) {
    setTasks(tasks.map((task) => task.id === id ? { ...task, status } : task));
  }

  const completed = tasks.filter((task) => task.status === "Completed").length;

  return (
    <main style={{ padding: 32, color: "#172033", fontFamily: "Arial, sans-serif", background: "#f5f7fb", minHeight: "100vh" }}>
      <header style={{ marginBottom: 24 }}>
        <p style={{ color: "#64748b", margin: "0 0 8px" }}>WORKSPACE / OPERATIONS</p>
        <h1 style={{ margin: 0, fontSize: 30 }}>Operations Tasks</h1>
        <p style={{ color: "#64748b" }}>Create tasks, assign owners, and track progress.</p>
      </header>

      <section style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        {[
          ["Total tasks", tasks.length],
          ["In progress", tasks.filter((task) => task.status === "In Progress").length],
          ["Completed", completed],
        ].map(([label, value]) => (
          <div key={label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, minWidth: 150 }}>
            <div style={{ color: "#64748b", fontSize: 14 }}>{label}</div>
            <strong style={{ fontSize: 28 }}>{value}</strong>
          </div>
        ))}
      </section>

      <form onSubmit={addTask} style={{ background: "white", padding: 20, border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 24 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Create a task</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task name" required style={inputStyle} />
          <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Assignee" style={inputStyle} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} />
          <button type="submit" style={{ background: "#3157d5", color: "white", border: 0, borderRadius: 8, padding: "12px 18px", cursor: "pointer" }}>Add task</button>
        </div>
      </form>

      <section style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: 20, borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Task list</h2>
        </div>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", padding: 20, borderBottom: "1px solid #eef2f7" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <strong>{task.title}</strong>
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>
                {task.assignee} · {task.priority} priority{task.dueDate ? ` · Due ${task.dueDate}` : ""}
              </div>
            </div>
            <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value)} style={inputStyle}>
              <option>To Do</option><option>In Progress</option><option>Completed</option>
            </select>
          </div>
        ))}
      </section>
    </main>
  );
}

const inputStyle = {
  padding: "11px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  background: "white",
  fontSize: 14,
};