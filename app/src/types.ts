export type CoverKey = "retreat" | "formal" | "philanthropy" | "mixer" | "alumni" | "beach" | "iris" | "rose";

export type BadgeTone = "iris" | "success" | "warning" | "danger" | "gold" | "exec" | "ink";

export type Tag = { label: string; tone?: BadgeTone };

export type EventVisibility = "chapter" | "pledge" | "committee";

export type Member = {
  id: string;
  name: string;
  gradient: number;
  pledgeClass?: string;
  major?: string;
  role?: string;
  location?: string;
  year?: string;
  hiring?: boolean;
};

export type Profile = Member & {
  pledgeClass: string;
  major: string;
  role: string;
  badges: Array<{ tone: BadgeTone; label: string; icon?: string }>;
};

export type Chapter = {
  name: string;
  school: string;
  subtitle: string;
  sisters: number;
  todayLabel: string;
};

export type Flare = {
  id: string;
  title: string;
  host: string;
  hostGradient: number;
  going: number;
  ttl: string;
  cover: string;
};

export type Event = {
  id: string;
  title: string;
  eyebrow?: string;
  date: string;
  time: string;
  location: string;
  cover: CoverKey;
  tag?: Tag;
  pinned?: boolean;
  dayOfMonth: number;
  dayBadge?: { month: string; day: string };
  attendees: string[];
  going: number;
  capacity: number;
  reactions: number;
  comments: number;
  about?: string;
};

export type UpcomingItem = {
  id: string;
  eventId: string;
  day: string;
  dayNum: string;
  title: string;
  sub: string;
  tint: "lavender" | "gold" | "dusty";
};

export type DayCell = {
  day: string;
  dayOfMonth: number;
  today: boolean;
  dot: "iris" | "gold" | null;
};

export type Dues = {
  month: string;
  amount: number;
  paid: number;
  total: number;
  due: string;
};

export type Task = {
  id: string;
  label: string;
  done: boolean;
  by?: string;
  required?: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  points: number;
  gradient: number;
  gold?: boolean;
};

export type Memory = {
  id: string;
  title: string;
  cover: CoverKey;
  count: number;
  date?: string;
  photos?: string[];
};

export type Message = {
  id: string;
  from?: string;
  text: string;
  mine?: boolean;
  time?: string;
  system?: boolean;
};

export type Thread = {
  id: string;
  name: string;
  last: string;
  time: string;
  unread: number;
  gradient: number;
  isEvent?: boolean;
  pinned?: { text: string; by: string; ago: string };
  subtitle?: string;
};

export type ChatPreview = {
  id: string;
  name: string;
  text: string;
  time: string;
  gradient: number;
};

export type Job = {
  id: string;
  company: string;
  role: string;
  location: string;
  via: string;
  viaGradient: number;
  about?: string;
  pay?: string;
};

export type AlumnaFilter = "all" | "hiring" | "mentoring";

export type Approval = {
  id: string;
  who: string;
  whoGradient: number;
  what: string;
  needs: string;
};

export type SemesterStat = {
  label: string;
  value: string;
};

export type CoverSwatch = {
  id: CoverKey;
  gradient: string;
};

export type SendCodeResult = { ok: true; sentTo: string };
export type VerifyCodeResult = { ok: boolean };
export type PublishEventInput = {
  title: string;
  cover: CoverKey;
  about: string;
  visibility: EventVisibility;
  points: number;
  rsvp: boolean;
  plusOne: boolean;
  mandatory: boolean;
  tasks: Array<{ label: string; required: boolean }>;
};
export type PublishEventResult = { ok: true; eventId: string; notified: number; texted: number };
