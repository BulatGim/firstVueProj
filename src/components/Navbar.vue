<template>
  <div class="navbar">
    <div class="vueCourse">
      Vue course
    </div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')">О сайте</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {MyButton}
}
</script>

<style scoped>
.navbar{
  height: 50px;
  background-color: teal;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
}
.navbar__btns{

}

</style>