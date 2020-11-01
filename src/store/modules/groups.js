import Api from '@/plugins/Api'

const state = {
    groups: []
}

const getters = {
    allGroups: (state) => state.groups
}

const actions = {
    async fetchGroups({ commit }) {
        const response = await Api.get('groups')

        commit('setGroups', response.data)
    },
    async addGroup({ commit }, group) {
        const response = await Api.post('groups', group)

        commit('newGroup', response.data.data)
    },
    async updateGroup({ commit }, group) {
        const response = await Api.put(`groups/${group.id}`, group)

        commit('updatedGroup', response.data.data)
    },
    async deleteGroup({ commit }, id) {
        await Api.delete(`groups/${id}`)

        commit('removeGroup', id)
    }
}

const mutations = {
    setGroups: (state, groups) => state.groups = groups,
    newGroup: (state, group) => state.groups.data.unshift(group),
    updatedGroup: (state, updGroup) => {
        const index = state.groups.data.findIndex(group => group.id === updGroup.id)

        if (index !== -1) {
            state.groups.data.splice(index, 1, updGroup)
        }
    },
    removeGroup: (state, id) => state.groups.data.splice(state.groups.data.map(item => item.id).indexOf(id), 1)
}

export default {
    state, getters, actions, mutations
}