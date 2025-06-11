import { Task } from "@/types/task";

export const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Finish wireframe for homepage",
    dueDate: "2025-06-15",
    description: "Design the main layout and structure for homepage ",
    priority: "high",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Update project documentation",
    dueDate: "2025-06-20",
    description: "Add API details and architecture diagram, Lorem, ipsum dolor sit amet consectetur adipisicing elit. In fugiat placeat deserunt velit vel, magni labore maiores minus minima molestias.",
    priority: "medium",
    status: "pending",
  },
  {
    id: 3,
    title: "Push latest code to GitHub",
    dueDate: "2025-06-12",
    description: "Commit all changes with proper messages",
    priority: "low",
    status: "completed",
  },
];