<template>
  <div class="about-container">
    <main class="flex-center-evenly h-full">
      <aside class="block flex-shrink-0 decorate h-fit" left>
        <div class="image-box w-fit m-auto">
          <img class="block" src="@/assets/avatar.webp" alt="黄超群的头像" />
        </div>
      </aside>
      <div class="about-content w-fit">
        <div class="text m-auto">
          <h2 class="mb-4">关于我</h2>
          <p>一个就读于某职业学院计算机网络技术专业的22届毕业生.</p>
          <p>对绘画和编程感兴趣的一个小伙子，喜欢的运动是骑自行车和打羽毛球.</p>
          <p>目前主要发展方向是前端领域，空闲时间也学习后端知识.</p>
          <p>喜欢自己造轮子，热衷于分析设计思路与研究实现原理.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="less" scoped>
.about-container {
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: url(@/assets/bg1.png) no-repeat;
    background-size: 100% 100%;
    width: 960px;
    height: 100%;
  }
  &::before {
    top: -200px;
    left: -236px;
    transform: rotate(30deg);
  }
  &::after {
    bottom: -334px;
    right: -498px;
    transform: rotate(210deg);
  }
  &.swiper-slide-active {
    .image-box {
      clip-path: polygon(5% 0, 95% 0, 95% 85%, 5% 95%);
      > img {
        transform: translateY(0);
      }
    }
    .about-content {
      transform: translateX(0);
    }
  }
  main {
    position: relative;
    z-index: 1;
    .image-box {
      width: fit-content;
      background: url(@/assets/_bg.webp) no-repeat;
      background-size: 100% 100%;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      transition: clip-path 0.6s;
      > img {
        display: block;
        height: 366px;
        transform: translateY(100%);
        transition: transform 0.3s 0.45s;
      }
    }
    aside::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65);
      z-index: -1;
      clip-path: polygon(5% 0, 95% 0, 90% 88%, 3% 98%);
    }

    .about-content {
      color: #000c24;
      transform: translateX(120%);
      transition: transform 0.35s 0.35s;
      background-color: #ffffff66;
      .text {
        max-width: 366px;
      }
      h2 {
        color: #f44336;
      }
      > p {
        letter-spacing: 1.5px;
        margin: 4px 0;
      }
    }
  }
  @media screen and (max-width: 768px) {
    > main {
      flex-direction: column;
      > aside {
        transform: scale(0.9);
      }
    }
  }
}
</style>
