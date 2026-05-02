import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import Assessment from "./pages/Assessment.tsx";
import GamePlay from "./pages/GamePlay.tsx";
import Result from "./pages/Result.tsx";
import Status from "./pages/Status.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import { DashboardLayout } from "./components/DashboardLayout.tsx";
import DashboardHome from "./pages/dashboard/Home.tsx";
import Quests from "./pages/dashboard/Quests.tsx";
import Raid from "./pages/dashboard/Raid.tsx";
import Audits from "./pages/dashboard/Audits.tsx";
import Learn from "./pages/dashboard/Learn.tsx";
import Workspace from "./pages/dashboard/Workspace.tsx";
import Logbook from "./pages/dashboard/Logbook.tsx";
import Profile from "./pages/dashboard/Profile.tsx";
import Notifications from "./pages/dashboard/Notifications.tsx";
import Leaderboard from "./pages/dashboard/Leaderboard.tsx";
import Community from "./pages/dashboard/Community.tsx";
import Checkpoints from "./pages/dashboard/Checkpoints.tsx";
import Achievements from "./pages/dashboard/Achievements.tsx";
import { AdminLayout } from "./components/AdminLayout.tsx";
import AdminOverview from "./pages/admin/Overview.tsx";
import AdminApplications from "./pages/admin/Applications.tsx";
import AdminStudents from "./pages/admin/Students.tsx";
import AdminCodeMonitor from "./pages/admin/CodeMonitor.tsx";
import AdminCurriculumStudio from "./pages/admin/CurriculumStudio.tsx";
import AdminModeration from "./pages/admin/Moderation.tsx";
import AdminAuditLog from "./pages/admin/AuditLog.tsx";
import AdminRoles from "./pages/admin/Roles.tsx";
import AdminGameControl from "./pages/admin/GameControl.tsx";
import { getCompletedAttempts, MAX_GAME_ATTEMPTS } from "./lib/gameSettings.ts";

const queryClient = new QueryClient();

const RegisteredGameRoute = () => {
  const registered = window.localStorage.getItem("talentNationGameRegistered") === "true";
  const attemptsFinished = getCompletedAttempts() >= MAX_GAME_ATTEMPTS;

  if (!registered) return <Navigate to="/register" replace />;
  if (attemptsFinished) return <Navigate to="/status?state=review" replace />;
  return <GamePlay />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/play" element={<RegisteredGameRoute />} />
          <Route path="/assessment/result" element={<Result />} />
          <Route path="/status" element={<Status />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="learn" element={<Learn />} />
            <Route path="quests" element={<Quests />} />
            <Route path="raid" element={<Raid />} />
            <Route path="audits" element={<Audits />} />
            <Route path="checkpoints" element={<Checkpoints />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="community" element={<Community />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="workspace" element={<Workspace />} />
            <Route path="logbook" element={<Logbook />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="curriculum" element={<AdminCurriculumStudio />} />
            <Route path="game-control" element={<AdminGameControl />} />
            <Route path="code" element={<AdminCodeMonitor />} />
            <Route path="moderation" element={<AdminModeration />} />
            <Route path="audit" element={<AdminAuditLog />} />
            <Route path="roles" element={<AdminRoles />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
