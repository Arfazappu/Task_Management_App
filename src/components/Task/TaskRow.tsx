import React from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import PriorityTag from '../UI/PriorityTag';
import StatusTag from '../UI/Statustag';
import { Task } from '@/types/task';
import { useTask } from '@/context/TaskContext';

type Props = {
  task: Task;
  index: number;
};

const TaskRow = ({ task, index }: Props) => {
  const { setShowEditModal, setSelectedTask, setShowDeleteModal } = useTask()
  const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-[#fffaf9]';

  const handleEdit = () => {
    setSelectedTask(task)
    setShowEditModal(true)
  }

  const handleDelete = () => {
    setSelectedTask(task)
    setShowDeleteModal(true)
  }

  return (
    <tr className={`${rowBg} text-gray-700 font-medium`}>
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-2">{task.title}</td>
      <td className="px-4 py-2 max-w-sm truncate" title={task.description}>{task.description}</td>
      <td className="px-4 py-2">{task.dueDate}</td>
      <td className="px-4 py-2"><StatusTag status={task.status} /></td>
      <td className="px-4 py-2"><PriorityTag priority={task.priority} /></td>
      <td className="px-4 py-2 space-x-3">
        <button onClick={handleEdit} className='cursor-pointer hover:text-blue-500'><SquarePen size={16}/></button>
        <button onClick={handleDelete} className='cursor-pointer hover:text-red-500'><Trash2 size={16} /></button>
      </td>
    </tr>
  );
};

export default TaskRow;
