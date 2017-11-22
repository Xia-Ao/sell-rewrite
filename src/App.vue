<template>
  <div>

    <v-header :seller="seller"></v-header>

    <div class="tab border-1px">
      <div class="tab-item">
        <!-- 使用 router-link 组件来导航.通过传入 `to` 属性指定链接. <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <!-- 路由出口 -->
      <router-view :seller="seller"></router-view>
    </div>

  </div>
</template>

<script>
  import {urlParse} from 'common/js/util';
  import header from './components/header/header.vue';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
              return queryParam.id;
          })()
        }
      };
    },
    created () {
      // GET /someUrl
      this.$http.get('static/data.json').then(response => {
        // success callback
//        response = response.body;
          let sellerData= response.body.seller;


//        if (response.errno === ERR_OK) {
//          this.seller = response.data;
          this.seller= Object.assign({}, sellerData);
          console.log(this.seller);
//        }
      }, response => {
        // error callback
      });
    },
    components: {
      'v-header': header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  .tab {
    display: flex
    width: 100%
    height: 80px
    line-height: 80px
    .tab-item {
      flex: 1
      text-align: center
    //border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      & > a {
        display: block
        font-size: 28px
        /*line-height: 28px*/
        color: rgba(77, 85, 93, 1)
        &.active {
          color: rgba(240, 20, 20, 1)
        }
      }
    }
  }
</style>
