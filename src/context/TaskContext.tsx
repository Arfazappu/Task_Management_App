'use client'

import { dummyTasks } from "@/data/dummyData";
import { Task, TaskFormData } from "@/types/task";
import { createContext, ReactNode, useContext, useReducer, useState } from "react";

type TaskAction = 
  | { type: 'ADD_TASK'; payload: TaskFormData }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number}

interface TaskState {
  tasks: Task[];
}

// Task reducer
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { 
        ...state, 
        tasks: [...state.tasks, { ...action.payload, id: Date.now() }] 
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
};

// Initial state
const initialState: TaskState = {
  tasks: dummyTasks
};

type SortField = "dueDate";
type SortOrder = "asc" | "desc";
type Filter = { priority?: string; status?: string };

// Context type
interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  showEditModal: boolean
  setShowEditModal: (show: boolean) => void
  showDeleteModal: boolean
  setShowDeleteModal: (show: boolean) => void
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void
  sortField: SortField;
  setSortField: (field: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Context provider props
interface TaskProviderProps {
  children: ReactNode;
}

// Context provider
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [sortField, setSortField] = useState<SortField>("dueDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filter, setFilter] = useState<Filter>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const value: TaskContextType = {
    tasks: state.tasks,
    dispatch,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    selectedTask,
    setSelectedTask,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use context
export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};