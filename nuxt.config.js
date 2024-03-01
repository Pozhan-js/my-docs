export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "前端小小白",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "来自一个前端小小白的个人简历",
      },
      {
        name: "keywords",
        content: "前端,前端小小白,小白,个人,个人网站,个人简历",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/styles/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/swiper.js", ssr: false },
    { src: "~/plugins/videojs.js", ssr: false },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],
  server: {
    port: 3024, //default:3000
    host: "0.0.0.0", //default:localhost
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    analyze: true,
    postcss: {
      postcssOptions: {
        plugins: {
          autoprefixer: {},
          tailwindcss: {},
        },
      },
    },
  },
};
