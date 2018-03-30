import Vuex from 'vuex';
import axios from 'axios';

const DATA_URL = 'https://spreadsheets.google.com/feeds/list/' +
    '1DgCrNj1tiiDYjtLI6EdyZl5lvYPVcSYz0FVddY93_7U/od6/public/values?alt=json';

const createStore = () => {
  return new Vuex.Store({
    state: {
      members: [],
    },
    mutations: {
      SET_MEMBERS(state, members) {
        state.members = members;
      },
    },
    actions: {
      FETCH_MEMBERS({commit}) {
        return axios.get(DATA_URL).then((res) => {
          const members = res.data.feed.entry.map((entry, i) => {
            const {gsx$name, gsx$title, gsx$office, gsx$email} = entry;
              return {
                firstName: gsx$name.$t.split(' ')[0],
                lastName: gsx$name.$t.split(' ')[1],
                title: gsx$title.$t,
                office: gsx$office.$t,
                email: gsx$email.$t,
                id: gsx$email.$t.split('@')[0],
                index: i,
              };
            });
          commit('SET_MEMBERS', members);
        });
      },
    },
    getters: {
      getMemberById(state) {
        return (id) => state.members.find((member) => member.id === id);
      },
      getSortedMembers(state) {
        return (param, order) => state.members.sort((a, b) => {
          const left = order === 'asc' ? a : b;
          const right = order === 'asc' ? b : a;
          const valLeft = left[param];
          const valRight = right[param];
          if (valLeft < valRight) {
            return -1;
          }
          if (valLeft > valRight) {
            return 1;
          }
          return 0;
        });
      },
    },
  });
};

export default createStore;
