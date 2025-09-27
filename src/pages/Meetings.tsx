import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Video,
  Users,
  CalendarPlus,
  Copy,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const meetings = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    agenda: "Initial project planning and team introductions",
    platform: "Google Meet",
    meetLink: "https://meet.google.com/abc-def-ghi",
    date: "2024-01-15",
    startTime: "10:00",
    endTime: "11:30",
    type: "Planning",
    participants: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
    createdAt: "2024-01-10",
    status: "completed",
  },
  {
    id: "2",
    title: "Weekly Team Standup",
    agenda: "Team progress updates and blockers discussion",
    platform: "Zoom",
    meetLink: "https://zoom.us/j/123456789",
    date: "2024-01-16",
    startTime: "09:00",
    endTime: "09:30",
    type: "Standup",
    participants: ["Tom Brown", "Lisa Davis", "Mark Wilson"],
    createdAt: "2024-01-12",
    status: "scheduled",
  },
  {
    id: "3",
    title: "Client Presentation",
    agenda: "Present project deliverables to client stakeholders",
    platform: "Microsoft Teams",
    meetLink: "https://teams.microsoft.com/l/meetup-join/abc123",
    date: "2024-01-17",
    startTime: "14:00",
    endTime: "15:30",
    type: "Presentation",
    participants: ["Client Team", "Project Manager", "Tech Lead"],
    createdAt: "2024-01-14",
    status: "in-progress",
  },
  {
    id: "4",
    title: "Sprint Planning Session",
    agenda: "Plan upcoming sprint goals and assign tasks",
    platform: "Google Meet",
    meetLink: "https://meet.google.com/xyz-abc-def",
    date: "2024-01-18",
    startTime: "10:30",
    endTime: "12:00",
    type: "Planning",
    participants: ["Development Team", "Product Owner", "Scrum Master"],
    createdAt: "2024-01-15",
    status: "scheduled",
  },
  {
    id: "5",
    title: "Design Review",
    agenda: "Review UI/UX designs for the new feature",
    platform: "Zoom",
    meetLink: "https://zoom.us/j/987654321",
    date: "2024-01-19",
    startTime: "15:00",
    endTime: "16:00",
    type: "Review",
    participants: ["Design Team", "Frontend Developers", "Product Manager"],
    createdAt: "2024-01-16",
    status: "scheduled",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="badge-success">Completed</Badge>;
    case "scheduled":
      return <Badge className="badge-primary">Scheduled</Badge>;
    case "in-progress":
      return <Badge className="badge-warning">In Progress</Badge>;
    case "cancelled":
      return <Badge className="badge-danger">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getTypeBadge(type: string) {
  const variants: Record<string, string> = {
    Planning: "badge-primary",
    Standup: "badge-success",
    Presentation: "badge-warning",
    Review: "badge-primary",
  };
  
  return <Badge className={variants[type] || "badge-primary"}>{type}</Badge>;
}

export default function Meetings() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.agenda.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">
            Manage and track all your meetings in one place.
          </p>
        </div>
        <Button asChild>
          <Link to="/meetings/create">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Create Meeting
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, agenda, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Meetings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Meetings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Showing {filteredMeetings.length} of {meetings.length} meetings
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Agenda</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="font-medium">{meeting.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{meeting.agenda}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        {meeting.platform}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarIcon className="h-3 w-3" />
                          {meeting.date}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {meeting.startTime} - {meeting.endTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(meeting.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{meeting.participants.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(meeting.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <Video className="mr-2 h-4 w-4" />
                            Join Meeting
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Meeting
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}