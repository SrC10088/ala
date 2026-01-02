export interface Task {
  id: number;
  title: string;
  originalText: string;
  startTime: string | null;
  priority: string;
  status: string;
  createdAt: string;
}
