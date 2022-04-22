<script lang="ts">
import Vue from 'vue';
import PureTimetable from '@/pure-timetable.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    PureTimetable
  }
});
</script>

<template>
  <div id="app">
    <pure-timetable />
  </div>
</template>
