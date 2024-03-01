<template>
  <client-only>
    <NPlayer ref="player" :options="videoOptions" :set="initPlayer" />
  </client-only>
</template>

<script>
import axios from "axios";

const Mirroring = {
  type: "switch",
  html: "视频镜像",
  checked: false,
  change(value, player) {
    player.video.classList.toggle("nplayer_video-mirroring", value);
  },
};
export default {
  name: "VideoPlayer",
  data() {
    return {
      videoOptions: {
        videoProps: { preload: "metadata", playsinline: "true" },
        settings: [Mirroring, "speed"],
        contextMenus: ["loop", "pip"],
      },
    };
  },
  props: {
    videoInfo: {
      type: Object,
      default: () => ({}),
    },
    videoConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    let opt = this.videoOptions;
    opt.videoProps = { ...opt.videoProps, ...this.videoConfig };
  },
  beforeMount() {
    this.eventList = {
      Canplay: function () {
        this.clearWait();
        this.Error.hide();
      },
      Error: function (e) {
        this.Error.hide();
        let cont = "视频加载失败~";
        switch (e.target.error.code) {
          case 1:
            cont = "视频资源获取异常~";
            break;
          case 2:
            cont = "网络错误,请求资源失败~";
            break;
          case 3:
            cont = "视频解码错误,暂不支持该格式~";
            break;
          case 4:
            cont = "该视频格式被不支持~";
            break;
        }
        setTimeout(() => {
          this.Error.show(cont);
        }, 300);
      },
      UpdateOptions: function (v) {
        this.Title.setCont(v.title);
      },
      Waiting: function () {
        this.clearWait();
        this._waitTimer = setTimeout(() => {
          this.Error.show("当前网络不佳,请等待缓冲...");
          this.pause();
        }, 10000);
      },
    };
  },
  methods: {
    initPlayer(player) {
      this.addPlayerEl(player);
      player._waitTimer = null;
      player.clearWait = function () {
        if (this._waitTimer) {
          clearTimeout(this._waitTimer);
          this._waitTimer = null;
        }
      };
      this.$player = player;
      this.eventRegister(this.eventList);
    },
    async getBlobSrc(href, data, type = "blob") {
      let isCancel = false;
      if (this._CancelToBlob instanceof Function) this._CancelToBlob();
      if (this.getObjType(data) !== "Object") data = {};
      href += "";
      return await axios
        .post(href, data, {
          responseType: type == "blob" ? "blob" : "arrayBuffer",
          cancelToken: new axios.CancelToken((fn) => {
            this._CancelToBlob = () => {
              isCancel = true;
              fn();
            };
          }),
        })
        .then((e) => {
          let src = false;
          if (e.data instanceof Blob) src = URL.createObjectURL(e.data);
          return src;
        })
        .catch(() => isCancel);
    },
    eventRegister(eventList, type = true) {
      if (this.getObjType(eventList) !== "Object") return;
      for (const key of Object.keys(eventList)) {
        let fn = eventList[key];
        if (key.charAt(0) === "_" || !(fn instanceof Function)) continue;
        this.$player[type ? "on" : "off"](key, fn);
      }
    },
    getObjType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1);
    },
    addPlayerEl(player) {
      let _this = this;
      player.Title = createClass(player.control.controlBars[2].el, {
        type: "h4",
        className: "Title",
        attrs: ["class|nplayer_title"],
      });
      player.Error = createClass(player.el, {
        type: "span",
        className: "Error",
        attrs: ["class|nplayer_error"],
      })
        .setClassAttr("show", function (val) {
          if (val) this.setCont(val);
          this.el.classList.add("show");
        })
        .setClassAttr("hide", function () {
          this.el.classList.remove("show");
        });

      function createClass(el, config) {
        let fn = `
          {
          setClassAttr(key, val){this[key] = val;return this;}
          setCont(val) { this.el.innerText = val + "";}
          }`;
        let prefix = "new class ";
        let name = config.className;
        const CLS = eval((name ? prefix + name : prefix) + fn);
        CLS.el = _this.appendEl(el, config);
        if (config.init instanceof Function) config.init();
        return CLS;
      }
    },
    appendEl(dom, el, bln = true) {
      if (this.getObjType(el) !== "Object") return null;
      if (!(dom instanceof HTMLElement)) dom = document.querySelector(dom + "");
      let cDom = document.createElement(el.type || "div");
      if (Array.isArray(el.attrs)) {
        el.attrs.forEach((v) => {
          let attr = v.split("|");
          cDom.setAttribute(attr[0], attr[1]);
        });
      }
      if (el.text) cDom.innerText = el.text + "";
      dom[bln ? "prepend" : "append"](cDom);
      return cDom;
    },
  },
  watch: {
    async videoInfo(opt) {
      this.$player.Error.hide();
      let bCfg = opt.blobConfig;
      let isUpate = true;
      let obj = {};
      if (bCfg && bCfg.use && opt.src) {
        let _src = await this.getBlobSrc(opt.src, bCfg.data, bCfg.type);
        if (typeof _src == "boolean") {
          isUpate = false;
          if (!_src) this.$player.Error.show("获取视频blob地址失败~");
        } else {
          obj.src = _src;
        }
      }
      if (isUpate) {
        if (!opt.poster) opt.poster = "#";
        this.$player.updateOptions({ ...opt, ...obj });
      }
    },
  },
  beforeDestroy() {
    if (this.$player) {
      // 销毁前注销事件
      this.eventRegister(this.eventList, false);
      this.$player.dispose();
    }
  },
};
</script>
<style lang="less" >
.nplayer {
  .nplayer_video-mirroring {
    transform: scaleX(-1);
  }
  .nplayer_contextmenu {
    padding: 6px;
    border-radius: 5px;
    .nplayer_contextmenu_item {
      display: block;
      padding: 8px 12px;
      margin-bottom: 6px;
      border-radius: 5px;
      text-align: center;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .nplayer_control_bar-top {
    font-size: unset;
    &::before {
      content: "";
      width: 100%;
      height: 100px;
      position: absolute;
      top: 0;
      left: 0;
      background: url(./linear-gradient.png) repeat-x top;
      transition: all 0.2s ease-in-out;
      z-index: -1;
    }
    .nplayer_title {
      padding-left: 6px;
      font-size: 16px;
      font-weight: 400;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: 1px;
      transition: 0.35s all;
    }
  }
  .nplayer_error {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    left: 0;
    right: 0;
    padding: 0.5rem 2rem;
    margin: auto;
    top: 0;
    max-width: 80%;
    letter-spacing: 1px;
    min-height: 4rem;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.65);
    transform: translateY(-100%);
    color: #fff;
    opacity: 0;
    transition: opacity 0.35s, transform 0.45s ease;
    z-index: 99;
    &.show {
      opacity: 1;
      transform: translateY(100%);
      transition: opacity 0.35s,
        transform 0.55s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }
  }
}
</style>