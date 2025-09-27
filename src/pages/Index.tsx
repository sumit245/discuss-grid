import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Kanban, 
  BarChart3,
  CalendarPlus,
  Clock,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Meeting Management",
      description: "Create, schedule, and manage all your meetings in one place",
      href: "/meetings",
    },
    {
      icon: Users,
      title: "Participant Tracking",
      description: "Invite participants and track attendance across meetings",
      href: "/participants",
    },
    {
      icon: Kanban,
      title: "Discussion Points",
      description: "Track follow-up items and action points with a Kanban board",
      href: "/kanban",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "View meeting statistics and productivity insights",
      href: "/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MeetTracker Pro
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional meeting management made simple. Track meetings, manage participants, 
            and follow up on discussion points with our comprehensive platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/meetings/create">
                <CalendarPlus className="mr-2 h-5 w-5" />
                Create Meeting
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <Button variant="ghost" size="sm" asChild className="group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link to={feature.href}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Meetings Tracked</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">Attendance Rate</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-warning">24h</div>
                <div className="text-sm text-muted-foreground">Avg. Response Time</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of teams who trust MeetTracker to manage their meetings 
            and drive productivity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/meetings/create">
                <CalendarPlus className="mr-2 h-5 w-5" />
                Schedule Your First Meeting
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/kanban">
                <Kanban className="mr-2 h-5 w-5" />
                View Kanban Board
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
