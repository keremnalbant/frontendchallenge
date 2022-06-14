<script>
export default {
  data() {
    return {};
  },
  props: {
    loading: Number,
  },
  mounted() {},
};
</script>

<template>
  <h1 :class="{ 'is-loading': loading }">
    Loading...
    <slot />
  </h1>
</template>

<style scoped>
.is-loading {
  position: relative;
  margin-top: 20%;
  font-weight: 900;
}
</style>
