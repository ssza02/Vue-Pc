<template>
  <div class="home">
    <header>
        
    </header>
    <body>
        <div class="inin">精益看板</div>
    </body>
    <footer>
      
    </footer>
  </div>
</template>

<script>
  //import modal from 'components/modal.vue'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import Lib from "../assets/js/Lib";
  export default {
    components: {
      //modal
    },
    computed:{
      ...mapState(['loginInfo']),
    },
    watch:{

    },
    filters:{

    },
    data () {
      return {
        // logoImg: logo,
      }
    },
    created () {
      Lib.M.baseFn();
    },
    mounted() {
      Lib.M.baseDomFn();
      
    },
    methods: {
      ...mapMutations(['saveStorage_loginInfo']),
      getApi(){
        this.$http({
            url:this.$apis.test,
            method:'post',
            data:obj
        }).then(res => {
            
        });
      }
    }
  }
</script>

<style lang="less">
@import "../assets/css/m_base.less";
  .inin{
      width: 1rem;
      height: 1rem;
  }
</style>
