import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    fames: {},
    vTiers: [],
    likes: []
    // var persons: { [id: string] : IPerson; } = {};
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    addFame(state, { id, fame }) {
      console.log(id, fame);
      //state.dict[key] = value;
      Vue.set(state.fames, id, fame);
    },
    resetTier(state) {
      Vue.set(state, 'vTiers', []);
    },
    smallLike(state, freet) {
      let likeIndex = state.likes.findIndex(x => x.freetId == freet);

      const numLikes = this.getLikes(freet)

      if (likeIndex === -1){
        state.likes.push({freetId: freet, likes: numLikes});
      } else{
        Vue.delete(state.likes, likeIndex);
        state.likes.push({freetId: freet, likes: numLikes+1});
      }
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;

      const fameUrl = `/api/users/session`;
      const res2 = await fetch(fameUrl).then(async r => r.json());
      console.log("START LOOP");
      for (let i = 0; i < res.length; i++){
        const userInfoUrl = `/api/users/${res[i].author}`;
        const userInfo = await fetch(userInfoUrl).then(async r => r.json());

        const fameUrl = `/api/fame/${userInfo.user._id}`;
        const fame = await fetch(fameUrl).then(async r => r.json());
        Vue.set(state.fames, userInfo.user._id, fame.fame);

        const vTierUrl = `/api/tiers/${userInfo.user._id}`;
        const vTier = await fetch(vTierUrl).then(async r => r.json());

        let index = state.vTiers.findIndex(x => x.id == res[i].author);

        if (index === -1){
          state.vTiers.push({id: res[i].author, vTier: vTier.vTier});
        }

        const likeUrl = `/api/likes/${res[i]._id}`;
        const likeInfo = await fetch(likeUrl).then(async r => r.json());

        let likeIndex = state.likes.findIndex(x => x.freetId == res[i]._id);

        if (likeIndex === -1){
          state.likes.push({freetId: res[i]._id, likes: likeInfo.numLikes});
        } else{
          Vue.delete(state.likes, likeIndex);
          state.likes.push({freetId: res[i]._id, likes: likeInfo.numLikes});
        }
      }
      Vue.delete(state.fames, "testing");
    }
  },
  getters: {
    getVTier: (state) => (username) => {
      let x = state.vTiers.filter(item => item.id == username)[0];
      if (x){
        return x.vTier;
      }
    },
    getLikes: (state) => (freet) => {
      let x = state.likes.filter(item => item.freetId == freet)[0];
      if (x){
        return x.likes;
      }
    }
  //   getFame: state => (id: string) =>{
  //     return state.fames[id];
  //   }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
