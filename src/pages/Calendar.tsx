import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
  client?: string;
  type: 'meeting' | 'inspection' | 'deadline' | 'task';
}

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  // Mock events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Site Inspection - Smith Kitchen',
      date: new Date(2025, 10, 15),
      time: '10:00 AM',
      location: '123 Main St, Boston, MA',
      client: 'John Smith',
      type: 'inspection'
    },
    {
      id: '2',
      title: 'Client Meeting - Wilson Bathroom',
      date: new Date(2025, 10, 18),
      time: '2:00 PM',
      location: '456 Oak Ave, Cambridge, MA',
      client: 'Sarah Wilson',
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Permit Deadline - Davis Addition',
      date: new Date(2025, 10, 20),
      time: '5:00 PM',
      client: 'Mike Davis',
      type: 'deadline'
    },

  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-border bg-muted/20" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`p-2 border border-border min-h-24 cursor-pointer transition-all hover:bg-accent ${isToday ? 'bg-primary/10 border-primary' : ''
            } ${isSelected ? 'ring-2 ring-primary' : ''
            }`}
        >
          <div className={`text-sm font-semibold mb-1`} style={{ color: isToday ? '#10B981' : 'black' }}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className="text-xs px-2 py-1 rounded truncate"
                style={{
                  backgroundColor: event.type === 'meeting' ? '#8B5CF6' :
                    event.type === 'inspection' ? '#3B82F6' :
                      event.type === 'deadline' ? '#EF4444' : '#10B981',
                  color: event.type === 'deadline' ? 'black' : 'white'
                }}
              >
                {event.time} - {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-green-600 font-medium">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/contractor/dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold" style={{ color: 'black' }}>Calendar</h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Button
                onClick={() => setShowNewEventModal(true)}
                style={{ backgroundColor: '#10B981', color: 'white' }}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-t-4 border-green-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'black' }}>
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={previousMonth} style={{ borderColor: '#10B981', color: '#10B981' }}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth} style={{ borderColor: '#10B981', color: '#10B981' }}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold p-2" style={{ color: 'black' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-0 border border-border">
                {renderCalendar()}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8B5CF6' }} />
                  <span className="text-sm" style={{ color: '#8B5CF6' }}>Meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3B82F6' }} />
                  <span className="text-sm" style={{ color: '#3B82F6' }}>Inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444' }} />
                  <span className="text-sm" style={{ color: '#EF4444' }}>Deadline</span>
                </div>

              </div>
            </Card>
          </div>

          {/* Sidebar - Events */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: 'black' }}>
                {selectedDate ? selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric' }) : 'All Events'}
              </h3>
              <div className="space-y-4">
                {(selectedDate ? selectedDateEvents : events).length > 0 ? (
                  (selectedDate ? selectedDateEvents : events).map(event => (
                    <div key={event.id} className="border-l-4 pl-4 py-2" style={{
                      borderColor:
                        event.type === 'meeting' ? '#8B5CF6' :
                          event.type === 'inspection' ? '#3B82F6' :
                            event.type === 'deadline' ? '#EF4444' : '#F59E0B'
                    }}>
                      <h4 className="font-semibold mb-1" style={{ color: 'black' }}>{event.title}</h4>
                      <div className="flex items-center gap-2 text-sm mb-1" style={{ color: 'black' }}>
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm mb-1" style={{ color: 'black' }}>
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                      {event.client && (
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'black' }}>
                          <Users className="h-3 w-3" />
                          {event.client}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm" style={{ color: 'black' }}>No events scheduled</p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#10B981' }}>Quick Add</h3>
              <Button
                onClick={() => setShowNewEventModal(true)}
                className="w-full"
                style={{ backgroundColor: '#059669', color: 'white' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Event
              </Button>
            </Card>
          </div>
        </div>
      </main>

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewEventModal(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#10B981' }}>New Event</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowNewEventModal(false)}>×</Button>
              </div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#10B981' }}>Event Title</label>
                  <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g., Site Inspection" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#10B981' }}>Date</label>
                    <input type="date" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#10B981' }}>Time</label>
                    <input type="time" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#10B981' }}>Event Type</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="meeting">Meeting</option>
                    <option value="inspection">Inspection</option>
                    <option value="deadline">Deadline</option>

                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#10B981' }}>Client</label>
                  <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Client name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#10B981' }}>Location</label>
                  <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Event location" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowNewEventModal(false)} style={{ borderColor: '#10B981', color: '#10B981' }} className="flex-1">Cancel</Button>
                  <Button type="submit" style={{ backgroundColor: '#059669', color: 'white' }} className="flex-1">Create Event</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Calendar;
