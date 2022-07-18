<template>
  <div >
<!--    <h1>{{$store.state.likes}}</h1>
    <div>
      <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
      <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
    </div>-->
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:modal-value="setSearchQuery"
        placeholder="Поиск..."
    />
    <div class="app__btns">

      <my-button @click="showDialog">Создать пользователя</my-button>
      <my-select
          :model-value="selectedSort"
          @update:modal-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-modal v-model:show="isDialogVisible">
      <PostForm
          @create="createPost"
      />
    </my-modal>
    <PostsLists
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
    />
    <div v-intersection="loadMorePosts" ref="observer" class="observer">

 </div>
<!--        <div class="addLimit">
          <my-button class="addLimit__btn" @click="addLimit">Показать еще</my-button>
        </div>

        <div class="page__wrapper">
          <span
              class="page"
              v-for="page in totalPages"
              @click="changePage(page)"
              :class="{
                'current-page':page === this.page
              }"
          >
            {{page}}
          </span>
        </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsLists from "@/components/PostsLists";
import MyDialog from "@/components/UI/myModal";
import MyModal from "@/components/UI/myModal";
import MyButton from "@/components/UI/MyButton";
import axios from "axios"
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/myInput";
import {mapMutations, mapState, mapActions, mapGetters} from "vuex"
export default {
  components:{
    MyInput,
    MySelect,
    MyButton,
    MyModal,
    MyDialog,
    PostsLists, PostForm
  },
  data(){
    return{
      isDialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: "post/loadMore",
      fetchPosts: "post/fetchPosts",
    }),
    /*changePage(page){
      this.page = page;
    },*/
    createPost(post){
      this.posts.push(post)
      this.isDialogVisible = false;
    },
    removePost(post){
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog(){
      this.isDialogVisible = true;
    },

    /*addLimit(){
      this.limit+=10
    },*/
  },
  mounted() {
    this.fetchPosts();
    /*console.log(this.$refs.observer);*/
    /*let options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    let callback = (entries, observer)=> {
      if (entries[0].isIntersecting && this.page<this.totalPages){
        this.loadMore()
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)*/
  },
  computed:{
    ...mapState({
      posts: state => state.post.posts,
      modificatorValue: state => state.post.modificatorValue,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
    /*sortedPosts(newValue){
      return [...this.posts].sort((post1,post2)=> post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post=>post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }*/
  },
  watch:{
    /*limit(){
      this.fetchPosts()
    }*/
    /*page(){
      this.fetchPosts()
    }*/
    /*selectedSort(newValue){
       this.posts.sort((post1,post2)=>{
         return post1[newValue]?.localeCompare(post2[newValue])
       })
    }*/
  }
}

</script>

<style>

.app__btns{
  display: flex;
  justify-content: space-between;
}

/*.page__wrapper{
  margin: 20px auto;
  display: flex;
  justify-content: center;
}
.page{
  margin-left: 20px;
  border: 1px solid black;
  padding: 10px;
}
.page:first-child{
  margin-left: 0;
}
.current-page{
  border: 2px solid #0a53be;
}*/

.observer{
  height: 30px;
  background-color: grey;
}

</style>