<template>
  <div>Master Detail</div>
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
