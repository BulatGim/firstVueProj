<template>
    <input
        :value="value"
        @input="updateInput"
        class="input"
        type="text">
</template>

<script>
export default {
  name: "my-input",
  props:{
    value: [String, Number]
  },
  methods:{
    updateInput(event){
      this.$emit('update:value', event.target.value)
    }
  }
}
</script>

<style scoped>
.input{
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  border: 2px solid#0c4128;
}
</style>