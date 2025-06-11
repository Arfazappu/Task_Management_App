import React from 'react'
import TaskAccordianItem from './TaskAccordianItem';
import { useTask } from '@/context/TaskContext';

function TaskAccordian() {
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
    <>
    <div className="border-[1.5px] border-[#941B0F] rounded-md overflow-clip">
      {sortedTasks.map((task, index) => (
        <TaskAccordianItem key={task.id} task={task} index={index} />
      ))}
    </div>
    
    {sortedTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">No tasks found</div>
      )}
    </>
    
  );
}

export default TaskAccordian