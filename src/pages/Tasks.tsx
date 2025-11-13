import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowLeft, Calendar as CalIcon, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";

const Tasks = () => {
  const tasks = [
    {
      id: "1",
      title: "Install kitchen cabinets",
      description: "Mount and secure all base and wall cabinets",
      status: "completed",
      priority: "high",
      due_date: "2024-02-14",
      assignee: "John Smith",
      completed: true,
    },
    {
      id: "2",
      title: "Electrical rough-in",
      description: "Complete electrical wiring for outlets and lighting",
      status: "in-progress",
      priority: "high",
      due_date: "2024-02-19",
      assignee: "Mike Johnson",
      completed: false,
    },
    {
      id: "3",
      title: "Plumbing connections",
      description: "Connect sink, dishwasher, and water lines",
      status: "in-progress",
      priority: "medium",
      due_date: "2024-02-21",
      assignee: "Sarah Davis",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/contractor/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#10B981'}}>Tasks</h1>
              <p style={{color: '#10B981'}}>Manage project tasks and assignments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button style={{backgroundColor: '#059669', color: 'white'}}>Add Task</Button>
          </div>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-xl font-semibold ${task.completed ? 'line-through' : ''}`} style={{color: '#10B981'}}>
                      {task.title}
                    </h3>
                    <p className="text-sm mt-1" style={{color: '#10B981'}}>{task.description}</p>
                  </div>
                  <Badge variant={task.status === "completed" ? "default" : "secondary"}>
                    {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2" style={{color: '#10B981'}}>
                    <CalIcon className="h-4 w-4" />
                    <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{color: '#10B981'}}>
                    <User className="h-4 w-4" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium" style={{color: task.priority === 'high' ? '#EF4444' : '#F97316'}}>
                    <Clock className="h-4 w-4" />
                    <span>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" style={{borderColor: '#10B981', color: '#10B981'}}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" style={{borderColor: '#10B981', color: '#10B981'}}>
                    {task.assignee}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
