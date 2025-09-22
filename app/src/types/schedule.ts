export type ScheduleStatus = 'available' | 'checked-in';

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  type: string;
  status: ScheduleStatus;
}