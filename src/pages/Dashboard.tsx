import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  CalendarPlus,
  Video,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const stats = [
  {
    title: "Total Meetings",
    value: 142,
    description: "This month",
    icon: Calendar,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Active Participants",
    value: 67,
    description: "Registered users",
    icon: Users,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Hours Tracked",
    value: "324h",
    description: "Meeting time",
    icon: Clock,
    trend: { value: 15, isPositive: true },
  },
  {
    title: "Completion Rate",
    value: "94%",
    description: "Meeting attendance",
    icon: TrendingUp,
    trend: { value: 2, isPositive: true },
  },
];

const recentMeetings = [
  {
    id: "1",
    title: "Project Kickoff",
    agenda: "Initial project planning and team introductions",
    date: "2024-01-15",
    time: "10:00 AM",
    participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    status: "completed",
    platform: "Google Meet",
  },
  {
    id: "2",
    title: "Weekly Standup",
    agenda: "Team progress updates and blockers",
    date: "2024-01-16",
    time: "9:00 AM",
    participants: ["Sarah Wilson", "Tom Brown", "Lisa Davis"],
    status: "scheduled",
    platform: "Zoom",
  },
  {
    id: "3",
    title: "Client Review",
    agenda: "Present project deliverables to client",
    date: "2024-01-17",
    time: "2:00 PM",
    participants: ["Client Team", "Project Manager"],
    status: "in-progress",
    platform: "Microsoft Teams",
  },
];

const upcomingMeetings = [
  {
    id: "4",
    title: "Sprint Planning",
    date: "2024-01-18",
    time: "10:30 AM",
    participants: 8,
  },
  {
    id: "5",
    title: "Design Review",
    date: "2024-01-19",
    time: "3:00 PM",
    participants: 5,
  },
  {
    id: "6",
    title: "Monthly All-Hands",
    date: "2024-01-22",
    time: "11:00 AM",
    participants: 23,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="secondary" className="badge-success">Completed</Badge>;
    case "scheduled":
      return <Badge variant="secondary" className="badge-primary">Scheduled</Badge>;
    case "in-progress":
      return <Badge variant="secondary" className="badge-warning">In Progress</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your meetings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/meetings/create">
              <CalendarPlus className="mr-2 h-4 w-4" />
              New Meeting
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Meetings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Meetings</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/meetings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{meeting.title}</h4>
                    {getStatusBadge(meeting.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{meeting.agenda}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {meeting.date} at {meeting.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      {meeting.platform}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {meeting.participants.length} participants
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  {meeting.status === "completed" && (
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <h4 className="font-medium text-sm">{meeting.title}</h4>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{meeting.date}</span>
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {meeting.participants} participants
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm" asChild>
              <Link to="/schedule">View Schedule</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}