<template>
  <div
    @click="clicked"
    class="d-flex flex-column card-div justify-content-between"
    v-if="card != null"
    :style="{
      'background-color': card.lesson.teacher.color || '#ffffff',
      'outline-color': `${increase_brightness(
        card.lesson.teacher.color,
        50
      )} !important`,
    }"
  >
    <div class="pt-2">{{ card.lesson.subject.name }}</div>
    <div v-if="card.lesson.room_id != null">
      <b>
        {{ card.lesson.room.name }}
      </b>
    </div>

    <div v-if="card.lesson.teacher_id != null" class="pb-2">
      {{ card.lesson.teacher.name }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import {
  DaySchedule,
  PeriodSchedule,
  CardScheduleDetails as CardSchedule,
} from "@/types";
export default Vue.extend({
  name: "TimetableCard",
  props: {
    card: {
      type: Object as PropType<CardSchedule>,
    },
    period: {
      type: Object as PropType<PeriodSchedule>,
    },
    day: {
      type: Object as PropType<DaySchedule>,
    },
  },
  methods: {
    clicked() {
      this.$emit("clicked", this.card, this.day, this.period);
    },
    increase_brightness(hex: string, percent: number): string {
      // strip the leading # if it's there
      hex = hex.replace(/^\s*#|\s*$/g, "");

      // convert 3 char codes --> 6, e.g. E0F --> EE00FF
      if (hex.length == 3) {
        hex = hex.replace(/(.)/g, "$1$1");
      }

      const r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

      return (
        "#" +
        (0 | ((1 << 8) + r + ((256 - r) * percent) / 100))
          .toString(16)
          .substr(1) +
        (0 | ((1 << 8) + g + ((256 - g) * percent) / 100))
          .toString(16)
          .substr(1) +
        (0 | ((1 << 8) + b + ((256 - b) * percent) / 100))
          .toString(16)
          .substr(1)
      );
    },
  },
});
</script>
<style>
.card-div {
  height: 100%;
  cursor: pointer;
}
.card-div:hover {
  height: 100%;
  outline: 10px solid !important;
  border-radius: 4px;
}

.justify-content-between {
  justify-content: space-between !important;
}
</style>