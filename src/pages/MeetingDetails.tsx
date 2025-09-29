import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  Users,
  Video,
  Plus,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Building2,
} from "lucide-react";

// Mock data for the meeting
const meeting = {
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
  status: "completed",
  description: "Quarterly review meeting to present project deliverables and discuss next phase with client stakeholders.",
  attendees: [
    { name: "John Smith", department: "Engineering", role: "Tech Lead" },
    { name: "Sarah Wilson", department: "Product", role: "Product Manager" },
    { name: "Mike Johnson", department: "Design", role: "UI/UX Designer" },
    { name: "Lisa Davis", department: "QA", role: "QA Lead" },
    { name: "Client Rep 1", department: "Client", role: "Stakeholder" },
    { name: "Client Rep 2", department: "Client", role: "Decision Maker" },
  ],
};

// Calculate task status summary
const getTaskStatusSummary = (tasks: typeof discussionPoints) => {
  const summary = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const total = tasks.length;
  const completed = summary.completed || 0;
  const inProgress = summary["in-progress"] || 0;
  const pending = summary.pending || 0;
  
  return { total, completed, inProgress, pending };
};

// Mock discussion points/tasks
const discussionPoints = [
  {
    id: "1",
    title: "Mobile App UI Review",
    description: "Review and finalize mobile application user interface designs",
    assignee: "Mike Johnson",
    department: "Design",
    status: "completed",
    priority: "high",
    dueDate: "2024-01-20",
    createdDate: "2024-01-17",
    updates: [
      { date: "2024-01-17", note: "Initial assignment during client presentation" },
      { date: "2024-01-19", note: "First draft completed, shared with team" },
      { date: "2024-01-20", note: "Final designs approved by client" },
    ],
  },
  {
    id: "2",
    title: "Backend API Performance Optimization",
    description: "Optimize API response times for better user experience",
    assignee: "John Smith",
    department: "Engineering",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-25",
    createdDate: "2024-01-17",
    updates: [
      { date: "2024-01-17", note: "Task assigned to optimize critical API endpoints" },
      { date: "2024-01-22", note: "Identified bottlenecks, working on database queries" },
    ],
  },
  {
    id: "3",
    title: "Test Coverage Improvement",
    description: "Increase test coverage to 85% for core modules",
    assignee: "Lisa Davis",
    department: "QA",
    status: "pending",
    priority: "medium",
    dueDate: "2024-01-30",
    createdDate: "2024-01-17",
    updates: [
      { date: "2024-01-17", note: "Assigned to improve overall test coverage" },
    ],
  },
];

// Follow-up meetings
const followUpMeetings = [
  {
    id: "follow-1",
    title: "Client Presentation - Weekly Follow-up #1",
    date: "2024-01-24",
    status: "scheduled",
    tasksDiscussed: ["1", "2"],
  },
  {
    id: "follow-2",
    title: "Client Presentation - Weekly Follow-up #2",
    date: "2024-01-31",
    status: "scheduled",
    tasksDiscussed: ["2", "3"],
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="badge-success">Completed</Badge>;
    case "in-progress":
      return <Badge className="badge-warning">In Progress</Badge>;
    case "pending":
      return <Badge className="badge-secondary">Pending</Badge>;
    case "overdue":
      return <Badge className="badge-danger">Overdue</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return <Badge className="badge-danger">High</Badge>;
    case "medium":
      return <Badge className="badge-warning">Medium</Badge>;
    case "low":
      return <Badge className="badge-success">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
    case "overdue":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

export default function MeetingDetails() {
  const { id } = useParams();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    department: "",
    priority: "medium",
    dueDate: "",
  });
  const [newNote, setNewNote] = useState("");

  const departments = ["Engineering", "Design", "Product", "QA", "Marketing", "Sales"];
  const taskSummary = getTaskStatusSummary(discussionPoints);
  
  const filteredTasks = departmentFilter === "all" 
    ? discussionPoints 
    : discussionPoints.filter(task => task.department === departmentFilter);

  const getResponsibilitiesByStaff = () => {
    const responsibilities = discussionPoints.reduce((acc, task) => {
      if (!acc[task.assignee]) {
        acc[task.assignee] = {
          name: task.assignee,
          department: task.department,
          tasks: [],
          completed: 0,
          inProgress: 0,
          pending: 0
        };
      }
      acc[task.assignee].tasks.push(task);
      acc[task.assignee][task.status === "in-progress" ? "inProgress" : task.status]++;
      return acc;
    }, {} as Record<string, any>);
    
    return Object.values(responsibilities);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/meetings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Meetings
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{meeting.title}</h1>
          <p className="text-muted-foreground">
            {meeting.date} • {meeting.startTime} - {meeting.endTime}
          </p>
        </div>
        <Button>
          <Video className="h-4 w-4 mr-2" />
          Join Meeting
        </Button>
      </div>

      {/* Meeting Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform</CardTitle>
            <Video className="h-4 w-4 ml-auto text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meeting.platform}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendees</CardTitle>
            <Users className="h-4 w-4 ml-auto text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meeting.attendees.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Status</CardTitle>
            <CheckCircle className="h-4 w-4 ml-auto text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{taskSummary.total} Total</div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>{taskSummary.completed} Done</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>{taskSummary.inProgress} Progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span>{taskSummary.pending} Pending</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discussion-points">Discussion Points</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
          <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Agenda</h4>
                <p className="text-muted-foreground">{meeting.agenda}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{meeting.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                {getStatusBadge(meeting.status)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion-points" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">Discussion Points & Tasks</h3>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Discussion Point</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Assignee</label>
                      <Input
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                        placeholder="Enter assignee name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Department</label>
                      <Select value={newTask.department} onValueChange={(value) => setNewTask({...newTask, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddingTask(false)}>
                      Add Task
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredTasks.map((point) => (
              <Card key={point.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(point.status)}
                          <h4 className="font-semibold">{point.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {getPriorityBadge(point.priority)}
                        {getStatusBadge(point.status)}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setIsAddingNote(point.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Note
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{point.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{point.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {point.dueDate}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Updates</h5>
                      <div className="space-y-2">
                        {point.updates.map((update, index) => (
                          <div key={index} className="flex gap-2 text-sm">
                            <span className="text-muted-foreground min-w-fit">{update.date}:</span>
                            <span>{update.note}</span>
                          </div>
                        ))}
                      </div>
                      
                      {isAddingNote === point.id && (
                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add follow-up note..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              size="sm"
                              onClick={() => {
                                // In real app, this would update the task
                                setIsAddingNote(null);
                                setNewNote("");
                              }}
                            >
                              Save
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setIsAddingNote(null);
                                setNewNote("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attendees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Attendees</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meeting.attendees.map((attendee, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell>{attendee.department}</TableCell>
                      <TableCell>{attendee.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsibilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Responsibilities Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getResponsibilitiesByStaff().map((staff: any) => (
                  <div key={staff.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{staff.name}</h4>
                        <p className="text-sm text-muted-foreground">{staff.department}</p>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="secondary">{staff.tasks.length} Total</Badge>
                        <Badge className="badge-success">{staff.completed} Done</Badge>
                        <Badge className="badge-warning">{staff.inProgress} Progress</Badge>
                        <Badge variant="secondary">{staff.pending} Pending</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {staff.tasks.map((task: any) => (
                        <div key={task.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <span>{task.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(task.priority)}
                            <span className="text-muted-foreground">Due: {task.dueDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="follow-ups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {followUpMeetings.map((followUp) => (
                  <div key={followUp.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{followUp.title}</h4>
                      <p className="text-sm text-muted-foreground">{followUp.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(followUp.status)}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // In real app, navigate to meeting details
                          window.location.href = `/meetings/${followUp.id}`;
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  className="w-full"
                  onClick={() => {
                    // In real app, navigate to create meeting with pre-filled data
                    window.location.href = '/create-meeting';
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Follow-up Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}