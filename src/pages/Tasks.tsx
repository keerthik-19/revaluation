import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowLeft, Calendar as CalIcon, User, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";
import { useState } from "react";

const Tasks = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const tasks = [
    {
      id: "1",
      title: "Install kitchen cabinets",
      description: "Mount and secure all base and wall cabinets",
      status: "completed",
      priority: "high",
      due_date: "2024-11-14",
      assignee: "John Smith",
      completed: true,
    },
    {
      id: "2",
      title: "Electrical rough-in",
      description: "Complete electrical wiring for outlets and lighting",
      status: "in-progress",
      priority: "high",
      due_date: "2024-11-15",
      assignee: "Mike Johnson",
      completed: false,
    },
    {
      id: "3",
      title: "Plumbing connections",
      description: "Connect sink, dishwasher, and water lines",
      status: "in-progress",
      priority: "medium",
      due_date: "2024-11-18",
      assignee: "Sarah Davis",
      completed: false,
    },
    {
      id: "4",
      title: "Countertop installation",
      description: "Install granite countertops",
      status: "pending",
      priority: "high",
      due_date: "2024-11-20",
      assignee: "Tom Williams",
      completed: false,
    },
    {
      id: "5",
      title: "Backsplash tiling",
      description: "Install tile backsplash",
      status: "pending",
      priority: "medium",
      due_date: "2024-11-22",
      assignee: "Sarah Davis",
      completed: false,
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.due_date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/contractor/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#10B981' }}>Tasks Calendar</h1>
              <p style={{ color: '#10B981' }}>View and manage project tasks by date</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button style={{ backgroundColor: '#059669', color: 'white' }} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Calendar Header */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
                style={{ borderColor: '#10B981', color: '#10B981' }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-2xl font-bold" style={{ color: '#10B981' }}>{monthName}</h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
                style={{ borderColor: '#10B981', color: '#10B981' }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
              style={{ borderColor: '#3B82F6', color: '#3B82F6' }}
            >
              Today
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div key={day} className="text-center font-semibold py-2" style={{ color: '#10B981' }}>
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square p-2" />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = new Date(year, month, day);
              const dayTasks = getTasksForDate(date);
              const isToday = new Date().toDateString() === date.toDateString();

              return (
                <div
                  key={day}
                  className={`aspect-square p-2 border rounded-lg ${isToday ? 'bg-primary/10 border-primary' : 'border-border'
                    } hover:bg-muted/50 transition-colors`}
                >
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <span
                        className={`text-sm font-medium ${isToday ? 'text-primary font-bold' : ''
                          }`}
                        style={{ color: isToday ? '#059669' : '#10B981' }}
                      >
                        {day}
                      </span>
                      {dayTasks.length > 0 && (
                        <span className="text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {dayTasks.length}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 space-y-1 overflow-y-auto">
                      {dayTasks.slice(0, 3).map(task => (
                        <div
                          key={task.id}
                          className={`text-xs p-1 rounded truncate ${task.priority === 'high'
                              ? 'bg-red-100 text-black'
                              : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          title={task.title}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs" style={{ color: '#10B981' }}>
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Tasks List */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#10B981' }}>Upcoming Tasks</h3>
          <div className="space-y-3">
            {tasks
              .filter(task => !task.completed)
              .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
              .map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold" style={{ color: '#10B981' }}>{task.title}</h4>
                      <Badge
                        variant={task.status === "completed" ? "default" : "secondary"}
                        className={`${task.priority === 'high'
                            ? 'bg-red-100 text-black'
                            : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </Badge>
                    </div>
                    <p className="text-sm" style={{ color: '#10B981' }}>{task.description}</p>
                    <div className="flex gap-4 mt-2 text-sm" style={{ color: '#10B981' }}>
                      <span className="flex items-center gap-1">
                        <CalIcon className="h-3 w-3" />
                        {new Date(task.due_date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" style={{ borderColor: '#10B981', color: '#10B981' }}>
                      Edit
                    </Button>
                    <Button size="sm" style={{ backgroundColor: '#059669', color: 'white' }}>
                      Complete
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Tasks;
