<template>
  <div
    ref="contactRef"
    class="contact-container flex-center-evenly"
    @click="blink">
    <main id="eyeMain" class="relative flex-center m-auto" @pointerdown.stop>
      <div id="eye" class="flex-center">
        <div id="eyeball" class="absolute">0</div>
      </div>
    </main>
    <footer class="absolute w-full text-white flex-center-evenly flex-col">
      <h4>{{ author }}</h4>
      <Links />
      <span class="text-center">
        <a href="http://beian.miit.gov.cn/">{{ beian }}</a> All Rights Reserved
        © {{ _times }} {{ author }} ❤️
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: { active: Boolean },
  data() {
    return {
      author: "路尽为凡",
      beian: "湘ICP备2021013599号-1",
      videoOptions: {
        src: "http://1024.hcqhome.cn/video/1024.mp4",
      },
    };
  },
  beforeCreate() {
    let createTimeYear = 2022,
      newTimeYear = new Date().getFullYear();

    function getTimeYear(create, now) {
      return +create - +now <= 0 ? create : create + "-" + now;
    }
    this._times = getTimeYear(createTimeYear, newTimeYear);
  },
  mounted() {
    this.updateEyeState();
    this.eyeball_W = window.eyeball.clientWidth / 2; //长轴
    this.eyeball_H = window.eyeball.clientHeight / 2; //短轴
    this.centerX = window.eyeball.offsetLeft + window.eyeMain.offsetLeft;
    this.centerY = window.eyeball.offsetTop + window.eyeMain.offsetTop;
    const { contactRef } = this.$refs;
    if (this.$isUa()) {
      this.unwatch = this.$watch("active", async state => {
        if (this.playing) return;
        this.playing = true;
        if (state) {
          await this.$sleep(300);
          this.handleEnter();
          this.handleLeave();
          await this.$sleep(600);
          window.eyeball.style.transform = `translateX(${-this.eyeball_W}px)`;
          await this.$sleep(600);
          window.eyeball.style.transform = `translateX(${this.eyeball_W}px)`;
          await this.$sleep(600);
          window.eyeball.style.transform = `translateX(0px)`;
          await this.$sleep(300);
          this.handleEnter();
          this.playing = false;
        }
      });
    } else {
      // 手机上不知道为什么没有触发陀螺仪,只能放弃了
      this.removeEvent = this.batchRegistrationEvent(contactRef, [
        ["mousemove", this.handleMove],
        ["mouseenter", this.handleEnter],
        ["mouseleave", this.handleLeave],
      ]);
    }
  },
  beforeDestroy() {
    this.$isUa() ? this.unwatch() : this.removeEvent();
  },
  methods: {
    batchRegistrationEvent(dom, events) {
      function main(registration = false) {
        const funcKey = registration ? "add" : "remove";
        events.forEach(([eventName, eventFunc]) => {
          dom[`${funcKey}EventListener`](eventName, eventFunc);
        });
      }
      main(true);
      return main;
    },
    updateEyeState(state = true) {
      const type = state ? 1 : 2.5; //睁开/闭眼
      //眼睛眨眼状态处于什么类型
      window.eye.style.borderTop = `${type}em rgb(149, 98, 74) solid`;
      window.eye.style.borderBottom = `${type}em rgb(149, 98, 74) solid`;
    },
    handleMove(event) {
      // 计算鼠标位置相对于眼球中心的角度
      const angle = Math.atan2(
        event.clientY - this.centerY,
        event.clientX - this.centerX
      );
      // 根据椭圆的长轴和短轴计算眼球应该移动到的位置
      const posX = this.eyeball_W * Math.cos(angle);
      const posY = this.eyeball_H * Math.sin(angle);
      // // 更新眼球的位置
      window.eyeball.style.transform = `translate(${posX}px,${posY}px)`;
    },
    async handleEnter() {
      this.blink();
      window.eyeball.style.transition = "none";
    },
    handleLeave() {
      window.eyeball.style.transition = "0.35s";
      window.eyeball.style.transform = "translate(0,0)";
    },
    async blink() {
      if (this.isBlink) return;
      this.isBlink = true;
      this.updateEyeState(false);
      await this.$sleep(350);
      this.updateEyeState();
      await this.$sleep(600);
      this.isBlink = false;
    },
  },
};
</script>

<style lang="less" scoped>
.contact-container {
  @bottom: 144px;
  background-image: url(@/assets/footer_Bg.png);
  padding-bottom: @bottom !important;
  box-sizing: border-box;
  main {
    top: 10%;
    width: 80%;
    height: 80%;
    #eye {
      width: 7em;
      height: 7em;
      font-size: 32px;
      border-radius: 50%;
      transition: all 0.6s;
      font-weight: 600;
      background-color: rgb(248, 163, 124);
      cursor: pointer;
      box-shadow: 0 0 10px #000;
      #eyeball {
        width: 2.5em;
        height: 2em;
        color: white;
        text-align: center;
        line-height: 2em;
        background-color: rgb(0, 0, 0);
        border-radius: 50%;
        z-index: 1;
      }
    }
  }
  footer {
    min-height: @bottom;
    left: 0;
    bottom: 0;
    background-color: rgb(0, 12, 36);
    a {
      color: skyblue;
      transition: color 0.35s;
      &:hover {
        color: rgb(33, 185, 245);
      }
    }
    @media screen and (max-width: 768px) {
      a {
        display: block;
      }
    }
  }
}
</style>
