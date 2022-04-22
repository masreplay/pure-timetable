<script lang="ts">
import Vue from "vue";
import PureTimetable from "@/pure-timetable.vue";

export default Vue.extend({
  name: "ServeDev",
  data() {
    return {
      schedule: {},
    };
  },
  components: {
    PureTimetable,
  },
});
</script>

<template>
  <div id="app">
    <pure-timetable :schedule="schedule" />
  </div>
</template>
 