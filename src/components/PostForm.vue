<!--          v-model="post.title"-->
<template>
  <div>
    <form class="form" @submit.prevent>
      <h4>Создание поста</h4>
      <my-input
          v-focus
          v-model:value="post.title"
          type="text"
          placeholder="Название"/>
      <my-input
          v-model:value="post.body"
          type="text"
          placeholder="Описание"/>
      <my-button @click="createNewPost">
        Создать
      </my-button>
    </form>
  </div>
</template>

<script>
import MyInput from "@/components/UI/myInput";
export default {
  components: {MyInput},
  data(){
    return{
      post:{
        title: "",
        body: "",
      }
    }
  },
  methods:{
    createNewPost(){
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: "",
        body: "",
      }
    }
  }
}
</script>

<style scoped>


.form{
  display: flex;
  flex-direction: column;
}
</style>