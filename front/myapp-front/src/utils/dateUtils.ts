import { TaskObject, TasksDividedByDate } from "../shared/task/interfaces";

// This function is used to parse the dates we get from the Calendar
export function parseDate() {
  const dateOptions = {
    month: "long" as const,
    day: "numeric" as const,
    year: "numeric" as const,
  };

  const myDate = new Date();
  return myDate.toLocaleDateString("en-EN", dateOptions);
}

// This function is used to filter the dates we get from the Calendar
export function filterDates(
  reference: Date | [Date, Date] | [Date],
  dateStr: string
): boolean {
  const referenceStart = Array.isArray(reference) ? reference[0] : reference;
  const referenceEnd = Array.isArray(reference)
    ? reference[1] || reference[0] // we set the second part of the dateRange to the first date if there is no second date
    : reference;

  const startOfDay = new Date(
    referenceStart.getFullYear(),
    referenceStart.getMonth(),
    referenceStart.getDate()
  );

  // We set the end of day to 23:59:59.999 to include all the times of the last day in the date range.
  const endOfDay = new Date(
    referenceEnd.getFullYear(),
    referenceEnd.getMonth(),
    referenceEnd.getDate(),
    23,
    59,
    59,
    999
  );

  const date = new Date(dateStr);
  return date >= startOfDay && date <= endOfDay;
}

// For the Group context. We divide the tasks by date
export function divideTasksByDate(tasks: TaskObject[]): TasksDividedByDate {
  const today = new Date().toISOString().split("T")[0];
  const past: TaskObject[] = [];
  const upcoming: TaskObject[] = [];
  const todayTasks: TaskObject[] = [];

  tasks.forEach((t) => {
    if (t.task.due_date < today) {
      past.push(t);
    } else if (t.task.due_date > today) {
      upcoming.push(t);
    } else {
      todayTasks.push(t);
    }
  });

  return { past, upcoming, today: todayTasks };
}
