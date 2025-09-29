import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import CreateMeeting from "./pages/CreateMeeting";
import MeetingDetails from "./pages/MeetingDetails";
import KanbanBoard from "./pages/KanbanBoard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page without layout */}
          <Route path="/" element={<Index />} />
          
          {/* App pages with layout */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/meetings" element={<Layout><Meetings /></Layout>} />
          <Route path="/meetings/create" element={<Layout><CreateMeeting /></Layout>} />
          <Route path="/meetings/:id" element={<Layout><MeetingDetails /></Layout>} />
          <Route path="/kanban" element={<Layout><KanbanBoard /></Layout>} />
          
          {/* Placeholder routes for sidebar navigation */}
          <Route path="/participants" element={<Layout><div className="text-center py-8"><h2 className="text-2xl font-bold mb-2">Participants</h2><p className="text-muted-foreground">Manage meeting participants and contacts</p></div></Layout>} />
          <Route path="/schedule" element={<Layout><div className="text-center py-8"><h2 className="text-2xl font-bold mb-2">Schedule</h2><p className="text-muted-foreground">View your meeting schedule and calendar</p></div></Layout>} />
          <Route path="/settings" element={<Layout><div className="text-center py-8"><h2 className="text-2xl font-bold mb-2">Settings</h2><p className="text-muted-foreground">Configure your meeting preferences</p></div></Layout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;