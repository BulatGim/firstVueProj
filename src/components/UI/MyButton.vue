<template>
    <button class="myButton"><slot></slot></button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.myButton{
  margin-top: 10px;
  align-self: end;
  padding: 10px;
  border: none;
  background-color: #0dcaf0;
  font-size: 16px;
  border-radius: 10px;
}
</style>