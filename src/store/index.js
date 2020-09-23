import Vue from 'vue'
import Vuex from 'vuex'
import members from './modules/members'
import groups from './modules/groups'
import trainings from './modules/trainings'

Vue.use(Vuex)

const state = {
  user: null
}

export default new Vuex.Store({
  state,
  getters: {
    user: (state) => {
      return state.user
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user)
    }
  },
  mutations: {
    user(state, user) {
      state.user = user
    }
  },
  modules: {
    members,
    groups,
    trainings
  }
})
