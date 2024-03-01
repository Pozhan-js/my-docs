<template>
  <div class="home-container relative pt-3 text-white" :class="{ active }">
    <img
      class="bg-image w-[1180px] h-full absolute left-0 top-0"
      src="@/assets/bg.png" />
    <nav @pointermove.stop>
      <li
        class="cursor-pointer flex-shrink-0"
        :class="{ active: navIndex == index }"
        @click="switchIndex(index)"
        v-for="(nav, index) in navList"
        :key="index">
        {{ nav }}
      </li>
    </nav>
    <main class="absolute pl-9 z-10">
      <h1 class="text-5xl" ref="nameRef">
        <span>Hey,</span><span>我的名字是:</span>
        <span class="loading-name">{{ name }}</span>
      </h1>
      <h2 class="font-extralight mt-3 mb-4">
        一个来自湖南郴州且热爱前端的小白
      </h2>
      <Links />
      <button
        class="down absolute cursor-pointer mt-6"
        @click="$emit('switchIndex')">
        <svg viewBox="0 0 1024 1024" width="24" height="24">
          <path
            d="M512 960C264.97 960 64 759.03 64 512S264.97 64 512 64s448 200.97 448 448-200.97 448-448 448z m0-843.29c-217.97 0-395.29 177.33-395.29 395.29S294.03 907.29 512 907.29 907.29 729.97 907.29 512 729.97 116.71 512 116.71z"></path>
          <path
            d="M512 749.18c-14.55 0-26.35-11.8-26.35-26.35V301.18c0-14.55 11.8-26.35 26.35-26.35s26.35 11.8 26.35 26.35v421.65c0 14.55-11.8 26.35-26.35 26.35z"></path>
          <path
            d="M512 749.18c-10.57 0-20.5-4.12-27.96-11.59L344.29 597.84c-10.29-10.29-10.29-26.98 0-37.26 10.28-10.29 26.97-10.29 37.26 0L512 691.01l130.44-130.43c10.28-10.29 26.98-10.29 37.26 0 10.29 10.29 10.29 26.98 0 37.26L539.95 737.6c-7.46 7.47-17.39 11.58-27.95 11.58z"></path>
        </svg>
        <span class="text-sm ml-2">Scroll</span>
      </button>
    </main>
  </div>
</template>

<script>
import links from "./links.vue";
export default {
  components: { links },
  name: "Home",
  data() {
    return {
      name: "",
      active: false,
    };
  },
  props: {
    navIndex: {
      type: Number,
      default: 0,
    },
    navList: {
      type: Array,
      default: () => [],
    },
  },
  async mounted() {
    const soundMark = ["Huang|黄", "Chao|超", "Qun|群"];
    this.timer = null;
    const clearName = () => {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.name = this.name.substring(0, this.name.length - 1);
        if (this.name.length === 0) {
          clearInterval(this.timer);
          showName();
        }
      }, 500);
    };
    const showName = (index = 0) => {
      if (index === soundMark.length) return clearName();
      let currentIndex = 0;
      const [sound, char] = soundMark[index].split("|");
      this.timer = setInterval(() => {
        if (sound.length === currentIndex) {
          this.name = this.name.replace(sound, char);
          clearInterval(this.timer);
          showName(index + 1);
        } else {
          this.name += sound[currentIndex++];
        }
      }, 500);
    };
    const observerFunc = event => {
      //观察函数，当发生观察元素移入/移出到浏览器视口中时调用
      event.forEach(v => {
        if (v.isIntersecting) showName();
        else {
          clearInterval(this.timer);
          this.name = "";
        }
      });
    };
    const observer = new IntersectionObserver(observerFunc); //创建观察者对象
    await this.$sleep(900);
    this.active = true;
    await this.$sleep(300);
    observer.observe(this.$refs.nameRef); //观察者header节点
  },
  methods: {
    switchIndex(index = 0) {
      this.$emit("update:navIndex", index);
      this.$emit("switchIndex", [index, (index + 1) * 800]);
    },
  },
};
</script>
<style>
@keyframes flash {
  50% {
    content: "";
  }
}
@keyframes down {
  50% {
    transform: translateY(50%);
  }
}
</style>
<style lang="less" scoped>
.home-container {
  > .bg-image {
    clip-path: circle(1% at 50% 50%);
    left: -50%;
    opacity: 0.35;
  }
  &.active {
    opacity: 1;
    > .bg-image {
      animation: bg-image-enter 0.9s both;
    }
  }
  @keyframes bg-image-enter {
    0% {
      left: -50%;
      clip-path: circle(1% at 50% 50%);
    }
    35% {
      left: 0;
      opacity: 0.5;
      clip-path: circle(2.5% at 50% 50%);
    }
    100% {
      left: 0;
      top: 0;
      opacity: 1;
      clip-path: circle(100% at 50% 50%);
    }
  }
  & > nav {
    position: sticky;
    display: flex;
    li {
      padding: 32px 36px;
      margin: 0 12px;
      transition: color 0.35s;
      letter-spacing: 1.5px;
      background: no-repeat center;
      background-size: 50%;
      transition: background 0.35s;
      &.active {
        background-image: url("@/assets/active.png");
        background-size: 100%;
        background-position-y: 12px;
        color: #f44336 !important;
        font-weight: 600;
      }
      &:hover {
        color: #f57269;
      }
    }
  }
  main {
    bottom: 10%;
    h1 > .loading-name {
      margin-left: 6px;
      &::after {
        content: "_";
        animation: flash 1s infinite;
      }
    }
    h2 {
      letter-spacing: 2px;
    }
    .down {
      @color: #ccc;
      svg {
        fill: @color;
        vertical-align: -6px;
        transition: transform 0.3s;
        &:hover {
          fill: #fff;
          transform: translateY(6px);
        }
      }
      span {
        color: @color;
      }
    }
  }
  @media screen and (max-width: 768px) {
    > nav {
      height: 0;
      overflow: hidden;
    }
    > main {
      padding-left: 0;
      h1 {
        transform: translateY(-288px);
        > span {
          display: block;
          height: 1.2em;
          margin-left: 0 !important;
        }
      }
      h2 {
        width: 10em;
      }
    }
  }
}
</style>
