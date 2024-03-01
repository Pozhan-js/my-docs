<template>
  <div class="skill-container relative">
    <main class="flex-center-evenly h-full">
      <div class="skill-content">
        <h2 class="text-center mb-4">技能树</h2>
        <div class="grid" :style="gridStyle">
          <div
            class="flex-center relative cursor-pointer overflow-hidden"
            v-for="(skill, index) in skills"
            :key="skill.name"
            :data-index="index"
            :class="{ active: index == activeIndex }">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-progress absolute">{{ skill.progress }}%</span>
          </div>
        </div>
      </div>
      <aside class="decorate mt-24" right>
        <div class="image-box">
          <img class="h-[366px]" src="@/assets/skill.png" alt="" />
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
export default {
  name: "Skill",
  props: { active: Boolean },
  data() {
    return {
      skills: [
        { name: "HTML", progress: 90 },
        { name: "CSS", progress: 85 },
        { name: "JavaScript", progress: 90 },
        { name: "JQuery", progress: 85 },
        { name: "Vue2", progress: 85 },
        { name: "Vue3", progress: 75 },
        { name: "React", progress: 75 },
        { name: "Java", progress: 70 },
        { name: "MySql", progress: 70 },
      ],
      activeIndex: -1,
      gridStyle: {},
    };
  },
  methods: {
    updatePerimeter(percent = 0) {
      //圆的周长
      if (percent > 1) percent /= 100;
      else if (percent >= 100) percent = 1;
      var perimeter = Approximate(Math.PI * 2 * 48);
      //stroke-dasharray属性的两个参数和必须为周长
      return (
        Approximate(perimeter * percent) +
        " " +
        Approximate(perimeter * (1 - percent))
      );
      function Approximate(val) {
        return +val.toFixed(2) || 0;
      }
    },
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index;
      const row = Math.floor(index / 3);
      const column = index % 3;
      const result = this.getDefaultResult();
      result[0][row] = 2;
      result[1][column] = 2;
      this.setGridStyle(result);
    },
    computedActive() {
      let index = this.activeIndex + 1;
      if (this.activeIndex >= this.skills.length - 1) {
        index = 0;
      }
      this.handleClick(index);
    },
    setGridStyle(result = this.getDefaultResult()) {
      this.gridStyle = {
        "grid-template-rows": result[0].map(i => `${i}fr`).join(" "),
        "grid-template-columns": result[1].map(i => `${i}fr`).join(" "),
      };
    },
    getDefaultResult() {
      return [
        [1, 1, 1],
        [1, 1, 1],
      ];
    },
  },
  watch: {
    active(state) {
      if (state) {
        this.timer = setInterval(this.computedActive, 2300);
        this.timeout = setTimeout(this.computedActive, 300);
      } else {
        clearInterval(this.timer);
        clearTimeout(this.timeout);
        this.setGridStyle();
        this.activeIndex = -1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.skill-container {
  &::before {
    content: "";
    position: absolute;
    width: 960px;
    height: 100%;
    top: -85px;
    right: -475px;
    transform: rotate(155deg);
    background: url(@/assets/bg1.png) no-repeat;
    background-size: 100% 100%;
    pointer-events: none;
  }
  main {
    .text {
      max-width: 440px;
    }
    h2 {
      position: relative;
      color: #fff;
      font-size: 36px;
      font-weight: bold;
      -webkit-text-stroke: 1px red;
    }
    .grid {
      width: 400px;
      height: 400px;
      grid-template-columns: 1fr 1fr 1fr;
      //设置行数和高度
      grid-template-rows: 1fr 1fr 1fr;
      //平滑过渡网格单元尺寸变化
      transition: all 0.5s;
      // 每个格子间距
      grid-gap: 8px;
      font-size: 24px;
      color: #fff;
      > div {
        border: 2px solid #000;
        box-shadow: 0 0 2px #fff;
      }
      .skill-name {
        -webkit-text-stroke: 1px #000;
      }
      .skill-progress {
        width: 100%;
        line-height: 36px;
        left: 0;
        bottom: -100%;
        background-color: #000;
        transition: bottom 0.3s;
        text-align: center;
      }
      .active > .skill-progress {
        bottom: 0%;
      }
    }
    aside {
      width: 266px;
      left: 50%;
      transition: 0.3s;
      &::after {
        position: absolute;
        content: "";
        width: 46px;
        height: 72px;
        background: url(@/assets/Vector.png) no-repeat;
        background-size: 100% 100%;
        right: -12px;
        bottom: -24px;
      }
    }
  }

  &.swiper-slide-active aside {
    left: 0;
  }
  @media screen and (max-width: 768px) {
    main .grid {
      width: 300px;
      height: 300px;
    }
    main > aside {
      display: none;
    }
  }
}
</style>
