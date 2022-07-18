import axios from "axios";

export const postModule = {
    state: ()=> {
        return {
            posts:[],
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
    getters:{
        sortedPosts(state){
            return [...state.posts].sort((post1,post2)=> post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters){
            return getters.sortedPosts.filter(post=>post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations:{
        setPosts(state, posts){
            state.posts = posts
        },
        setModificator(state, modificator){
            state.modificatorValue = modificator
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages
        },
        setPage(state, page){
            state.page = page
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        },

    },
    actions:{
        async fetchPosts({state, commit}){
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts",{
                    params:{
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts' , response.data)
            }catch (e) {
                alert(e)
            }
        },
        async loadMore({state, commit}){
            try {
                commit('setPage', state.page+1)
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts",{
                    params:{
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts' , [...state.posts, ...response.data])
            }catch (e) {
                alert(e)
            }
        },
    },
    namespaced: true
}