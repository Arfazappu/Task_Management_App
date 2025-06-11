import React from "react";
import TaskRow from "./TaskRow";
import { useTask } from "@/context/TaskContext";

const TaskTable = () => {
  const { tasks, sortOrder, filter, searchQuery } = useTask();

  // Apply filtering
  const filteredTasks = tasks.filter(task => {
    const priorityMatch = !filter.priority || task.priority === filter.priority;
    const statusMatch = !filter.status || task.status === filter.status;
    const searchMatch =
      !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return priorityMatch && statusMatch && searchMatch;
  });

  // Apply sorting (by dueDate)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="border-[1.5px] border-[#941B0F] rounded-md overflow-clip">
      <table className="min-w-full text-sm text-left shadow-sm">
        <thead className="bg-[#fff4f1] text-[#941B0F] border-b-[1.5px] border-[#941B0F]">
          <tr>
            <th className="px-4 py-3 font-medium text-xs">SL.No</th>
            <th className="px-4 py-3 font-medium text-xs">Title</th>
            <th className="px-4 py-3 font-medium text-xs">Description</th>
            <th className="px-4 py-3 font-medium text-xs">Due Date</th>
            <th className="px-4 py-3 font-medium text-xs">Status</th>
            <th className="px-4 py-3 font-medium text-xs">Priority</th>
            <th className="px-4 py-3 font-medium text-xs"></th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task, index) => (
            <TaskRow key={task.id} task={task} index={index} />
          ))}
        </tbody>
      </table>
      {sortedTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">No tasks found</div>
      )}
    </div>
  );
};

export default TaskTable;