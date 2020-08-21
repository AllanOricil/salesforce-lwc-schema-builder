<template>
  <div>Date</div>
</template>

<script>
export default {
  model: {
    prop: 'field',
  },
  props: {
    field: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style></style>
