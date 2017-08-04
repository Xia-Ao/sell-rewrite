<template>
  <div>
    <transition name="move">
      <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
          <div class="img-header">
            <img :src="food.image" alt="">
            <div class="back" @click="hide">
              <i class="iconfont icon-back"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartControl-wrapper" v-show="food.count">
              <cartControl :food="food"></cartControl>
            </div>
            <transition name="fade">
              <div @click.stop.prevent="addFirst" v-show="!food.count || food.count===0" class="buy">加入购物车</div>
            </transition>
          </div>

          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingSelect @select="selectRating" @toggle="toggleContent"
                          :selectType="selectType" :onlyContent="onlyContent"
                          :desc="desc" :ratings="food.ratings"></ratingSelect>
          </div>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="24" height="24" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span class="iconfont"
                        :class="{'icon-good-1': rating.rateType===0, 'icon-bad_right':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </transition>
  </div>


</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date';
  import cartControl from 'components/cartControl/cartControl.vue';
  import split from 'components/split/split';
  import ratingSelect from 'components/ratingSelect/ratingSelect.vue';

  const ALL = 2;
  //  const POSITIVE = 1;
  //  const NEGATIVE = 0;

  export default{
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
//        console.log(this.food);
        // 在执行show函数的时候计算元素高度
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
//        console.log(event._constructed);
        // 如果不存在这个属性,则不执行下面的函数
        if (!event._constructed) {
          return;
        }
        console.log(event.target);
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartControl,
      split,
      ratingSelect
    }
  };


</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    top: 0
    left: 0
    bottom: 96px
    width: 100%
    /*height: 100%*/
    z-index: 30
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .img-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 32px
        left: 32px
        .icon-back
          display: block
          line-height: 48px
          font-size: 32px
          color: rgba(255, 255, 255, 0.8)
    .content
      position: relative
      padding: 36px
      .title
        line-height: 28px
        margin-bottom: 16px
        font-size: 28px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 36px
        line-height: 20px
        height: 20px
        font-size: 0
        .sell-count, .rating
          font-size: 20px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 24px
      .price
        display: inline-block
        line-height: 48px
        font-weight: 700
        .now
          margin-right: 16px
          font-size: 28px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 20px
          color: rgb(147, 153, 159)
      .cartControl-wrapper
        position: absolute
        right: 24px
        bottom: 24px
      .buy
        position: absolute
        right: 36px
        bottom: 36px
        z-index: 10
        height: 48px
        padding: 12px 24px
        line-height: 24px
        box-sizing: border-box
        border-radius: 24px
        font-size: 20px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave
          opacity: 0
          z-index: -1
    .info
      margin: 36px
      .title
        line-height: 28px
        margin-bottom: 12px
        font-size: 28px
        font-weight: normal
        color: rgb(7, 17, 27)
      .text
        padding: 0 16px
        line-height: 48px
        font-size: 24px
        font-weight: 200
        color: rgb(77, 85, 93)
    .rating
      padding-top: 36px
      .title
        line-height: 28px
        margin-left: 36px
        font-size: 28px
        color: rgb(7, 17, 27)
    .rating-wrapper
      padding: 0 36px
      .rating-item
        position: relative
        padding: 32px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position: absolute
          right: 0
          top: 32px
          line-height: 24px
          font-size: 0
          .name
            display: inline-block
            vertical-align: top
            margin-right: 12px
            font-size: 20px
            color: rgb(147, 153, 159)
          .avatar
            border-radius: 2px
        .time
          line-height: 24px
          margin-bottom: 12px
          font-size: 20px
          color: rgb(147, 153, 159)
        .text
          line-height: 32px
          font-size: 24px
          color: rgb(7, 17, 27)
          .icon-good-1, .icon-bad_right
            margin-right: 8px
            line-height: 48px
            font-size: 24px
          .icon-good-1
            color: rgb(0, 160, 220)
          .icon-bad_right
            color: rgb(147, 153, 159)
      .no-rating
        padding: 32px 0
        font-size: 24px
        color: rgb(147, 153, 159)
</style>
