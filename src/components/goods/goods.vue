<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item ,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li  v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" class="food-item border-1px" v-for="food in item.foods">
                <div class="icon">
                  <img :src="food.icon" width="114px" height="114px">
                </div>
                <div class="content">
                  <h2 class="food-name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span class="">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span
                    class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartControl-wrapper">
                    <cartControl @add="addFood" :food="food"></cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopCart>
    </div>
    <transition name="foodDetail">
      <food :food="selectedFood" ref="food" @add="addFood" ></food>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopCart from '../../components/shopCart/shopCart.vue';
  import cartControl from 'components/cartControl/cartControl.vue';
  import food from 'components/food/food.vue';

  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        foodScroll: {},
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      // GET /someUrl
      this.$http.get('/api/goods').then(response => {
        // success callback
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods);
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }, response => {
        // error callback
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
//        console.log(this.selectedFood);
      },

      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },

      // 滚动
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      shopCart,
      cartControl,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  $text-color1 = rgb(147, 153, 159)

  .goods
    display: flex
    position absolute
    top: 352px
    bottom: 114px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 160px
      width: 160px
      background: #f3f5f7
      .menu-item
        display: table
        height: 108px
        width: 112px
        padding: 0 24px
        background: #f3f5f7
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          .text
            font-weight: 600
            border-none()
        .text
          display: table-cell
          font-size: 24px
          font-weight: 200
          line-height: 28px
          vertical-align: middle
          /*color: $text-color1*/
          border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display: inline-block
          width: 24px
          height: 24px
          background-size: 24px 24px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
    .foods-wrapper
      flex: 1
      .title
        padding-left: 28px
        height: 52px
        font-size: 24px
        line-height: 56px
        border-left: 4px solid #d9dde1
        color: rgb(157, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 36px
        padding-bottom: 36px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 114px
          margin-right: 20px
        .content
          flex: 1
          .food-name
            margin: 4px 0 16px 0
            font-size: 28px
            /*height: 28px*/
            line-height: 28px
            color: rgb(7, 17, 27)
          .desc, .extra
            font-size: 20px
            line-height: 20px
            color: $text-color1
          .desc
            margin-bottom: 16px
          .extra
            .count
              margin-right: 24px
          .price
            display: inline-block
            line-height: 48px
            font-weight: 700
            .now
              font-size: 28px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 20px
              color: $text-color1
          .cartControl-wrapper
            position: absolute
            right: 0
            bottom: 24px

</style>
