import { DaySchedule, PeriodSchedule, CardScheduleDetails as CardSchedule, ScheduleDetails } from "./types";
import Vue from "vue";
interface TimetableData {
    selectedCard: CardSchedule | null;
    selectedDay: DaySchedule | null;
    selectedPeriod: PeriodSchedule | null;
}
declare const _default: import("vue/types/vue").ExtendedVue<Vue, TimetableData, {
    getCard(period_id: string, day_id: string): CardSchedule | undefined;
    onCardClick(card: CardSchedule, day: DaySchedule, period: PeriodSchedule): void;
    formatPeriod(value: string): string;
}, unknown, {
    schedule: ScheduleDetails;
}>;
export default _default;
