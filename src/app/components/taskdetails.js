import React from "react";

export default function TaskDetails({
    form,
    setForm,
    handleChange,
    handleSingleSelect,
    requiredStar,
    fieldNum,
    handleFileChange,
    taskNumber,
}) {
    return (
        <div className="rounded-2xl border-2 border-blue-200 bg-white/70 shadow-lg p-6 mb-8 transition-all duration-200">
            {/* Task Number Header */}
            <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 font-bold rounded-full px-4 py-1 text-lg">
                    Task {taskNumber}
                </span>
                {form.taskName && (
                    <span className="ml-3 text-blue-700 font-semibold">{form.taskName}</span>
                )}
            </div>

            {/* Product Name and Task Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <label
                        htmlFor="productName"
                        className="block font-semibold text-gray-800 mb-2"
                    >
                        {fieldNum++}. Product name {requiredStar}
                    </label>
                    <select
                        id="productName"
                        name="productName"
                        value={form.productName}
                        onChange={(e) => {
                            const value = e.target.value;
                            setForm((prev) => ({
                                ...prev,
                                productName: value,
                                otherProductName: "",
                                lighthouseChecked: value === "B2C" ? prev.lighthouseChecked : "",
                                lighthouseScore: value === "B2C" ? prev.lighthouseScore : "",
                                lighthouseReason: value === "B2C" ? prev.lighthouseReason : "",
                            }));
                        }}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                        <option value="">-- Select Product --</option>
                        <option value="B2C">B2C</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                        <option value="Android TV">Android TV</option>
                        <option value="HTML5 TV">HTML5 TV</option>
                        <option value="Roku TV">Roku TV</option>
                        <option value="Apple TV">Apple TV</option>
                        <option value="Other">Other</option>
                    </select>
                    {form.productName === "Other" && (
                        <input
                            type="text"
                            name="otherProductName"
                            value={form.otherProductName || ""}
                            onChange={handleChange}
                            placeholder="Please specify the product name"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    )}
                </div>
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Task type {requiredStar}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {["Bug", "Modification"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="taskType"
                                    value={opt}
                                    checked={form.taskType === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-400"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {form.taskType && (
                        <input
                            type="text"
                            name="taskTypeReason"
                            value={form.taskTypeReason || ""}
                            onChange={handleChange}
                            placeholder="Please specify the reason for selected task type"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    )}
                </div>
            </div>

            {/* Task Name and Task Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <label
                        htmlFor="taskName"
                        className="block font-semibold text-gray-800 mb-2"
                    >
                        {fieldNum++}. Task name {requiredStar}
                    </label>
                    <input
                        id="taskName"
                        name="taskName"
                        type="text"
                        value={form.taskName}
                        onChange={handleChange}
                        required
                        placeholder="Brief name/title of your task"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>
                <div>
                    <label
                        htmlFor="taskLink"
                        className="block font-semibold text-gray-800 mb-2"
                    >
                        {fieldNum++}. Task link (optional)
                    </label>
                    <input
                        id="taskLink"
                        name="taskLink"
                        type="url"
                        value={form.taskLink}
                        onChange={handleChange}
                        placeholder="URL to task or code"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>
            </div>

            {/* Used shared components & Added comments/docstrings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Used shared components for this change? {requiredStar}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {["Yes", "No"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="usedCommonComponent"
                                    value={opt}
                                    checked={form.usedCommonComponent === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-400"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {(form.usedCommonComponent === "Yes" ||
                        form.usedCommonComponent === "No") && (
                            <input
                                type="text"
                                name="otherCommonComponent"
                                value={form.otherCommonComponent}
                                onChange={handleChange}
                                placeholder="Please specify which common component or function"
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                        )}
                </div>
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Added comments or docstrings where needed? {requiredStar}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {["Yes", "No"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="addedComments"
                                    value={opt}
                                    checked={form.addedComments === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-400"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {form.addedComments === "No" && (
                        <input
                            type="text"
                            name="otherCommentsReason"
                            value={form.otherCommentsReason}
                            onChange={handleChange}
                            placeholder="If no, why?"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    )}
                </div>
            </div>

            {/* Responsive & Proper branch/commits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Responsive on all devices, QA verified? {requiredStar}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {["Yes", "No"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="responsiveChecked"
                                    value={opt}
                                    checked={form.responsiveChecked === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-400"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {form.responsiveChecked === "No" && (
                        <input
                            type="text"
                            name="otherResponsiveReason"
                            value={form.otherResponsiveReason}
                            onChange={handleChange}
                            placeholder="If no, why?"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    )}
                </div>
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Used proper branch, file names, commits? {requiredStar}
                    </p>
                    <div className="flex gap-8">
                        {["Yes", "No"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="properBranchCommit"
                                    value={opt}
                                    checked={form.properBranchCommit === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Delivered & Lighthouse */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Is the task delivered? {requiredStar}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {["Yes", "No", "In-Progress"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="delivered"
                                    value={opt}
                                    checked={form.delivered === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {(form.delivered === "No" || form.delivered === "In-Progress") && (
                        <input
                            type="text"
                            name="otherDeliveredReason"
                            value={form.otherDeliveredReason}
                            onChange={handleChange}
                            placeholder="Specify delivery status/reason"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    )}
                </div>
                {form.productName === "B2C" && (
                    <div>
                        <p className="font-semibold text-gray-800 mb-2">
                            {fieldNum++}. Checked lighthouse score above 90? {requiredStar}
                        </p>
                        <div className="flex flex-wrap gap-6">
                            {["Yes", "No"].map((opt) => (
                                <label
                                    key={opt}
                                    className="inline-flex items-center space-x-2 cursor-pointer select-none"
                                >
                                    <input
                                        type="radio"
                                        name="lighthouseChecked"
                                        value={opt}
                                        checked={form.lighthouseChecked === opt}
                                        onChange={handleSingleSelect}
                                        className="form-radio h-5 w-5 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                    <span className="text-gray-700">{opt}</span>
                                </label>
                            ))}
                        </div>
                        {form.lighthouseChecked === "Yes" && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    name="lighthouseScore"
                                    value={form.lighthouseScore}
                                    onChange={handleChange}
                                    placeholder="Enter score"
                                    className="mt-2 w-32 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                    required
                                    inputMode="numeric"
                                    onWheel={(e) => e.target.blur()}
                                    onKeyDown={(e) => {
                                        if (["ArrowUp", "ArrowDown"].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {form.lighthouseScore !== "" &&
                                    Number(form.lighthouseScore) < 90 && (
                                        <input
                                            type="text"
                                            name="lighthouseReason"
                                            value={form.lighthouseReason}
                                            onChange={handleChange}
                                            placeholder="Please specify why the score is below 90"
                                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                            required
                                        />
                                    )}
                            </div>
                        )}
                        {form.lighthouseChecked === "No" && (
                            <input
                                type="text"
                                name="lighthouseReason"
                                value={form.lighthouseReason}
                                onChange={handleChange}
                                placeholder="If no, why?"
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Logic implemented */}
            <div className="mb-6">
                <label
                    htmlFor="logicImplemented"
                    className="block font-semibold text-gray-800 mb-2"
                >
                    {fieldNum++}. What logic was used for the fix/change? {requiredStar}
                </label>
                <textarea
                    id="logicImplemented"
                    name="logicImplemented"
                    value={form.logicImplemented}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your logic..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                />
            </div>

            {/* Task time details */}
            <div className="mb-6">
                <label className="block font-semibold text-gray-800 mb-2">
                    {fieldNum++}. Task time details {requiredStar}
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label
                            htmlFor="taskTimeEstimate"
                            className="block text-gray-700 mb-1"
                        >
                            Estimated hours <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="taskTimeEstimate"
                            name="taskTimeEstimate"
                            type="text"
                            inputMode="decimal"
                            pattern="^\d*\.?\d*$"
                            value={form.taskTimeEstimate}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*\.?\d*$/.test(val) && val <= 7 && val >= 0) {
                                    setForm((prev) => ({ ...prev, taskTimeEstimate: val }));
                                }
                            }}
                            required
                            placeholder="Estimate (max 7)"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex-1">
                        <label
                            htmlFor="taskTimeTaken"
                            className="block text-gray-700 mb-1"
                        >
                            Actual hours taken <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="taskTimeTaken"
                            name="taskTimeTaken"
                            type="text"
                            inputMode="decimal"
                            pattern="^\d*\.?\d*$"
                            value={form.taskTimeTaken}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*\.?\d*$/.test(val) && val > 0) {
                                    setForm((prev) => ({ ...prev, taskTimeTaken: val }));
                                }
                            }}
                            required
                            placeholder="Time taken (> 0)"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            autoComplete="off"
                        />
                    </div>
                </div>
                {Number(form.taskTimeTaken) > Number(form.taskTimeEstimate) && (
                    <input
                        type="text"
                        name="taskTimeReason"
                        value={form.taskTimeReason}
                        onChange={handleChange}
                        placeholder="Please explain why time taken exceeded estimate"
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        required
                    />
                )}
            </div>

            {/* CodeAnt issues & Roadblocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Fixed CodeAnt issues? {requiredStar}
                    </p>
                    <div className="flex gap-8">
                        {["Yes", "No"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="solvedCodeAnt"
                                    value={opt}
                                    checked={form.solvedCodeAnt === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-gray-800 mb-2">
                        {fieldNum++}. Any roadblocks encountered? {requiredStar}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {["Yes", "No"].map((opt) => (
                            <label
                                key={opt}
                                className="inline-flex items-center space-x-2 cursor-pointer select-none"
                            >
                                <input
                                    type="radio"
                                    name="facedRoadblocks"
                                    value={opt}
                                    checked={form.facedRoadblocks === opt}
                                    onChange={handleSingleSelect}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {form.facedRoadblocks === "Yes" && (
                        <input
                            type="text"
                            name="otherRoadblockReason"
                            value={form.otherRoadblockReason}
                            onChange={handleChange}
                            placeholder="Please specify the roadblock"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    )}
                </div>
            </div>
        </div>
    );
}