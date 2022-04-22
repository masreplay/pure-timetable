import Vue from "vue";
import { DaySchedule, PeriodSchedule, CardScheduleDetails as CardSchedule } from "./types";
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    clicked(): void;
    increase_brightness(hex: string, percent: number): string;
}, unknown, {
    card: CardSchedule;
    period: PeriodSchedule;
    day: DaySchedule;
}>;
export default _default;
