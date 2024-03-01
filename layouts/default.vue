<template>
  <nuxt v-if="isRender" />
</template>
<script>
export default {
  data() {
    return {
      isRender: false,
    };
  },
  mounted() {
    loadingPage(false, () => {
      this.isRender = true;
    });
  },
};
</script>
<style lang="less">
html,
body {
  scroll-behavior: smooth;
  min-width: 320px;
  min-height: 100vh;
  -webkit-tap-highlight-color: transparent;
}
a {
  color: #436eff;
}
.decorate {
  position: relative;
  z-index: 9;
}
.decorate::before {
  position: absolute;
  content: "";
  width: 152px;
  height: 192px;
  background-image: url(@/assets/decorate.png);
  top: -36px;
  pointer-events: none;
  z-index: -1;
}
.decorate[left]::before {
  left: -24px;
}
.decorate[right]::before {
  right: -24px;
}
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #cecece;
  &:hover {
    background: #999;
  }
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #fff;
  box-shadow: none;
}
</style>
