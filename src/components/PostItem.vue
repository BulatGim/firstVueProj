<template>
  <div class="post">
    <div>
      <div>{{post.id}} </div>
      <div><strong>Название:</strong>{{post.title}}</div>
      <div><strong>Название:</strong>{{post.body}}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push('/posts/'+post.id)">Открыть пост</my-button>
      <my-button @click="$emit('remove', post)">Удалить пост</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
  post:{
    type: Object,
    required: true,
  }
}
}
</script>

<style scoped>
.post{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid#0c4128;
  margin-top: 15px;

}
</style>