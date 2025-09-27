import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Plus, Calendar, Users, Clock, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DiscussionPoint {
  id: string;
  title: string;
  description: string;
  meetingId: string;
  meetingTitle: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "review" | "done";
  createdAt: string;
  dueDate?: string;
}

const mockDiscussionPoints: DiscussionPoint[] = [
  {
    id: "1",
    title: "Update user authentication flow",
    description: "Discussed improving the login process with 2FA implementation",
    meetingId: "meeting-1",
    meetingTitle: "Security Review Meeting",
    assignee: "John Doe",
    priority: "high",
    status: "todo",
    createdAt: "2024-01-15",
    dueDate: "2024-01-25",
  },
  {
    id: "2",
    title: "Database optimization strategy",
    description: "Need to analyze current query performance and implement indexing",
    meetingId: "meeting-2",
    meetingTitle: "Technical Architecture Review",
    assignee: "Jane Smith",
    priority: "medium",
    status: "in-progress",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Mobile app wireframes",
    description: "Review and finalize mobile application wireframes for iOS and Android",
    meetingId: "meeting-3",
    meetingTitle: "Design Review Session",
    assignee: "Mike Johnson",
    priority: "medium",
    status: "review",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "API documentation update",
    description: "Complete documentation for new endpoints and deprecate old ones",
    meetingId: "meeting-1",
    meetingTitle: "Security Review Meeting",
    assignee: "Sarah Wilson",
    priority: "low",
    status: "done",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Performance monitoring setup",
    description: "Implement comprehensive monitoring for application performance metrics",
    meetingId: "meeting-4",
    meetingTitle: "Infrastructure Planning",
    assignee: "Tom Brown",
    priority: "high",
    status: "todo",
    createdAt: "2024-01-16",
    dueDate: "2024-01-30",
  },
];

const columns = [
  { id: "todo", title: "To Do", color: "bg-blue-100 text-blue-800" },
  { id: "in-progress", title: "In Progress", color: "bg-yellow-100 text-yellow-800" },
  { id: "review", title: "Review", color: "bg-purple-100 text-purple-800" },
  { id: "done", title: "Done", color: "bg-green-100 text-green-800" },
];

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

function DiscussionPointCard({ point }: { point: DiscussionPoint }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm leading-tight">{point.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Move to...</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {point.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span className="truncate">{point.meetingTitle}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getPriorityBadge(point.priority)}
            {point.assignee && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span className="text-xs truncate">{point.assignee}</span>
              </div>
            )}
          </div>
          {point.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{point.dueDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function KanbanBoard() {
  const [discussionPoints, setDiscussionPoints] = useState(mockDiscussionPoints);
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [newPoint, setNewPoint] = useState({
    title: "",
    description: "",
    meetingId: "",
    assignee: "",
    priority: "medium" as const,
    dueDate: "",
  });

  const handleAddPoint = () => {
    if (!newPoint.title.trim()) return;

    const point: DiscussionPoint = {
      id: Date.now().toString(),
      ...newPoint,
      meetingTitle: "Selected Meeting", // This would come from meeting selection
      status: "todo",
      createdAt: new Date().toISOString().split('T')[0],
    };

    setDiscussionPoints(prev => [...prev, point]);
    setNewPoint({
      title: "",
      description: "",
      meetingId: "",
      assignee: "",
      priority: "medium",
      dueDate: "",
    });
    setIsAddingPoint(false);
  };

  const getPointsByStatus = (status: string) => {
    return discussionPoints.filter(point => point.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Discussion Points Kanban</h1>
          <p className="text-muted-foreground">
            Track and manage discussion points from all your meetings.
          </p>
        </div>
        <Dialog open={isAddingPoint} onOpenChange={setIsAddingPoint}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Discussion Point
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Discussion Point</DialogTitle>
              <DialogDescription>
                Create a new discussion point from a meeting to track progress.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter discussion point title"
                  value={newPoint.title}
                  onChange={(e) => setNewPoint(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the discussion point"
                  value={newPoint.description}
                  onChange={(e) => setNewPoint(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={newPoint.priority} onValueChange={(value: any) => setNewPoint(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={newPoint.dueDate}
                    onChange={(e) => setNewPoint(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assignee</label>
                <Input
                  placeholder="Enter assignee name"
                  value={newPoint.assignee}
                  onChange={(e) => setNewPoint(prev => ({ ...prev, assignee: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingPoint(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPoint}>
                  Add Discussion Point
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((column) => {
          const count = getPointsByStatus(column.id).length;
          return (
            <Card key={column.id}>
              <CardContent className="p-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{column.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => {
          const points = getPointsByStatus(column.id);
          return (
            <Card key={column.id} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{column.title}</CardTitle>
                  <Badge className={column.color}>{points.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {points.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No items</p>
                  </div>
                ) : (
                  points.map((point) => (
                    <DiscussionPointCard key={point.id} point={point} />
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}