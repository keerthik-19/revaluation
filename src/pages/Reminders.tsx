import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  assignedTo: string;
  category: string;
}

const Reminders: React.FC = () => {
  const { t } = useTranslation();
  
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: 'Submit Building Permits',
      description: 'File permits with city planning department for kitchen renovation',
      dueDate: '2024-04-25',
      priority: 'high',
      completed: false,
      assignedTo: 'David Rodriguez',
      category: 'Legal & Permits'
    },
    {
      id: '2',
      title: 'Order Kitchen Cabinets',
      description: 'Finalize cabinet specifications and place order with manufacturer',
      dueDate: '2024-04-28',
      priority: 'high',
      completed: false,
      assignedTo: 'David Rodriguez',
      category: 'Materials'
    },
    {
      id: '3',
      title: 'Schedule Electrical Inspection',
      description: 'Book electrical inspection for new kitchen outlets and lighting',
      dueDate: '2024-05-02',
      priority: 'medium',
      completed: false,
      assignedTo: 'David Rodriguez',
      category: 'Inspections'
    },
    {
      id: '4',
      title: 'Coordinate Plumbing Work',
      description: 'Schedule plumber for dishwasher and sink installation',
      dueDate: '2024-05-05',
      priority: 'medium',
      completed: true,
      assignedTo: 'David Rodriguez',
      category: 'Coordination'
    },
    {
      id: '5',
      title: 'Final Walkthrough',
      description: 'Schedule final inspection with homeowner and agent',
      dueDate: '2024-05-10',
      priority: 'high',
      completed: false,
      assignedTo: 'David Rodriguez',
      category: 'Completion'
    },
    {
      id: '6',
      title: 'Update Project Photos',
      description: 'Take progress photos and upload to project dashboard',
      dueDate: '2024-04-30',
      priority: 'low',
      completed: false,
      assignedTo: 'David Rodriguez',
      category: 'Documentation'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [notificationSent, setNotificationSent] = useState<string | null>(null);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const sendReminder = (task: TaskItem) => {
    // Simulate sending notification
    console.log(`Reminder sent to ${task.assignedTo} for: ${task.title}`);
    setNotificationSent(task.id);
    
    // Reset notification status after 3 seconds
    setTimeout(() => {
      setNotificationSent(null);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getTasksByFilter = () => {
    switch (filter) {
      case 'pending': return tasks.filter(task => !task.completed);
      case 'completed': return tasks.filter(task => task.completed);
      default: return tasks;
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed).length;
  const overdueTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return !task.completed && dueDate < today;
  }).length;

  return (
    <div className="reminders-page">
      <div className="reminders-container">
        {/* Header */}
        <div className="reminders-header">
          <div className="header-content">
            <h1>{t('REMINDERS')}</h1>
            
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{pendingTasks}</span>
              <span className="stat-label">{t('Pending')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ color: '#ef4444' }}>{overdueTasks}</span>
              <span className="stat-label">{t('reminders.overdue')}</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('reminders.allTasks')} ({tasks.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            {t('reminders.pending')} ({pendingTasks})
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            {t('reminders.completed')} ({tasks.length - pendingTasks})
          </button>
        </div>

        {/* Task List */}
        <div className="tasks-grid">
          {getTasksByFilter().map((task) => {
            const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
            
            return (
              <div 
                key={task.id} 
                className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
              >
                <div className="task-header">
                  <div className="task-checkbox-group">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <div className="task-title-group">
                      <h3 className="task-title">{task.title}</h3>
                      <div className="task-meta">
                        <span className="task-category">{task.category}</span>
                        <span 
                          className="task-priority"
                          style={{ color: getPriorityColor(task.priority) }}
                        >
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="task-actions">
                    {!task.completed && (
                      <button 
                        className={`remind-button ${notificationSent === task.id ? 'sent' : ''}`}
                        onClick={() => sendReminder(task)}
                        disabled={notificationSent === task.id}
                      >
                        {notificationSent === task.id ? (
                          <>
                            <span className="checkmark">✓</span>
                            Sent
                          </>
                        ) : (
                          'Send Reminder'
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <p className="task-description">{task.description}</p>
                
                <div className="task-footer">
                  <div className="task-assignee">
                    <span className="assignee-label">Assigned to:</span>
                    {task.assignedTo}
                  </div>
                  <div className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
                    <span className="date-label">Due:</span>
                    {new Date(task.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    {isOverdue && <span className="overdue-badge">OVERDUE</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {getTasksByFilter().length === 0 && (
          <div className="no-tasks">
            <div className="no-tasks-icon">No Tasks</div>
            <h3>No tasks found</h3>
            <p>
              {filter === 'completed' 
                ? "No completed tasks yet. Check back as work progresses!" 
                : filter === 'pending'
                ? "Great! No pending tasks at the moment."
                : "No tasks have been created for this project yet."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;