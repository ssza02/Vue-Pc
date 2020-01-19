<!-- 首页 -->
<template>
  <div class="home">
    <header>
        
    </header>
    <body>
        <div class="inin">PC端脚手架</div>
    </body>
    <footer></footer>
  </div>
</template>

<script>
  //import modal from 'components/modal.vue'
  
  export default {
    mixins: [$mixin],
    components: {
      //modal
    },
    mounted() {
      this.$utils.M.baseDomFn();
      this.set_user_info();
    },
    data () {
      return {
        // logoImg: logo,
      }
    },
    created () {
      this.$utils.M.baseFn();
    },
    methods: {

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
