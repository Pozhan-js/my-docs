<template>
  <div class="work-container">
    <main class="flex-center-evenly h-full gap-8">
      <aside @pointermove.stop class="decorate" left>
        <div
          v-swiper:mySwiper="swiperOption"
          class="swiper-container work-swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide bg-cover"
              v-for="(work, index) in works"
              :style="work.background"
              :key="index"></div>
          </div>
          <button class="work-swiper-prev">
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
              <path
                d="M11.745 16.5L17.115 11.115L15 9L6 18L15 27L17.115 24.885L11.745 19.5H30V16.5H11.745Z"
                fill="white" />
            </svg>
          </button>
          <button class="work-swiper-next">
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
              <path
                d="M24.255 19.5L18.885 24.885L21 27L30 18L21 9L18.885 11.115L24.255 16.5H6V19.5H24.255Z"
                fill="white" />
            </svg>
          </button>
        </div>
      </aside>
      <div class="showreel relative flex flex-col" @touchmove.stop>
        <h2>作品集</h2>
        <div class="flex-1 relative">
          <div
            class="showreel-wrap h-full w-full absolute flex flex-col"
            v-for="(work, index) in works"
            :key="index"
            :class="{ active: index == currentIndex }">
            <div
              class="showreel-title flex-center-between overflow-hidden flex-shrink-0">
              <span>{{ work.name }}</span>
              <div class="showreel-note text-sm">
                <span>开发日期: {{ work.date }}</span>
                <span
                  class="text-[#436eff] cursor-pointer"
                  @click="handelClickView(work)">
                  项目预览
                </span>
              </div>
            </div>
            <div class="showreel-content-wrap overflow-y-auto h-full mb-6">
              <div class="showreel-content" v-html="work.content"></div>
            </div>
          </div>
        </div>
        <div id="work-swiper-pagination"></div>
      </div>
    </main>
  </div>
</template>

<script>
import { getWorkData } from "@/mocks/index";
export default {
  name: "Work",
  data() {
    return {
      currentIndex: 0,
      swiperOption: {
        allowTouchMove: false,
        navigation: {
          nextEl: ".work-swiper-next",
          prevEl: ".work-swiper-prev",
        },
        pagination: {
          el: "#work-swiper-pagination",
          clickable: true,
        },
        on: {
          slideChange: () => {
            this.currentIndex = this.mySwiper?.activeIndex;
          },
        },
      },
      works: [],
    };
  },
  beforeMount() {
    const isUa = this.$isUa();
    const works = getWorkData();
    let bgTotal = 38;
    let folderPrefix = "ua_bg";
    if (isUa) {
      bgTotal = 45;
      folderPrefix = "pc_bg";
    }
    const bgArray = this.shuffle(Array.from(Array(bgTotal), (_, k) => k));
    works.forEach((item, index) => {
      item.background = `background-image:url(https://hcqhome.cn/static/images/${folderPrefix}/${bgArray[index]}.webp)`;
    });
    this.works = works;
  },
  methods: {
    handelClickView({ link }) {
      if (link) this.openWindow(link);
    },
    openWindow(url, query) {
      //打开新窗口
      if (!url) return new Error("请传入url");
      if (query) url += getQuery(query);
      window.open(url, "_blank");
    },
    shuffle(arr) {
      //洗乱数组
      let m = arr.length;
      while (m > 1) {
        let index = Math.floor(Math.random() * m--);
        [arr[m], arr[index]] = [arr[index], arr[m]];
      }
      return arr;
    },
  },
};
</script>

<style lang="less">
.work-container {
  aside {
    transition: 0.3s 0.3s;
    &::after {
      position: absolute;
      content: "";
      width: 156px;
      height: 115px;
      background-image: url(@/assets/v1.png);
      background-size: 100%;
      bottom: -32px;
      left: -88px;
      z-index: 0;
    }
  }
  .swiper-container {
    width: 320px;
    height: 75vh;
    .swiper-wrapper {
      .swiper-slide {
        width: 100%;
        height: 480px;
        background-color: #f1f2f375 !important;
        clip-path: polygon(0 1%, 100% 0, 100% 90%, 0% 100%);
        transform: scaleY(0.8);
        transition: transform 0.35s;
        border-right: 1.5px solid;
      }
      .swiper-slide-active {
        transform: scaleY(1);
      }
    }
    button {
      position: absolute;
      display: flex;
      align-items: center;
      width: 60px;
      height: 32px;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: #00000075;
      z-index: 9;
      cursor: pointer;
      transition: all 0.35s;
      svg {
        transition: margin 0.35s;
      }
      &:active > svg {
        transition: margin 0.15s;
      }
      &.work-swiper-prev {
        left: -24px;
        border-radius: 0 25px 25px 0;
        justify-content: flex-end;
        &:hover {
          left: 0;
          svg {
            margin-right: 12px;
          }
        }
        svg {
          margin-right: 36px;
        }
        &:active > svg {
          margin-right: 24px;
        }
      }
      &.work-swiper-next {
        right: -24px;
        border-radius: 25px 0 0 25px;
        &:hover {
          right: 0;
          svg {
            margin-left: 12px;
          }
        }
        svg {
          margin-left: 36px;
        }
        &:active > svg {
          margin-left: 24px;
        }
      }
      &.swiper-button-disabled {
        opacity: 0;
        visibility: hidden;
      }
    }
  }
  .showreel {
    width: 50%;
    height: 60vh;
    transition: 0.3s 0.3s;
    &-title {
      margin-bottom: 8px;
    }
    .showreel-title > span {
      display: block;
      opacity: 0;
      transform: translateX(-100%);
      transition: all 0.3s;
      color: #f44336;
      font-weight: 600;
    }
    .showreel-title > div {
      display: block;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s;
    }
    .showreel-content {
      opacity: 0;
      transform: translateY(-100%);
      transition: all 0.3s;
    }
    &-wrap {
      visibility: hidden;
      pointer-events: none;
    }
    &-wrap.active {
      visibility: visible;
      pointer-events: initial;
      .showreel-title > span,
      .showreel-title > div {
        opacity: 1;
        transform: translateX(0);
        transition: all 0.3s 0.3s;
      }
      .showreel-content {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.3s 0.3s;
      }
    }

    #work-swiper-pagination {
      position: absolute;
      width: 96%;
      display: flex;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .swiper-pagination-bullet {
        width: 20%;
        height: 6px;
        margin: 1%;
        border-radius: 0;
        background-color: #000c24;
        transition: opacity 0.35s;
      }
    }
  }

  @media screen and (min-width: 768px) {
    aside {
      top: -120%;
    }
    .showreel {
      bottom: -120%;
    }
    &.swiper-slide-active {
      aside {
        top: 0;
      }
      .showreel {
        bottom: 0;
      }
    }
  }
  @media screen and (max-width: 768px) {
    aside {
      left: -120%;
    }
    .showreel {
      right: -120%;
    }
    &.swiper-slide-active {
      aside {
        left: 0;
      }
      .showreel {
        right: 0;
      }
    }
    main {
      flex-direction: column;
    }
    .swiper-container {
      height: 45vh;
    }
    .showreel {
      width: 100%;
      height: 240px;
    }
  }
}
</style>
