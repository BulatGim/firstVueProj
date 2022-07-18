export default {
    props:{
        show:{
            type: Boolean,
            default: false
        }
    },
    data(){

    },
    methods:{
        hideModal(){
            this.$emit('update:show', false)
            /*this.show?(this.show=false):(this.show=true)*/
        }
    },
    mounted(){

    }
}