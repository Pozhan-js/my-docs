<template>
  <div class="index-container" :class="{ showNav }">
    <div v-swiper:mySwiper="swiperOption" class="swiper-container">
      <div class="swiper-wrapper">
        <Home
          class="swiper-slide"
          @switchIndex="switchIndex"
          :navIndex.sync="currentIndex"
          :navList="navList" />
        <About class="swiper-slide" />
        <Skill class="swiper-slide" :active="currentIndex == 2" />
        <Work class="swiper-slide" />
        <Contact class="swiper-slide" :active="currentIndex == 4" />
      </div>
      <div class="swiper-pagination" @pointermove.stop></div>
    </div>
  </div>
</template>

<script>
import Contact from "../components/contact.vue";
import experience from "../components/about.vue";
import Work from "../components/work.vue";
export default {
  components: { experience, Contact, Work },
  name: "App",
  data() {
    const currentIndex = 0;
    return {
      showNav: false,
      navList: ["首页", "关于我", "技能", "作品集", "联系我"],
      currentIndex,
      swiperOption: {
        direction: "vertical",
        initialSlide: currentIndex,
        speed: 800,
        mousewheel: true,
        resistanceRatio: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: (i, className) => {
            return `<span class="${className}" data-title="${this.navList[i]}"></span>`;
          },
        },
        on: {
          slideChange: () => {
            this.currentIndex = this.mySwiper?.activeIndex;
            this.showNav = Boolean(this.currentIndex);
          },
        },
      },
    };
  },
  methods: {
    switchIndex([index, time = 0]) {
      this.mySwiper.slideTo(index, time);
    },
  },
};
</script>

<style lang="less">
@import "swiper/css/swiper.min.css";
.index-container {
  > .swiper-container {
    height: 100vh;
    min-height: 568px;
    .swiper-wrapper > .swiper-slide {
      width: 100vw;
      height: 100%;
      padding: 0 24px;
      background-repeat: no-repeat;
      background-color: #fff;
      overflow: hidden;
    }
    .swiper-pagination {
      z-index: 9;
      height: fit-content;
      display: flex;
      flex-direction: column;
      right: -32px;
      top: 0;
      bottom: 0;
      margin: auto;
      transform: none;
      transition: right 0.35s;
      .swiper-pagination-bullet {
        &:not(.swiper-pagination-bullet-active) {
          opacity: 0.5;
        }
        @color: #007aff;
        @size: 2em;
        position: relative;
        margin: 12px auto;
        cursor: pointer;
        background-color: transparent;
        width: @size;
        height: @size;
        transition: box-shadow 0.35s;
        &::after {
          position: absolute;
          content: attr(data-title);
          display: block;
          width: 5em;
          opacity: 0;
          height: fit-content;
          padding: 4px 5px;
          padding-bottom: 6px;
          border-radius: 2px;
          letter-spacing: 1px;
          top: 0;
          bottom: 0;
          right: 150%;
          margin: auto;
          font-weight: 600;
          font-size: 14px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.45);
          transition: opacity 0.35s, background-color 0.35s;
          pointer-events: none;
        }
        &::before {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          width: (@size / 1.5);
          height: (@size / 1.5);
          background-color: #fff;
          box-shadow: inset 0 -5px 0 6px @color;
          border-radius: 50%;
          transition: all 0.35s;
        }
        &:not(.swiper-pagination-bullet-active):hover {
          box-shadow: inset 0 0 0 4px @color;
          opacity: 0.8;
          &::before {
            opacity: 0.6;
          }
          &::after {
            opacity: 1;
          }
        }
        &.swiper-pagination-bullet-active {
          &::before {
            transform: scale3d(1.25, 1.25, 1);
            box-shadow: inset 0 0 0 1px @color;
          }
          &::after {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
  &.showNav > .swiper-container .swiper-pagination {
    right: 32px;
    transition: right 0.35s 0.35s;
  }

  @media screen and (max-width: 768px) {
    &.showNav > .swiper-container .swiper-pagination {
      right: 12px;
    }
  }
}
</style>
