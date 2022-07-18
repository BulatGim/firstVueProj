<template>
  <div class="modal" v-if="show" @click="hideModal">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: "my-modal",
  mixins:[
      toggleMixin
  ]
}
</script>

<style scoped>
.modal{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
}
.modal__content{
  padding: 10px 20px;
  margin: auto;
  background-color: whitesmoke;
  border-radius: 10px;
  min-height: 50px;
  min-width: 50px;
}
</style>