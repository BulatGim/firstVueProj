<template>
  <div v-if="posts.length> 0">
    <h3>Список пользователей</h3>
    <transition-group name="post-list">
    <post-item
        :post="post"
        v-for="post in posts"
        :key="post.id"
        @remove="$emit('remove', post)"
    />
    </transition-group>
  </div>
  <h2 v-else>
    Список постов пуст
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {PostItem},
  props:{
    posts:{
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>