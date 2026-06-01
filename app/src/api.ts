import type {
  Chapter, Profile, Flare, Event, UpcomingItem, Dues, Task,
  LeaderboardEntry, Memory, Message, Thread, ChatPreview, Job,
  Approval, SemesterStat, Member, CoverSwatch, CoverKey, BadgeTone,
  SendCodeResult, VerifyCodeResult, PublishEventInput, PublishEventResult,
  DayCell, AlumnaFilter,
} from "./types";

export const USE_MOCKS = true;

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

const delay = <T>(value: T, ms = 0) =>
  new Promise<T>(resolve => setTimeout(() => resolve(value), ms));

/* ─── Tokens ─── */

export const COVERS: Record<CoverKey, string> = {
  retreat: "linear-gradient(135deg,#E6C788 0%,#C9A86B 50%,#7E382E 100%)",
  formal:  "linear-gradient(135deg,#1B2447 0%,#4F3FA8 100%)",
  philanthropy: "linear-gradient(135deg,#E8B5B5 0%,#C77B7B 60%,#7E382E 100%)",
  mixer: "linear-gradient(160deg,#7E9DBE 0%,#4F3FA8 100%)",
  alumni: "linear-gradient(135deg,#B8A6E8 0%,#6B5BCB 100%)",
  beach: "linear-gradient(155deg,#E6C788 0%,#7E9DBE 100%)",
  iris: "linear-gradient(135deg,#8C7AE2 0%,#6B5BCB 60%,#4F3FA8 100%)",
  rose: "linear-gradient(135deg,#E8B5B5 0%,#C77B7B 60%,#7E382E 100%)",
};

export const COVER_SWATCHES: CoverSwatch[] = [
  { id: "retreat", gradient: COVERS.retreat },
  { id: "formal", gradient: COVERS.formal },
  { id: "rose", gradient: COVERS.rose },
  { id: "iris", gradient: COVERS.iris },
  { id: "beach", gradient: COVERS.beach },
];

/* ─── Mock data ─── */

const MOCK_CHAPTER: Chapter = {
  name: "Pi Beta Phi",
  school: "Stanford",
  subtitle: "Tuesday · May 7",
  sisters: 60,
  todayLabel: "Tuesday · May 7",
};

const MOCK_PROFILE: Profile = {
  id: "me",
  name: "Maya Park",
  gradient: 1,
  pledgeClass: "Spring '24",
  major: "Marketing",
  role: "Junior",
  badges: [
    { tone: "exec", label: "EXEC · VP" },
    { tone: "gold", label: "Top contributor", icon: "sparkle" },
  ],
};

const MOCK_FLARES: Record<string, Flare> = {
  f1: { id: "f1", title: "Tanning on Cowell", host: "Lily K.", hostGradient: 1, going: 4, ttl: "ends in 2h", cover: "linear-gradient(135deg,#E6C788,#C9A86B 60%,#9A7D3F)" },
  f2: { id: "f2", title: "Trader Joe's run", host: "Nora T.", hostGradient: 2, going: 2, ttl: "ends in 45m", cover: "linear-gradient(135deg,#DCE7DD,#5C8A65)" },
  f3: { id: "f3", title: "Coupa study sesh", host: "Ava R.", hostGradient: 3, going: 6, ttl: "ends in 3h", cover: "linear-gradient(135deg,#B8A6E8,#6B5BCB)" },
  f4: { id: "f4", title: "Love Island watch", host: "Sam G.", hostGradient: 4, going: 3, ttl: "ends 11pm", cover: "linear-gradient(135deg,#E8B5B5,#C77B7B)" },
};

export const FLARE_COVERS: Array<{ id: string; gradient: string; label: string }> = [
  { id: "gold", gradient: "linear-gradient(135deg,#E6C788,#C9A86B 60%,#9A7D3F)", label: "Gold" },
  { id: "moss", gradient: "linear-gradient(135deg,#DCE7DD,#5C8A65)", label: "Moss" },
  { id: "iris", gradient: "linear-gradient(135deg,#B8A6E8,#6B5BCB)", label: "Iris" },
  { id: "rose", gradient: "linear-gradient(135deg,#E8B5B5,#C77B7B)", label: "Rose" },
];

export const FLARE_DURATIONS = ["ends in 1h", "ends in 2h", "ends in 3h", "ends 11pm"];

const MOCK_EVENTS: Record<string, Event> = {
  "evt-retreat": {
    id: "evt-retreat", title: "Sisterhood retreat", eyebrow: "Friday May 9",
    date: "Friday May 9", time: "7:00 PM",
    location: "Maya's house — Lake Geneva",
    cover: "retreat", pinned: true,
    tag: { label: "Pinned", tone: "ink" },
    dayOfMonth: 9, dayBadge: { month: "May", day: "9" },
    attendees: ["Maya P", "Lily K", "Nora T", "Ava R"],
    going: 28, capacity: 60, reactions: 12, comments: 8,
    about: "Lake house weekend — bring a swimsuit, we'll handle dinner. Carpools leave the house at 6:30.",
  },
  "evt-meet": {
    id: "evt-meet", title: "Chapter meeting", eyebrow: "Monday May 12",
    date: "Monday May 12", time: "8:00 PM",
    location: "House library",
    cover: "alumni", dayOfMonth: 12, dayBadge: { month: "May", day: "12" },
    tag: { label: "Mandatory", tone: "danger" },
    attendees: ["Maya P", "Lily K", "Nora T", "Ava R"],
    going: 42, capacity: 60, reactions: 4, comments: 2,
    about: "Weekly business — May budget, retreat debrief, end-of-year vote. Attendance counts.",
  },
  "evt-bake": {
    id: "evt-bake", title: "Bake sale", eyebrow: "Wednesday May 14",
    date: "Wednesday May 14", time: "11:00 AM – 3:00 PM",
    location: "The Quad",
    cover: "philanthropy", dayOfMonth: 14, dayBadge: { month: "May", day: "14" },
    tag: { label: "Philanthropy", tone: "gold" },
    attendees: ["Tess M", "Iris W", "Sam G"],
    going: 18, capacity: 60, reactions: 22, comments: 14,
    about: "All proceeds go to the Read>Lead literacy fund. Bring baked goods Tuesday night for setup.",
  },
};

const MOCK_EVENT_LIST: Event[] = [
  MOCK_EVENTS["evt-retreat"],
  MOCK_EVENTS["evt-meet"],
  MOCK_EVENTS["evt-bake"],
];

const MOCK_UPCOMING: UpcomingItem[] = [
  { id: "u1", eventId: "evt-meet", day: "Mon", dayNum: "12", title: "Chapter meeting", sub: "House library · 8pm", tint: "lavender" },
  { id: "u2", eventId: "evt-bake", day: "Wed", dayNum: "14", title: "Bake sale (philanthropy)", sub: "The Quad · 11–3", tint: "gold" },
  { id: "u3", eventId: "evt-alumni", day: "Thu", dayNum: "15", title: "Alumni mixer", sub: "Greek row · 6pm", tint: "dusty" },
];

const MOCK_HOME_CHAT: ChatPreview[] = [
  { id: "c1", name: "Maya P.", text: "heads up — retreat moved to 7pm", time: "2m", gradient: 0 },
  { id: "c2", name: "Lily K.", text: "ok bringing snacks 🤍", time: "1m", gradient: 1 },
  { id: "c3", name: "Nora T.", text: "carpooling? meet at house 6:30", time: "now", gradient: 2 },
];

const MOCK_DUES: Dues = { month: "May", amount: 120, paid: 40, total: 60, due: "Friday" };

const MOCK_YOUR_TASKS: Task[] = [
  { id: "yt1", label: "Retreat fee", done: true },
  { id: "yt2", label: "Liability waiver", done: true },
  { id: "yt3", label: "Bring extra bedding", done: false },
  { id: "yt4", label: "Pay $35 retreat fee", done: false },
];

const MOCK_LEADERBOARD_TOP: LeaderboardEntry[] = [
  { rank: 1, name: "Maya P.", points: 1240, gradient: 0, gold: true },
  { rank: 2, name: "Lily K.", points: 980, gradient: 1 },
  { rank: 3, name: "Nora T.", points: 875, gradient: 2 },
];

const MOCK_LEADERBOARD_FULL: LeaderboardEntry[] = [
  ...MOCK_LEADERBOARD_TOP,
  { rank: 4, name: "Ava R.", points: 820, gradient: 3 },
  { rank: 5, name: "Tess M.", points: 760, gradient: 4 },
  { rank: 6, name: "Iris W.", points: 690, gradient: 5 },
  { rank: 7, name: "Sam G.", points: 630, gradient: 0 },
  { rank: 8, name: "Mia L.", points: 580, gradient: 2 },
  { rank: 9, name: "Jules H.", points: 540, gradient: 1 },
  { rank: 10, name: "Rachel D.", points: 490, gradient: 3 },
];

const MOCK_MEMORIES: Record<string, Memory> = {
  m1: { id: "m1", title: "Big-little reveal", cover: "philanthropy", count: 32, date: "April 12", photos: ["philanthropy","rose","beach","mixer","retreat","alumni"] },
  m2: { id: "m2", title: "Spring formal", cover: "formal", count: 84, date: "March 28", photos: ["formal","iris","alumni","mixer","retreat","beach","philanthropy","rose"] },
  m3: { id: "m3", title: "Beach day", cover: "beach", count: 56, date: "March 8", photos: ["beach","retreat","rose","mixer","iris"] },
  m4: { id: "m4", title: "Date party", cover: "mixer", count: 48, date: "February 14", photos: ["mixer","rose","iris","formal"] },
};

const MOCK_EVENT_TASKS: Record<string, Task[]> = {
  "evt-retreat": [
    { id: "et1", done: true, label: "Sign liability waiver", by: "Maya P" },
    { id: "et2", done: true, label: "Confirm ride share", by: "Lily K" },
    { id: "et3", done: false, label: "Bring extra bedding", by: "you" },
    { id: "et4", done: false, label: "Pay $35 retreat fee", by: "you" },
  ],
  "evt-meet": [
    { id: "mt1", done: true, label: "Read May budget pre-read", by: "you" },
    { id: "mt2", done: false, label: "Vote in end-of-year poll", by: "you" },
  ],
  "evt-bake": [
    { id: "bt1", done: false, label: "Sign up to bake (2 items)", by: "you" },
    { id: "bt2", done: false, label: "Cover a 1hr shift", by: "you" },
    { id: "bt3", done: false, label: "Bring Square reader", by: "Tess M" },
  ],
};

const MEMBER_DIRECTORY: Record<string, Member> = {
  a1: { id: "a1", name: "Rachel Diaz", year: "'19", role: "Sr. PMM, Figma", location: "SF", gradient: 3, hiring: true },
  a2: { id: "a2", name: "Iris Wong", year: "'20", role: "SWE, Stripe", location: "Remote", gradient: 5, hiring: true },
  a3: { id: "a3", name: "Tess Morgan", year: "'18", role: "Analyst, Goldman", location: "NYC", gradient: 4, hiring: true },
  a4: { id: "a4", name: "Mia Levin", year: "'17", role: "Resident, Stanford Med", location: "Palo Alto", gradient: 2 },
  a5: { id: "a5", name: "Jules Hart", year: "'16", role: "Founder, Patchwork", location: "LA", gradient: 0 },
  "maya-p": { id: "maya-p", name: "Maya P.", gradient: 0, role: "VP · Junior", pledgeClass: "Spring '24", major: "Marketing" },
  "lily-k": { id: "lily-k", name: "Lily K.", gradient: 1, role: "Social chair · Junior", pledgeClass: "Spring '24", major: "Econ" },
  "nora-t": { id: "nora-t", name: "Nora T.", gradient: 2, role: "Pledge ed · Sophomore", pledgeClass: "Spring '25", major: "CS" },
  "ava-r": { id: "ava-r", name: "Ava R.", gradient: 3, role: "Treasurer · Junior", pledgeClass: "Fall '23", major: "Symbolic Systems" },
  "tess-m": { id: "tess-m", name: "Tess M.", gradient: 4, role: "Philanthropy · Senior", pledgeClass: "Spring '22", major: "Public Policy" },
  "sam-g": { id: "sam-g", name: "Sam G.", gradient: 0, role: "Sophomore", pledgeClass: "Spring '25", major: "Design" },
  "iris-w": { id: "iris-w", name: "Iris W.", gradient: 5, role: "Junior", pledgeClass: "Spring '24", major: "CS" },
};

const MOCK_EVENT_GOING: Record<string, Member[]> = {
  "evt-retreat": [
    MEMBER_DIRECTORY["maya-p"],
    MEMBER_DIRECTORY["lily-k"],
    MEMBER_DIRECTORY["nora-t"],
  ],
  "evt-meet": [
    { id: "ava-r", name: "Ava R.", gradient: 3, role: "Bringing the agenda" },
    { id: "tess-m", name: "Tess M.", gradient: 4, role: "Treasurer · budget walk-through" },
    { id: "iris-w", name: "Iris W.", gradient: 5, role: "Will dial in" },
  ],
  "evt-bake": [
    { id: "tess-m", name: "Tess M.", gradient: 4, role: "Setup lead — 9am" },
    { id: "sam-g", name: "Sam G.", gradient: 0, role: "Brookies + signage" },
    { id: "iris-w", name: "Iris W.", gradient: 5, role: "Closing shift" },
  ],
};

const MOCK_THREADS: Thread[] = [
  { id: "t1", name: "Sisterhood retreat", last: "Lily: ok bringing snacks", time: "12m", unread: 2, gradient: 1, isEvent: true,
    subtitle: "28 going",
    pinned: { text: "Retreat moved to 7pm — Maya", by: "Maya", ago: "2m" } },
  { id: "t2", name: "Pledge class · Spring '26", last: "Nora: streak day 35", time: "1h", unread: 0, gradient: 2,
    subtitle: "12 pledges" },
  { id: "t3", name: "Exec", last: "Ava: dues reminder draft attached", time: "3h", unread: 0, gradient: 3,
    subtitle: "5 officers" },
  { id: "t4", name: "Maya P.", last: "see you Friday 🤍", time: "Yest", unread: 0, gradient: 0,
    subtitle: "Direct" },
  { id: "t5", name: "Bake sale committee", last: "Tess: who's bringing the table?", time: "Mon", unread: 0, gradient: 4,
    subtitle: "8 sisters" },
];

const MOCK_CHAPTER_THREAD: Thread = {
  id: "chapter", name: "Chapter", last: "Nora: carpooling? meet at house 6:30",
  time: "now", unread: 3, gradient: 0,
  subtitle: "60 sisters",
  pinned: { text: "Retreat moved to 7pm — Maya", by: "Maya", ago: "2m" },
};

const MOCK_THREAD_MESSAGES: Record<string, Message[]> = {
  chapter: [
    { id: "m0", text: "Tuesday · 11:42 AM", system: true },
    { id: "m1", from: "Maya P.", text: "heads up — retreat moved to 7pm" },
    { id: "m2", from: "Maya P.", text: "please rsvp by tonight" },
    { id: "m3", from: "Lily K.", text: "ok bringing snacks 🤍" },
    { id: "m4", mine: true, text: "omw with bedding", time: "now" },
    { id: "m5", from: "Nora T.", text: "carpooling? meet at house 6:30" },
  ],
  t1: [
    { id: "r0", text: "Sunday · 9:00 PM", system: true },
    { id: "r1", from: "Maya P.", text: "ride list — drop in your name" },
    { id: "r2", from: "Lily K.", text: "I can take 4 — leaving 6:30" },
    { id: "r3", from: "Ava R.", text: "in with Lily" },
    { id: "r4", mine: true, text: "I'll grab bedding from the storage room" },
  ],
  t2: [
    { id: "p0", text: "Today · 10:12 AM", system: true },
    { id: "p1", from: "Nora T.", text: "streak day 35 — let's keep it" },
    { id: "p2", from: "Sam G.", text: "in 🔥" },
    { id: "p3", mine: true, text: "in" },
  ],
  t3: [
    { id: "x0", text: "Monday · 4:20 PM", system: true },
    { id: "x1", from: "Ava R.", text: "dues reminder draft attached — soft tone, not nag-y" },
    { id: "x2", from: "Maya P.", text: "approve, send tomorrow AM" },
  ],
  t4: [
    { id: "d0", text: "Yesterday · 8:14 PM", system: true },
    { id: "d1", from: "Maya P.", text: "see you Friday 🤍" },
    { id: "d2", mine: true, text: "🤍" },
  ],
  t5: [
    { id: "b0", text: "Monday · 6:00 PM", system: true },
    { id: "b1", from: "Tess M.", text: "who's bringing the table?" },
    { id: "b2", from: "Sam G.", text: "I'll grab one from the house" },
    { id: "b3", from: "Tess M.", text: "perfect — pickup Tues" },
  ],
};

const MOCK_JOBS: Record<string, Job> = {
  j1: { id: "j1", company: "Figma", role: "PMM intern", location: "SF", via: "Rachel D, '19", viaGradient: 3,
    about: "On the growth team. Help with launch comms, customer stories, narrative for Config. 12-week summer program.",
    pay: "$48/hr" },
  j2: { id: "j2", company: "Stripe", role: "SWE intern", location: "Remote", via: "Iris W, '20", viaGradient: 5,
    about: "Payments-foundations team. Real prod code, ship in week 4. Stripe Press perks.",
    pay: "$56/hr" },
  j3: { id: "j3", company: "Goldman", role: "Summer analyst", location: "NYC", via: "Tess M, '18", viaGradient: 4,
    about: "TMT coverage group. 10-week program with rotational shadowing.",
    pay: "$120k base prorated" },
};

const MOCK_APPROVALS: Approval[] = [
  { id: "ap1", who: "Lily K.", whoGradient: 1, what: "+50 pts · led bake sale", needs: "1 of 2 approvals" },
  { id: "ap2", who: "Ava R.", whoGradient: 2, what: "+30 pts · designed flyers", needs: "0 of 2 approvals" },
];

const MOCK_STATS: SemesterStat[] = [
  { label: "Events attended", value: "12 of 14" },
  { label: "Tasks completed", value: "38" },
  { label: "Dues", value: "Paid · May" },
  { label: "Volunteer hours", value: "16h" },
];

const MOCK_WEEK_STRIP: DayCell[] = [
  { day: "Mon", dayOfMonth: 5, today: false, dot: null },
  { day: "Tue", dayOfMonth: 6, today: false, dot: null },
  { day: "Wed", dayOfMonth: 7, today: true, dot: null },
  { day: "Thu", dayOfMonth: 8, today: false, dot: null },
  { day: "Fri", dayOfMonth: 9, today: false, dot: "iris" },
  { day: "Sat", dayOfMonth: 10, today: false, dot: null },
  { day: "Sun", dayOfMonth: 11, today: false, dot: null },
  { day: "Mon", dayOfMonth: 12, today: false, dot: "iris" },
  { day: "Tue", dayOfMonth: 13, today: false, dot: null },
  { day: "Wed", dayOfMonth: 14, today: false, dot: "gold" },
];

/* ─── Public API ─── */

type Tone = BadgeTone;
export type { Tone };

export const api = {
  getChapter: (): Promise<Chapter> =>
    USE_MOCKS ? delay(MOCK_CHAPTER) : request("/chapter"),

  getCurrentUser: (): Promise<Profile> =>
    USE_MOCKS ? delay(MOCK_PROFILE) : request("/me"),

  getFlares: (): Promise<Flare[]> =>
    USE_MOCKS ? delay(Object.values(MOCK_FLARES)) : request("/flares"),

  getFlare: (id: string): Promise<Flare | null> =>
    USE_MOCKS ? delay(MOCK_FLARES[id] ?? null) : request(`/flares/${id}`),

  getPinnedEvent: (): Promise<Event> =>
    USE_MOCKS ? delay(MOCK_EVENTS["evt-retreat"]) : request("/events/pinned"),

  getEvents: (): Promise<Event[]> =>
    USE_MOCKS ? delay(MOCK_EVENT_LIST) : request("/events"),

  getEvent: (id: string): Promise<Event> =>
    USE_MOCKS
      ? delay(MOCK_EVENTS[id] ?? MOCK_EVENTS["evt-retreat"])
      : request(`/events/${id}`),

  getWeekStrip: (): Promise<DayCell[]> =>
    USE_MOCKS ? delay(MOCK_WEEK_STRIP) : request("/calendar/week"),

  getUpcoming: (): Promise<UpcomingItem[]> =>
    USE_MOCKS ? delay(MOCK_UPCOMING) : request("/events/upcoming"),

  getHomeChatPreview: (): Promise<ChatPreview[]> =>
    USE_MOCKS ? delay(MOCK_HOME_CHAT) : request("/chat/preview"),

  getDues: (): Promise<Dues> =>
    USE_MOCKS ? delay(MOCK_DUES) : request("/dues"),

  getYourTasks: (): Promise<Task[]> =>
    USE_MOCKS ? delay(MOCK_YOUR_TASKS) : request("/tasks/me"),

  getLeaderboard: (): Promise<LeaderboardEntry[]> =>
    USE_MOCKS ? delay(MOCK_LEADERBOARD_TOP) : request("/leaderboard"),

  getFullLeaderboard: (): Promise<LeaderboardEntry[]> =>
    USE_MOCKS ? delay(MOCK_LEADERBOARD_FULL) : request("/leaderboard/full"),

  getMemories: (): Promise<Memory[]> =>
    USE_MOCKS ? delay(Object.values(MOCK_MEMORIES)) : request("/memories"),

  getMemory: (id: string): Promise<Memory | null> =>
    USE_MOCKS ? delay(MOCK_MEMORIES[id] ?? null) : request(`/memories/${id}`),

  getEventTasks: (eventId: string): Promise<Task[]> =>
    USE_MOCKS ? delay(MOCK_EVENT_TASKS[eventId] ?? []) : request(`/events/${eventId}/tasks`),

  getEventGoing: (eventId: string): Promise<Member[]> =>
    USE_MOCKS ? delay(MOCK_EVENT_GOING[eventId] ?? []) : request(`/events/${eventId}/going`),

  setRsvp: (_eventId: string, status: "yes" | "maybe" | "no"): Promise<{ ok: true; status: typeof status }> =>
    USE_MOCKS ? delay({ ok: true as const, status }) : request(`/events/${_eventId}/rsvp`, { method: "POST", body: JSON.stringify({ status }) }),

  toggleTask: (_eventId: string, taskId: string, done: boolean): Promise<{ ok: true }> =>
    USE_MOCKS ? delay({ ok: true as const }) : request(`/events/${_eventId}/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ done }) }),

  getThreads: (): Promise<Thread[]> =>
    USE_MOCKS ? delay(MOCK_THREADS) : request("/threads"),

  getThread: (threadId: string): Promise<Thread> =>
    USE_MOCKS
      ? delay(threadId === "chapter" ? MOCK_CHAPTER_THREAD : (MOCK_THREADS.find(t => t.id === threadId) ?? MOCK_CHAPTER_THREAD))
      : request(`/threads/${threadId}`),

  getThreadMessages: (threadId: string): Promise<Message[]> =>
    USE_MOCKS
      ? delay(MOCK_THREAD_MESSAGES[threadId] ?? MOCK_THREAD_MESSAGES["chapter"])
      : request(`/threads/${threadId}/messages`),

  sendMessage: (_threadId: string, text: string): Promise<Message> =>
    USE_MOCKS
      ? delay({ id: `m${Date.now()}`, mine: true, text, time: "now" })
      : request(`/threads/${_threadId}/messages`, { method: "POST", body: JSON.stringify({ text }) }),

  getFeaturedAlumna: (): Promise<Member> =>
    USE_MOCKS ? delay(MEMBER_DIRECTORY.a1) : request("/alumnae/featured"),

  getJobs: (): Promise<Job[]> =>
    USE_MOCKS ? delay(Object.values(MOCK_JOBS)) : request("/jobs"),

  getJob: (id: string): Promise<Job | null> =>
    USE_MOCKS ? delay(MOCK_JOBS[id] ?? null) : request(`/jobs/${id}`),

  getAlumnae: (filter: AlumnaFilter = "all"): Promise<Member[]> => {
    if (USE_MOCKS) {
      const all = Object.values(MEMBER_DIRECTORY).filter(m => m.year);
      const filtered = filter === "hiring" ? all.filter(m => m.hiring) : all;
      return delay(filtered);
    }
    return request(`/alumnae?filter=${filter}`);
  },

  getMember: (id: string): Promise<Member | null> =>
    USE_MOCKS ? delay(MEMBER_DIRECTORY[id] ?? null) : request(`/members/${id}`),

  getApprovals: (): Promise<Approval[]> =>
    USE_MOCKS ? delay(MOCK_APPROVALS) : request("/approvals"),

  getSemesterStats: (): Promise<SemesterStat[]> =>
    USE_MOCKS ? delay(MOCK_STATS) : request("/stats/semester"),

  sendCode: (phone: string): Promise<SendCodeResult> =>
    USE_MOCKS ? delay({ ok: true as const, sentTo: phone }) : request("/auth/send-code", { method: "POST", body: JSON.stringify({ phone }) }),

  verifyCode: (_phone: string, code: string): Promise<VerifyCodeResult> =>
    USE_MOCKS ? delay({ ok: code.length === 6 }) : request("/auth/verify", { method: "POST", body: JSON.stringify({ phone: _phone, code }) }),

  updateProfile: (input: { name: string; pledgeClass: string; major: string }): Promise<{ ok: true }> =>
    USE_MOCKS ? delay({ ok: true as const }) : request("/me", { method: "PATCH", body: JSON.stringify(input) }),

  publishEvent: (input: PublishEventInput): Promise<PublishEventResult> =>
    USE_MOCKS
      ? delay({ ok: true as const, eventId: `evt-${Date.now()}`, notified: 60, texted: 12 })
      : request("/events", { method: "POST", body: JSON.stringify(input) }),

  createFlare: (input: { title: string; cover: string; ttl: string }): Promise<Flare> => {
    const id = `f-${Date.now()}`;
    const flare: Flare = {
      id, title: input.title || "New plan",
      host: "Maya P.", hostGradient: 0,
      going: 1, ttl: input.ttl, cover: input.cover,
    };
    if (USE_MOCKS) {
      MOCK_FLARES[id] = flare;
      return delay(flare);
    }
    return request("/flares", { method: "POST", body: JSON.stringify(input) });
  },

  joinFlare: (id: string): Promise<{ ok: true; going: number }> => {
    if (USE_MOCKS) {
      const f = MOCK_FLARES[id];
      if (f) f.going += 1;
      return delay({ ok: true as const, going: f?.going ?? 1 });
    }
    return request(`/flares/${id}/join`, { method: "POST" });
  },

  shareToChapter: (kind: "flare" | "event", id: string): Promise<{ ok: true }> =>
    USE_MOCKS ? delay({ ok: true as const }) : request(`/share`, { method: "POST", body: JSON.stringify({ kind, id }) }),

  addEventPhoto: (eventId: string): Promise<{ ok: true }> =>
    USE_MOCKS ? delay({ ok: true as const }) : request(`/events/${eventId}/photos`, { method: "POST" }),

  applyToJob: (jobId: string): Promise<{ ok: true; applied: boolean }> =>
    USE_MOCKS ? delay({ ok: true as const, applied: true }) : request(`/jobs/${jobId}/apply`, { method: "POST" }),

  requestIntro: (memberId: string): Promise<{ ok: true }> =>
    USE_MOCKS ? delay({ ok: true as const }) : request(`/members/${memberId}/intro`, { method: "POST" }),

  scheduleCoffee: (memberId: string): Promise<{ ok: true }> =>
    USE_MOCKS ? delay({ ok: true as const }) : request(`/members/${memberId}/coffee`, { method: "POST" }),

  resolveApproval: (id: string, action: "approve" | "hold"): Promise<{ ok: true }> =>
    USE_MOCKS ? delay({ ok: true as const }) : request(`/approvals/${id}`, { method: "POST", body: JSON.stringify({ action }) }),

  payDues: (): Promise<{ ok: true; receipt: string }> =>
    USE_MOCKS ? delay({ ok: true as const, receipt: `RCT-${Date.now()}` }) : request("/dues/pay", { method: "POST" }),
};
