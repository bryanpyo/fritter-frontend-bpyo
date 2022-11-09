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
    vTiers: []
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
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;

      const fameUrl = `/api/users/session`;
      const res2 = await fetch(fameUrl).then(async r => r.json());

      console.log("alive");
      // const allUsersUrls = `/api/users/`;
      // const allUsers = await fetch(allUsersUrls).then(async r => r.json());
      // console.log("still Alive");
      // console.log(fameUrl);
      // console.log(res);
      
      // console.log(res2.user);
      // console.log(res2.user._id);
      // console.log(state.fames);
      // console.log(allUsers);

      for (let i = 0; i < res.length; i++){
        // console.log(res[i]);
        const userInfoUrl = `/api/users/${res[i].author}`;
        const userInfo = await fetch(userInfoUrl).then(async r => r.json());
        // console.log(userInfo.user._id);
        const fameUrl = `/api/fame/${userInfo.user._id}`;
        const fame = await fetch(fameUrl).then(async r => r.json());
        // let userId: string = userInfo.user._id;
        // console.log(fame);
        Vue.set(state.fames, userInfo.user._id, fame.fame);

        const vTierUrl = `/api/tiers/${userInfo.user._id}`;
        const vTier = await fetch(vTierUrl);
        console.log("VTIER FOR ");
        console.log(`${res[i].author}`);
        console.log(vTier);

        state.vTiers.push({id: res[i].author, vTier: vTier})
      }
      Vue.delete(state.fames, "testing");

      console.log(state.fames);
      state.vTiers.push({id: "111", vTier: "blue"});
      state.vTiers.push({id: "222", vTier: "silver"});
      state.vTiers.push({id: "89", vTier: "none"});
      console.log(state.vTiers);
      // console.log(state.fames.number);
      
    }
  },
  getters: {
    getVTier: (state) => (username) => {
      // return state.vTiers.filter(item => item.toLowerCase().includes(filter)).length;
      return state.vTiers.filter(item => item.id == username);
    }
  //   getFame: state => (id: string) =>{
  //     return state.fames[id];
  //   }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
