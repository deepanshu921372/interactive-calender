export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  text: string;
  dateRange: DateRange | null;
  createdAt: Date;
}
