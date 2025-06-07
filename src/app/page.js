"use client";
import { useState } from "react";
import TaskDetails from "./components/taskdetails";

const nameEmailMap = [
  { name: "Khushhal Sharma", email: "khushaal.sharma@travelxp.tv" },
  { name: "Tushar Tomar", email: "tushar.tomar@travelxp.tv" },
  { name: "Arnav Biswas", email: "arnav.biswas@travelxp.tv" },
  { name: "Dhananjay Ninawe", email: "dhananjay.ninawe@travelxp.tv" },
  { name: "Nikhil Rajput", email: "nikhil.rajput@travelxp.tv" },
  { name: "Arti Shinde", email: "arti.shinde@travelxp.tv" },
  { name: "Monali Sawant", email: "monali.sawant@travelxp.tv" },
  { name: "Animesh Rout", email: "animesh.rout@travelxp.tv" },
];

const initialTask = () => ({
  productName: "",
  otherProductName: "",
  taskType: "",
  taskTypeReason: "",
  otherTaskType: "",
  taskName: "",
  taskLink: "",
  usedCommonComponent: "",
  otherCommonComponent: "",
  addedComments: "",
  otherCommentsReason: "",
  responsiveChecked: "",
  otherResponsiveReason: "",
  lighthouseChecked: "",
  lighthouseScore: "",
  lighthouseReason: "",
  solvedCodeAnt: "",
  properBranchCommit: "",
  logicImplemented: "",
  delivered: "",
  otherDeliveredReason: "",
  taskTimeEstimate: "",
  taskTimeTaken: "",
  taskTimeReason: "",
  facedRoadblocks: "",
  otherRoadblockReason: "",
  hasTaskVideo: "",
  taskVideo: null,
  taskVideoReason: "",
});

// Example: Replace with your actual API endpoint
const API_ENDPOINT = "/api/daily-task-update";

export default function DailyTaskUpdateForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
  });
  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [lowTimeReason, setLowTimeReason] = useState("");
  const [showLowTimeReason, setShowLowTimeReason] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Handle main form changes (name, email, date)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for a specific task
  const handleTaskChange = (idx, e) => {
    const { name, value } = e.target;
    setTasks((prev) =>
      prev.map((task, i) =>
        i === idx ? { ...task, [name]: value } : task
      )
    );
  };

  const handleTaskSingleSelect = (idx, e) => {
    const { name, value } = e.target;
    setTasks((prev) =>
      prev.map((task, i) =>
        i === idx ? { ...task, [name]: value } : task
      )
    );
  };

  const handleTaskFileChange = (idx, e) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === idx ? { ...task, taskVideo: e.target.files[0] || null } : task
      )
    );
  };

  // Utility: Validate a single task, return array of missing fields (for Save)
  const getMissingFields = (task) => {
    const requiredFields = [
      "productName",
      "taskType",
      "taskName",
      "usedCommonComponent",
      "addedComments",
      "responsiveChecked",
      "properBranchCommit",
      "delivered",
      "logicImplemented",
      "taskTimeEstimate",
      "taskTimeTaken",
      "solvedCodeAnt",
      "facedRoadblocks",
    ];
    const missing = requiredFields.filter(
      (field) => !task[field] || task[field].toString().trim() === ""
    );
    if (task.productName === "Other" && !task.otherProductName) missing.push("otherProductName");
    if (task.taskType && !task.taskTypeReason) missing.push("taskTypeReason");
    if (
      (task.usedCommonComponent === "Yes" || task.usedCommonComponent === "No") &&
      !task.otherCommonComponent
    ) missing.push("otherCommonComponent");
    if (task.addedComments === "No" && !task.otherCommentsReason) missing.push("otherCommentsReason");
    if (task.responsiveChecked === "No" && !task.otherResponsiveReason) missing.push("otherResponsiveReason");
    if ((task.delivered === "No" || task.delivered === "In-Progress") && !task.otherDeliveredReason) missing.push("otherDeliveredReason");
    if (task.productName === "B2C" && task.lighthouseChecked === "Yes" && task.lighthouseScore !== "" && Number(task.lighthouseScore) < 90 && !task.lighthouseReason) missing.push("lighthouseReason");
    if (task.productName === "B2C" && task.lighthouseChecked === "No" && !task.lighthouseReason) missing.push("lighthouseReason");
    if (Number(task.taskTimeTaken) > Number(task.taskTimeEstimate) && !task.taskTimeReason) missing.push("taskTimeReason");
    if (task.facedRoadblocks === "Yes" && !task.otherRoadblockReason) missing.push("otherRoadblockReason");
    return missing;
  };

  // Save task (close editing) with validation, show missing fields one by one
  const handleSaveTask = (idx) => {
    const currentTask = tasks[idx];
    const requiredFields = [
      "productName",
      "taskType",
      "taskName",
      "usedCommonComponent",
      "addedComments",
      "responsiveChecked",
      "properBranchCommit",
      "delivered",
      "logicImplemented",
      "taskTimeEstimate",
      "taskTimeTaken",
      "solvedCodeAnt",
      "facedRoadblocks",
    ];
    const missing = getMissingFields(currentTask);

    if (missing.length > 0) {
      // Find the field number (1-based index in requiredFields or custom for conditional fields)
      let fieldNum = requiredFields.findIndex(f => f === missing[0]) + 1;
      // For conditional fields, assign a custom field number (or show as "Additional Field")
      if (fieldNum === 0) fieldNum = "Additional Field";

      const fieldLabel = missing[0]
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase());

      alert(
        `Please fill required Field-${fieldNum} (${fieldLabel})`
      );
      return;
    }
    setEditingTaskIndex(null);
  };

  // Add new task: Only allow if no task is currently being edited
  const handleAddTask = () => {
    if (editingTaskIndex !== null) {
      alert(`Please save Task ${editingTaskIndex + 1} before adding a new task.`);
      return;
    }
    setTasks((prev) => [...prev, initialTask()]);
    setEditingTaskIndex(tasks.length); // open the new task for editing
  };

  // Edit task
  const handleEditTask = (idx) => {
    setEditingTaskIndex(idx);
  };

  // Delete task
  const handleDeleteTask = (idx) => {
    setTasks((prev) => prev.filter((_, i) => i !== idx));
    setEditingTaskIndex(null);
  };

  // Name/email sync
  const handleNameEmailChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const found = nameEmailMap.find((item) => item.name === value);
      setForm((prev) => ({
        ...prev,
        name: value,
        email: found ? found.email : "",
      }));
    } else if (name === "email") {
      const found = nameEmailMap.find((item) => item.email === value);
      setForm((prev) => ({
        ...prev,
        email: value,
        name: found ? found.name : "",
      }));
    }
  };

  const requiredStar = <span className="text-red-500">*</span>;

  // Calculate total actual time taken
  const totalTimeTaken = tasks.reduce((sum, t) => {
    const val = parseFloat(t.taskTimeTaken);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // Helper to recursively lowercase all values in an object/array (not keys)
  function toLowercaseValues(obj) {
    if (Array.isArray(obj)) {
      return obj.map(toLowercaseValues);
    } else if (obj && typeof obj === "object" && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        const val = obj[key];
        if (typeof val === "string") {
          acc[key] = val.toLowerCase();
        } else {
          acc[key] = toLowercaseValues(val);
        }
        return acc;
      }, {});
    }
    return obj;
  }

  // Submit handler with API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submit if any task is still being edited
    if (editingTaskIndex !== null) {
      alert("Please save your task details before submitting the form.");
      return;
    }

    if (tasks.length === 0) {
      alert("Please add at least one task.");
      return;
    }
    if (totalTimeTaken < 7 && !showLowTimeReason) {
      setShowLowTimeReason(true);
      setTimeout(() => {
        document.getElementById("low-time-reason")?.focus();
      }, 100);
      return;
    }
    if (totalTimeTaken < 7 && lowTimeReason.trim() === "") {
      alert("Please provide a reason for total task duration being less than 7 hours.");
      return;
    }

    // Build tasks array with nested objects and only include "other" fields if filled
    const tasksPayload = tasks.map((task) => {
      const taskObj = {
        productName: {
          name: task.productName,
        },
        ...(task.productName === "Other" && task.otherProductName
          ? { productName: { name: task.productName, other: task.otherProductName } }
          : {}),
        taskType: {
          type: task.taskType,
          reason: task.taskTypeReason,
        },
        ...(task.otherTaskType
          ? { taskType: { ...taskObj?.taskType, other: task.otherTaskType } }
          : {}),
        taskName: task.taskName,
        taskLink: task.taskLink,
        usedCommonComponent: {
          value: task.usedCommonComponent,
          ...(task.otherCommonComponent
            ? { other: task.otherCommonComponent }
            : {}),
        },
        addedComments: {
          value: task.addedComments,
          ...(task.otherCommentsReason
            ? { reason: task.otherCommentsReason }
            : {}),
        },
        responsiveChecked: {
          value: task.responsiveChecked,
          ...(task.otherResponsiveReason
            ? { reason: task.otherResponsiveReason }
            : {}),
        },
        lighthouse: task.productName === "B2C"
          ? {
            checked: task.lighthouseChecked,
            score: task.lighthouseScore,
            ...(task.lighthouseReason
              ? { reason: task.lighthouseReason }
              : {}),
          }
          : undefined,
        solvedCodeAnt: task.solvedCodeAnt,
        properBranchCommit: task.properBranchCommit,
        logicImplemented: task.logicImplemented,
        delivered: {
          value: task.delivered,
          ...(task.otherDeliveredReason
            ? { reason: task.otherDeliveredReason }
            : {}),
        },
        taskTime: {
          estimate: task.taskTimeEstimate,
          taken: task.taskTimeTaken,
          ...(task.taskTimeReason
            ? { reason: task.taskTimeReason }
            : {}),
        },
        facedRoadblocks: {
          value: task.facedRoadblocks,
          ...(task.otherRoadblockReason
            ? { reason: task.otherRoadblockReason }
            : {}),
        },
        hasTaskVideo: task.hasTaskVideo,
        ...(task.taskVideo
          ? { taskVideo: task.taskVideo }
          : {}),
        ...(task.taskVideoReason
          ? { taskVideoReason: task.taskVideoReason }
          : {}),
      };

      // Remove undefined fields (like lighthouse if not B2C)
      Object.keys(taskObj).forEach(
        (key) => taskObj[key] === undefined && delete taskObj[key]
      );
      return toLowercaseValues(taskObj);
    });

    // Prepare final payload
    let payload = {
      user: {
        name: form.name,
        email: form.email,
        date: form.date,
      },
      tasks: tasksPayload,
      totalTimeTaken,
      ...(totalTimeTaken < 7 && lowTimeReason.trim() !== ""
        ? { lowTimeReason }
        : {}),
    };

    // Lowercase all values in payload (not keys)
    payload = toLowercaseValues(payload);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setShowThankYou(true);
        throw new Error("Failed to submit. Please try again.");
      }

      setShowThankYou(true);

      setForm({ name: "", email: "", date: "" });
      setTasks([]);
      setEditingTaskIndex(null);
      setLowTimeReason("");
      setShowLowTimeReason(false);
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl shadow-2xl mt-12 animate-fade-in font-sans">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6 drop-shadow-lg tracking-tight">
        🧠 Daily Task Reflection
      </h1>
      <p className="text-center text-gray-700 mb-12 text-lg max-w-3xl mx-auto">
        Hi Team! Would you mind taking 4 minutes to complete this form? Your
        work matters — every update helps us stay aligned, move faster, and grow
        stronger as a team. Share what you’ve accomplished, any roadblocks, and
        your progress. Let’s build success one update at a time. 💪🧑🏻‍💻💪
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block font-semibold text-gray-800 mb-2">
              Enter Date {requiredStar}
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            />
          </div>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-800 mb-2">
              What is your name? {requiredStar}
            </label>
            <select
              id="name"
              name="name"
              value={form.name}
              onChange={handleNameEmailChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            >
              <option value="">-- Select your name --</option>
              {nameEmailMap.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-800 mb-2">
              Select your email {requiredStar}
            </label>
            <select
              id="email"
              name="email"
              value={form.email || ""}
              onChange={handleNameEmailChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            >
              <option value="">-- Select your email --</option>
              {nameEmailMap.map((item) => (
                <option key={item.email} value={item.email}>
                  {item.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Task List */}
        {tasks.map((task, idx) => (
          <div key={idx} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-blue-700 text-lg flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1">{`Task ${idx + 1}`}</span>
                {task.taskName && (
                  <span className="italic text-blue-900">{task.taskName}</span>
                )}
              </div>
              <div className="flex gap-2">
                {editingTaskIndex === idx ? (
                  <>
                    <button
                      type="button"
                      className="px-3 py-1 bg-green-100 text-green-700 rounded border border-green-300 hover:bg-green-200 transition shadow"
                      onClick={() => handleSaveTask(idx)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-100 text-red-700 rounded border border-red-300 hover:bg-red-200 transition shadow"
                      onClick={() => handleDeleteTask(idx)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded border border-blue-300 hover:bg-blue-200 transition shadow"
                      onClick={() => handleEditTask(idx)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200 transition shadow"
                      onClick={() =>
                        setPreviewIndex(previewIndex === idx ? null : idx)
                      }
                    >
                      {previewIndex === idx ? "Close Preview" : "Preview"}
                    </button>
                  </>
                )}
              </div>
            </div>
            {editingTaskIndex === idx && (
              <TaskDetails
                form={task}
                setForm={(updater) => {
                  setTasks((prev) =>
                    prev.map((t, i) =>
                      i === idx
                        ? typeof updater === "function"
                          ? updater(t)
                          : updater
                        : t
                    )
                  );
                }}
                handleChange={(e) => handleTaskChange(idx, e)}
                handleSingleSelect={(e) => handleTaskSingleSelect(idx, e)}
                requiredStar={requiredStar}
                fieldNum={1}
                handleFileChange={(e) => handleTaskFileChange(idx, e)}
                taskNumber={idx + 1}
              />
            )}
            {/* Preview Section */}
            {previewIndex === idx && editingTaskIndex !== idx && (
              <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/70 shadow-lg p-6 mt-2">
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                  Task {idx + 1} Preview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Product Name:</span> {task.productName === "Other" ? task.otherProductName : task.productName}
                  </div>
                  <div>
                    <span className="font-semibold">Task Type:</span> {task.taskType}
                  </div>
                  <div>
                    <span className="font-semibold">Task Name:</span> {task.taskName}
                  </div>
                  <div>
                    <span className="font-semibold">Task Link:</span> {task.taskLink}
                  </div>
                  <div>
                    <span className="font-semibold">Used Shared Component:</span> {task.usedCommonComponent}
                  </div>
                  <div>
                    <span className="font-semibold">Added Comments:</span> {task.addedComments}
                  </div>
                  <div>
                    <span className="font-semibold">Responsive Checked:</span> {task.responsiveChecked}
                  </div>
                  <div>
                    <span className="font-semibold">Proper Branch/Commit:</span> {task.properBranchCommit}
                  </div>
                  <div>
                    <span className="font-semibold">Delivered:</span> {task.delivered}
                  </div>
                  <div>
                    <span className="font-semibold">Logic Implemented:</span> {task.logicImplemented}
                  </div>
                  <div>
                    <span className="font-semibold">Task Time Estimate:</span> {task.taskTimeEstimate}
                  </div>
                  <div>
                    <span className="font-semibold">Task Time Taken:</span> {task.taskTimeTaken}
                  </div>
                  <div>
                    <span className="font-semibold">Solved CodeAnt:</span> {task.solvedCodeAnt}
                  </div>
                  <div>
                    <span className="font-semibold">Faced Roadblocks:</span> {task.facedRoadblocks}
                  </div>
                </div>
                {task.taskVideo && (
                  <div className="mt-4">
                    <span className="font-semibold">Task Video:</span> {task.taskVideo.name}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Show reason input if total time taken < 7 and at least 1 saved task */}
        {showLowTimeReason && totalTimeTaken < 7 && (
          <div>
            <label className="block font-semibold text-gray-800 mb-2" htmlFor="low-time-reason">
              Your total task duration is less than 7 hours. Please specify the reason {requiredStar}
            </label>
            <input
              id="low-time-reason"
              type="text"
              value={lowTimeReason}
              onChange={(e) => setLowTimeReason(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              placeholder="Reason for less than 7 hours"
            />
          </div>
        )}

        {/* Add New Task Button */}
        <button
          type="button"
          className="w-full py-3 bg-blue-100 text-blue-700 font-semibold rounded-xl border-2 border-blue-300 hover:bg-blue-200 transition mb-4 shadow"
          onClick={handleAddTask}
        >
          Add New Task
        </button>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-500 transition shadow-lg"
        >
          Submit Your Daily Update 🚀
        </button>
      </form>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative border-4 border-blue-200">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setShowThankYou(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-4xl mb-4 font-extrabold text-blue-600 drop-shadow">🎉 Thank You!</div>
            <div className="text-xl mb-4 font-extrabold text-blue-600 drop-shadow">{form.name ? `${form.name}` : ""}</div>
            <div className="text-lg font-semibold mb-2 text-blue-800">
              Great job on wrapping up your tasks today!
            </div>
            <div className="text-gray-700 mb-4">
              Your consistent effort and focus keep the momentum going. Keep pushing boundaries, one step at a time — you are making a real impact. 🙌 Let’s keep up the great work — together we achieve more!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
