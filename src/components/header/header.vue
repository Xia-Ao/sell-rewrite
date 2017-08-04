<template>
  <div class='header'>
    <!--内容头-->
    <div class="content-wrapper">
      <!--头像-->
      <div class="avatar">
        <img width="128px" height="128px" :src="seller.avatar" alt="">
      </div>
      <!--内容-->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">
             {{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <!--优惠支持-->
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <!--公告栏-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-right"></i>
    </div>

    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>

    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icon-close3"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      star
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .header
    position: relative
    overflow: hidden
    /*background: #999*/
    background: rgba(7, 17, 27, 0.5)
    color: #fff
    .content-wrapper
      position: relative
      padding: 48px 24px 36px 48px
      font-size: 0
      .avatar
        display: inline-block
        img
          -webkit-border-radius: 4px
          -moz-border-radius: 4px
          border-radius: 4px
      .content
        display: inline-block
        margin-left: 32px
        color: #ffffff
        .title
          .brand
            display: inline-block
            vertical-align: top
            width: 60px
            height: 36px
            bg-image('brand')
            background-size: 60px 36px
            background-repeat: no-repeat
          .name
            margin-left: 12px
            font-size: 32px
            line-height: 36px
            font-weight: bold
        .description
          margin-top: 16px
          /*font-size: 12px*/
          /*line-height 12px*/
          /*font-weight: 200*/
          font: 200 24px / 24px "微软雅黑"
        .support
          margin-top: 20px
          font-size: 20px
          line-height 24px
          font-weight: 200
          .icon
            display: inline-block
            vertical-align: top
            width: 24px
            height: 24px
            background-size: 24px 24px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text {
            font-size: 20px
            line-height: 24px
            font-weight: 200
          }

      .support-count
        position: absolute
        right: 28px
        bottom: 30px
        padding: 0 16px
        height: 48px
        line-height: 48px
        border-radius: 28px
        background-color: rgba(0, 0, 0, 0.2)
        text-align: center
        color: rgba(255, 255, 255, 1)
        .count
          vertical-align: top
          font-size: 20px
          /*line-height: 24px*/
          font-weight: 200
        .icon-right
          margin-left: 4px
    .bulletin-wrapper
      position: relative
      height: 56px
      line-height: 56px
      padding: 0 44px 0 24px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(1, 17, 27, 0.2) no-repeat
      background-size: 44px 24px
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 14px
        width: 44px
        height: 24px
        bg-image('bulletin')
      .bulletin-text
        vertical-align: top
        margin: 0 8px
        font-size: 20px
      .icon-right
        position: absolute
        font-size: 10px
        right: 24px
    .background
      position: absolute
      top: 0
      bottom: 0
      height: 100%
      width: 100%
      z-index: -1
      filter: blur(10px)

    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      opacity: 1
      /*filter: blur(10px)*/
      /*transition: all 0.5s*/
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      /*&.fade-transition
        background: rgba(7, 17, 27, 0.8) !important
        opacity: 1*/
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 128px
          padding-bottom: 128px
          font-size 40px
          .name
            font-size: 32px
            text-align: center
            font-weight: 700
            line-height: 32px
          .star-wrapper
            margin-top: 36px
            padding: 4px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 56px auto 48px auto
            .line
              flex: 1
              position relative
              top: -12px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 24px
              font-weight 700
              font-size: 28px
          .supports
            margin: 0 auto
            width: 80%
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &.last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 32px
                height: 32px
                vertical-align: top
                margin-right: 12px
                background-size: 32px 32px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size: 24px
                font-weight: 200
                line-height 32px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              font-size: 24px
              font-weight: 200
              line-height: 48px

  .detail-close
    position: relative
    z-index: 101
    width: 64px
    height: 64px
    margin: -128px auto 0 auto
    font-size: 64px
    color: rgba(255, 255, 255, 0.5)
    clear: both
    .icon-close3
      font-size: 64px
</style>
