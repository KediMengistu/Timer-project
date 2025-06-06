export interface CreateTimerDTO {
  title: string;
  durationHours: number;
  durationMinutes: number;
  durationSeconds: number;
  breakDuration: number;
}

export interface TimeDuration {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeDurationDTO {
  id: string;
  timeDuration: TimeDuration | null;
}

export interface Timer {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  delayedEndTime: string | null;
  durationHours: number;
  durationMinutes: number;
  durationSeconds: number;
  pausedDurationInMs: number;
  breakDuration: number;
  numberOfBreaks: number;
  pauseTime: string | null;
  unpausedTime: string | null;
  createdAt: string;
  updatedAt: string;
  referenceTime: TimeDuration | null;
}
