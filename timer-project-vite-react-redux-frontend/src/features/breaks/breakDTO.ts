export interface Break {
  id: string;
  breakNumber: number;
  breakDuration: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface BreaksForTimer {
  id: string;
  breaks: Break[];
}
