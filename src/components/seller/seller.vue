<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}份</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <span class="content">{{seller.minPrice}}</span>元
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <span class="content">{{seller.deliveryPrice}}</span>元
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <span class="content">{{seller.deliveryTime}}</span>分钟
          </li>
        </ul>
        <div class="favorite">
          <span class="iconfont icon-favorite" :class="{'active':favorite}" @click="toggleFavorite"></span>
          <span class="text">{{favoeriteText}}</span>
        </div>
      </div>
      <split></split>

      <div class="bulletin">
        <h1 class="title ">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content ">{{seller.bulletin}}</p>
        </div>
        <!-- 公告消息 -->
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>

      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="240px" height="180px" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>

      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <div class="info-wrapper">
          <ul>
            <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  import star from '../../components/star/star.vue';
  import split from '../../components/split/split.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoeriteText() {
        return this.favorite ? '已收藏' : '未收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          console.log('watch');
          this._initPics();
          this._initScroll();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        console.log('mounted');
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        console.log('sss000s');
        console.log(this.scroll);
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
//        console.log(this.seller.pics.length);
//        console.log('7777777');
        if (this.seller.pics) {
          let picWidth = 240;
          let margin = 12;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .seller
    .seller-content
      .overview
        position: relative
        margin: 36px
        .title
          margin-bottom: 16px
          line-height: 28px
          font-size: 28px
          color: rgb(7, 17, 27)
        .desc
          border-1px(rgba(7, 17, 27, 0.1))
          .star, .text
            display: inline-block
            vertical-align: top
            line-height: 36px
          .star
            margin-right: 16px
          .text
            margin-right: 24px
            font-size: 20px
            color: rgb(77, 85, 93)
        .remark
          display: flex
          margin-top: 36px
          .block
            flex: 1
            text-align: center
            border-right: 1px solid rgba(7, 17, 27, 0.1)
            &:last-child
              border-right: none
            h2
              margin-bottom: 8px
              line-height: 20px
              font-size: 20px
              color: rgb(147, 153, 159)
            .content
              line-height: 48px
              font-size: 48px
              font-weight: 200
              color: rgb(7, 17, 27)
        .favorite
          position: absolute
          right: 0
          top: 0
          width: 80px
          text-align: center
          .icon-favorite
            display: block
            margin-bottom: 8px
            line-height: 48px
            font-size: 48px
            color: #d4d6d9
            &.active
              color: rgb(240, 20, 0)
          .text
            /*display: block*/
            line-height: 20px
            font-size: 20px
            color: rgb(77, 85, 93)

      .bulletin
        margin: 0 36px
        .title
          margin: 36px 0 16px
          line-height: 28px
          font-size: 28px
          color: rgb(7, 17, 27)
        .content-wrapper
          padding: 0 24px
          border-1px(rgba(7, 17, 27, 0.1))
          .content
            line-height: 48px
            font-size: 24px
            font-weight: 200
            color: rgb(240, 20, 0)
        .supports
          .support-item
            padding: 32px 24px
            border-1px(rgba(7, 17, 27, 0.1))
            .icon
              display: inline-block
              width: 32px
              height: 32px
              vertical-align: top
              margin-right: 12px
              background-size: 32px 32px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_4')
              &.discount
                bg-image('discount_4')
              &.guarantee
                bg-image('guarantee_4')
              &.invoice
                bg-image('invoice_4')
              &.special
                bg-image('special_4')
            .text
              line-height: 32px
              font-size: 24px
              color: rgb(7, 17, 27)
      .pics
        padding: 36px
        .title
          margin-bottom: 24px
          line-height: 28px
          font-size: 28px
          color: rgb(7, 17, 27)
        .pics-wrapper
          width: 100%
          overflow: hidden
          white-space: nowrap
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 12px
              width: 240px
              height: 180px
              &:last-child
                margin: 0
      .info
        margin: 0 36px
        .title
          padding: 36px 0 24px
          line-height: 28px
          font-size: 28px
          color: rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
        .info-wrapper
          .info-item
            padding: 32px 24px
            line-height: 32px
            font-size: 24px
            color: rgb(7, 17, 27)
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border: none


</style>
