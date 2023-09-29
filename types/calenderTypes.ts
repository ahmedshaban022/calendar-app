export type event = {
  id: string;
  title: string;
  date: Date;
  description?: string;
  allDay: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  status: "ToDo" | "Completed";
};
