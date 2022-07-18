<template>
  <div >
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model:value="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app__btns">

      <my-button @click="showDialog">Создать пользователя</my-button>
      <my-select
          v-model="selectedSort"
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
    <div v-intersection="loadMore" ref="observer" class="observer">

    </div>
    <!--    <div class="addLimit">
          <my-button class="addLimit__btn" @click="addLimit">Показать еще</my-button>
        </div>-->

    <!--    <div class="page__wrapper">
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
      posts:[],
      isDialogVisible: false,
      modificatorValue:"",
      selectedSort:"",
      sortOptions:[
        {value: 'title', name: "По названию"},
        {value: 'body', name: "По описанию"},
      ],
      searchQuery:"",
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  },
  methods: {
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
    async fetchPosts(){
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts",{
          params:{
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
      }catch (e) {
        alert(e)
      }
    },
    async loadMore(){
      try {
        this.page+=1;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts",{
          params:{
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data];
      }catch (e) {
        alert(e)
      }
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
    sortedPosts(newValue){
      return [...this.posts].sort((post1,post2)=> post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post=>post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
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