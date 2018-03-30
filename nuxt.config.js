const axios = require('axios');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-demo',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  generate: {
    routes: function() {
      return axios.get('https://spreadsheets.google.com/feeds/list/' +
      '1DgCrNj1tiiDYjtLI6EdyZl5lvYPVcSYz0FVddY93_7U/od6/public/values?alt=json')
      .then((res) => {
        return res.data.feed.entry.map((entry) => {
          const {gsx$name, gsx$title, gsx$office, gsx$email} = entry;
          const member = {
            firstName: gsx$name.$t.split(' ')[0],
            lastName: gsx$name.$t.split(' ')[1],
            title: gsx$title.$t,
            office: gsx$office.$t,
            email: gsx$email.$t,
            id: gsx$email.$t.split('@')[0],
          };
          return {
            route: `/team/${member.id}`,
            payload: member,
          };
        });
      });
    },
  },
};
