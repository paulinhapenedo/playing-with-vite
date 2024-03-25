import { addDays, addYears } from "date-fns";

export const TODAY = new Date();
export const FIVE_DAYS_FROM_TODAY = addDays(TODAY, 5);
export const CALENDAR_LIMIT = addYears(TODAY, 2);
