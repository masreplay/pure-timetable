<template>
  <div class="table-responsive">
    <table class="table-bordered rounded">
      <thead>
        <tr class="bottom-bordered">
          <th
            style="border-top: 0px !important; border-right: 0px !important"
          ></th>
          <th
            v-for="period in schedule.periods"
            :key="period.id"
            scope="col"
            style="border-top: 0px !important"
          >
            {{ formatPeriod(period.start_time) }} -
            {{ formatPeriod(period.end_time) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in schedule.days" :key="day.id">
          <td
            class="td-width bordered"
            width="12.5%"
            style="border-right: 0px !important"
          >
            <h2>{{ day.name }}</h2>
          </td>
          <td
            v-for="period in schedule.periods"
            :key="period.id"
            width="12.5%"
            class="td-width"
          >
            <TimetableCard
              :card="getCard(period.id, day.id)"
              :period="period"
              :day="day"
              @clicked="onCardClick"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  DaySchedule,
  PeriodSchedule,
  CardScheduleDetails as CardSchedule,
  ScheduleDetails,
} from "@/types";
import Vue, { PropType } from "vue";
import TimetableCard from "./timetable-card.vue";

interface TimetableData {
  selectedCard: CardSchedule | null;
  selectedDay: DaySchedule | null;
  selectedPeriod: PeriodSchedule | null;
}

export default Vue.extend({
  name: "PureTimetable",
  components: { TimetableCard },
  data(): TimetableData {
    return {
      selectedCard: null,
      selectedDay: null,
      selectedPeriod: null,
    };
  },
  methods: {
    getCard(period_id: string, day_id: string): CardSchedule | undefined {
      for (let card of this.schedule.cards) {
        if (card.period_id === period_id && card.day_id === day_id) return card;
      }
    },
    onCardClick(
      card: CardSchedule,
      day: DaySchedule,
      period: PeriodSchedule
    ): void {
      this.$emit("onCardClick", card, day, period);
      this.selectedCard = card;
      this.selectedDay = day;
      this.selectedPeriod = period;
    },
    formatPeriod(value: string): string {
      const parts = value.split(":");
      return parts[0] + ":" + parts[1];
    },
  },
  props: {
    schedule: {
      type: Object as PropType<ScheduleDetails>,
      required: true,
    },
  },
});
</script>
<style>
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-bordered {
  width: 100%;
  max-width: 100%;
  border: 1px solid #ddd !important;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 0px;
}

.table-bordered > :not(caption):not(.bottom-bordered) > * > * {
  padding: 0.5rem 0.5rem;
  border-top: 1px solid #ddd !important;
  border-right: 1px solid #ddd !important;
  border-left: 1px solid #ddd !important;
}

.bottom-bordered {
  border-top: 0px !important;
}

tr {
  border-width: 0 1px;
  border: 1px solid #ddd !important;
  line-height: 20px;
  min-height: 20px;
  height: 20px;
}

tr td {
  padding: 0 !important;
  margin: 0 !important;
  text-align: center;
}
td {
  height: 110px;
}

@media (max-width: 900px) {
  .td-width {
    min-width: 150px !important;
  }
}
</style>