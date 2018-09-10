<template>
  <div class="room">
    <h1>A Room</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Room',
  created() {
    this.setupPlayer();
    this.connectPlayer();
  },
  methods: {
    ...mapActions([
      'setupPlayer',
      'connectPlayer',
    ]),
  },
};
</script>
