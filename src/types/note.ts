export interface NoteTag {
  value: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  label: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt: string;
  updatedAt: string;
}
