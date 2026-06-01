import { useSyncExternalStore } from "react";
import type { CoverKey, EventVisibility, PublishEventInput } from "../types";

type Draft = PublishEventInput;

const initial: Draft = {
  cover: "retreat" as CoverKey,
  title: "Sisterhood retreat",
  about: "Lake house weekend — bring a swimsuit, we'll handle dinner. Carpools leave the house at 6:30.",
  visibility: "chapter" as EventVisibility,
  points: 25,
  rsvp: true,
  plusOne: false,
  mandatory: false,
  tasks: [
    { label: "Sign liability waiver", required: true },
    { label: "Pay $35 retreat fee", required: true },
  ],
};

let state: Draft = initial;
const subs = new Set<() => void>();

function subscribe(fn: () => void) {
  subs.add(fn);
  return () => subs.delete(fn);
}

function emit() {
  for (const fn of subs) fn();
}

export function useCreateEvent() {
  const draft = useSyncExternalStore(subscribe, () => state, () => initial);
  function setDraft(next: Draft | ((prev: Draft) => Draft)) {
    state = typeof next === "function" ? (next as (p: Draft) => Draft)(state) : next;
    emit();
  }
  function reset() {
    state = initial;
    emit();
  }
  return { draft, setDraft, reset };
}
