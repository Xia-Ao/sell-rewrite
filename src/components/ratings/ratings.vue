<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>

        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>

        </div>
      </div>
      <split></split>
      <ratingSelect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
                    :ratings="ratings"></ratingSelect>

      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
            <div class="avatar">
              <img :src="rating.avatar" alt="" height="56" width="56">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="iconfont icon-good-1"></span>
                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  import ratingSelect from '../../components/ratingSelect/ratingSelect.vue';

  const ALL = 2;
  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('static/data.json').then((response) => {
        let ratingsData = response.body.ratings;
//        if (response.errno === ERR_OK) {
          this.ratings = ratingsData;
//          console.log(this.ratings);

//        better-scroll 滚动
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
//        }
      });
    },
    methods: {
      selectRating(type) {
        this.selectType = type;
        console.log(this.selectType);
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        console.log('____');
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },

      // 判断是否有内容是否显示，和显示内容的属性type是满意，不满意，或者全部
      needShow(type, text) {
//          console.log(type,this.onlyContent);
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          console.log('+++' + this.selectType);
          return type === this.selectType;
        }
      }
    },
    components: {
      star,
      split,
      ratingSelect
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top: 352px
    bottom: 0
    width: 100%
    left: 0
    overflow: hidden
    .overview
      display: flex
      padding: 36px 0
      .overview-left
        flex: 0 0 275px
        width: 275px
        padding-bottom: 12px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 240px
          width: 120px

        .score
          margin-bottom: 12px
          line-height: 56px
          font-size: 48px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 16px
          line-height: 24px
          font-size: 24px
          color: rgb(7, 17, 27)
        .rank
          line-height: 20px
          font-size: 20px
          color: rgb(147, 153, 159)

      .overview-right
        flex: 1
        padding-left: 36px
        padding-bottom: 12px
        @media only screen and (max-width: 320px)
          padding-left: 24px
        .score-wrapper
          /*line-height: 36px*/
          margin-bottom: 16px
          font-size: 0
          .title
            margin-right: 24px
            line-height: 36px
            vertical-align: top
            font-size: 24px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin-right: 24px
            vertical-align: top
            line-height: 36px
          .score
            display: inline-block
            line-height: 36px
            vertical-align: top
            font-size: 24px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            margin-right: 24px
            line-height: 36px
            vertical-align: top
            font-size: 24px
            color: rgb(7, 17, 27)
          .delivery
            line-height: 36px
            font-size: 24px
            color: rgb(147, 153, 159)

    .rating-wrapper
      padding: 0 36px
      .rating-item
        display: flex
        padding: 36px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 56px
          margin-right: 24px
          width: 56px
          /*height: 56px*/
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 8px
            line-height: 24px
            font-size: 20px
            color: rgb(7, 17, 27)
          .star-wrapper
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 32px
              line-height: 24px
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 24px
          .text
            margin-bottom: 16px
            line-height: 36px
            font-size: 24px
            color: rgb(7, 17, 27)
          .recommend
            line-height: 32px
            .icon-good-1, .recommend-item
              display: inline-block
              margin-right: 16px
              font-size: 18px
            .icon-good-1
              line-height: 24px
              font-size: 32px
              color: rgb(0, 160, 220)
            .recommend-item
              padding: 0 12px
              line-height: 32px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              background: #fff
              color: rgb(147, 153, 159)


</style>
