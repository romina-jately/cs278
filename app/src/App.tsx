import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import EventScreen from "./screens/EventScreen";
import MessagingScreen from "./screens/MessagingScreen";
import ThreadScreen from "./screens/ThreadScreen";
import AlumnaeScreen from "./screens/AlumnaeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import PhoneScreen from "./screens/PhoneScreen";
import VerifyScreen from "./screens/VerifyScreen";
import ProfileSetupScreen from "./screens/ProfileSetupScreen";
import WelcomeInScreen from "./screens/WelcomeInScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import EventPublishedScreen from "./screens/EventPublishedScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import AlumnaDetailScreen from "./screens/AlumnaDetailScreen";
import JobDetailScreen from "./screens/JobDetailScreen";
import MemoryDetailScreen from "./screens/MemoryDetailScreen";
import FlareDetailScreen from "./screens/FlareDetailScreen";

type NavItem = { path: string; label: string; group: string; match?: (p: string) => boolean };

const NAV: NavItem[] = [
  { path: "/home", label: "Home", group: "App" },
  { path: "/calendar", label: "Calendar", group: "App" },
  { path: "/events/evt-retreat", label: "Event", group: "App", match: p => p.startsWith("/events") },
  { path: "/chat", label: "Chat", group: "App" },
  { path: "/threads/chapter", label: "Thread", group: "App", match: p => p.startsWith("/threads") },
  { path: "/alumnae", label: "Alumnae", group: "App", match: p => p === "/alumnae" },
  { path: "/me", label: "Profile", group: "App" },
  { path: "/leaderboard", label: "Leaderboard", group: "Detail" },
  { path: "/alumnae/a1", label: "Alumna", group: "Detail", match: p => /^\/alumnae\//.test(p) },
  { path: "/jobs/j1", label: "Job", group: "Detail", match: p => p.startsWith("/jobs") },
  { path: "/memories/m1", label: "Memory", group: "Detail", match: p => p.startsWith("/memories") },
  { path: "/flares/f1", label: "Flare", group: "Detail", match: p => p.startsWith("/flares") },
  { path: "/signup", label: "Welcome", group: "Sign up" },
  { path: "/signup/phone", label: "Phone", group: "Sign up" },
  { path: "/signup/verify", label: "Verify", group: "Sign up" },
  { path: "/signup/setup", label: "Profile", group: "Sign up" },
  { path: "/signup/done", label: "You're in", group: "Sign up" },
  { path: "/create", label: "Compose", group: "Create event" },
  { path: "/create/details", label: "Tasks & RSVP", group: "Create event" },
  { path: "/create/done", label: "Published", group: "Create event" },
];

function Header() {
  const location = useLocation();
  const groups = NAV.reduce<Record<string, NavItem[]>>((acc, n) => {
    (acc[n.group] ??= []).push(n);
    return acc;
  }, {});
  return (
    <div className="header">
      <div className="h-left">
        <h1>Ares — mobile</h1>
        <p>
          A React + TypeScript build of the Ares iPhone app at 390 × 844. Every list is
          data-driven and every item is clickable. Pick a tab to jump in.
        </p>
      </div>
      <nav className="nav" aria-label="Screens">
        {Object.entries(groups).map(([group, items], gi) => (
          <span key={group} style={{ display: "contents" }}>
            <span className={"group-label" + (gi === 0 ? " first" : "")}>{group}</span>
            {items.map(item => {
              const active = item.match
                ? item.match(location.pathname)
                : location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={active ? "on" : ""}>{item.label}</Link>
              );
            })}
          </span>
        ))}
      </nav>
    </div>
  );
}

function Stage() {
  return (
    <div className="stage">
      <div className="frame-wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace/>}/>
          <Route path="/home" element={<HomeScreen/>}/>
          <Route path="/calendar" element={<CalendarScreen/>}/>
          <Route path="/events/:id" element={<EventScreen/>}/>
          <Route path="/chat" element={<MessagingScreen/>}/>
          <Route path="/threads/:id" element={<ThreadScreen/>}/>
          <Route path="/alumnae" element={<AlumnaeScreen/>}/>
          <Route path="/alumnae/:id" element={<AlumnaDetailScreen/>}/>
          <Route path="/jobs/:id" element={<JobDetailScreen/>}/>
          <Route path="/memories/:id" element={<MemoryDetailScreen/>}/>
          <Route path="/flares/:id" element={<FlareDetailScreen/>}/>
          <Route path="/leaderboard" element={<LeaderboardScreen/>}/>
          <Route path="/me" element={<ProfileScreen/>}/>
          <Route path="/signup" element={<WelcomeScreen/>}/>
          <Route path="/signup/phone" element={<PhoneScreen/>}/>
          <Route path="/signup/verify" element={<VerifyScreen/>}/>
          <Route path="/signup/setup" element={<ProfileSetupScreen/>}/>
          <Route path="/signup/done" element={<WelcomeInScreen/>}/>
          <Route path="/create" element={<CreateEventScreen/>}/>
          <Route path="/create/details" element={<EventDetailsScreen/>}/>
          <Route path="/create/done" element={<EventPublishedScreen/>}/>
          <Route path="*" element={<Navigate to="/home" replace/>}/>
        </Routes>
        <div className="label">390 × 844</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header/>
      <Stage/>
    </>
  );
}
