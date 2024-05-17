<template>
  <div>
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script>
export default {
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.$emit("file-uploaded", file);
    },
  },
};
</script>

<style scoped>
/* Add any required styles */
</style>
