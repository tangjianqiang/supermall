export const itemListerMixin = {
  data(){
    return{
      isBackShow:false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.backTop(0,0,500)
    }
  }
}
