/* global isBrowser */
export default {
  name: 'Layout',
  props: [ 'title', 'description', 'keywords' ],
  components: {},
  computed: {
    vTitle() {
      return this.$root.title || this.title || 'egg-vue-webpack';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || 'egg-vue-webpack';
    },
    vDescription() {
      return this.$root.description || this.description || 'egg-vue-webpack';
    },
    baseClass() {
      return this.$root.baseClass;
    }
  },
  template: isBrowser ? '<div id="app"><slot></slot></div>' : `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <title>{{vTitle}}</title>
                    <meta name="keywords" :content="vKeywords">
                    <meta name="description" :content="vDescription">
                    <meta http-equiv="content-type" content="text/html;charset=utf-8">
                    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
                   </head>
                  <body :class="baseClass">
                  <div id="app">
                   <slot></slot>
                  </div>
                  </body>
                </html>`

};
