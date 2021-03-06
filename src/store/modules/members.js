import Api from '@/plugins/Api'

const state = {
    members: []
}

const getters = {
    allMembers: (state) => state.members
}

const actions = {
    async fetchMembers({ commit }, [page, search, group_id]) {

        const response = await Api.get(`members?page=${page}&first_name=${search}&group_id=${group_id}`)

        commit('setMembers', response.data)
    },
    async addMember({ commit }, member) {
        const response = await Api.post('members', member)

        commit('newMember', response.data.data)
    },
    async updateMember({ commit }, member) {
        const response = await Api.put(`members/${member.id}`, member)

        commit('updatedMember', response.data.data)
    },
    async deleteMember({ commit }, id) {
        await Api.delete(`members/${id}`)

        commit('removeMember', id)
    },
}

const mutations = {
    setMembers: (state, members) => state.members = members,
    newMember: (state, member) => state.members.data.unshift(member),
    updatedMember: (state, updMember) => {
        const index = state.members.data.findIndex(member => member.id === updMember.id)

        if (index !== -1) {
            state.members.data.splice(index, 1, updMember)
        }
    },
    removeMember: (state, id) => state.members.data.splice(state.members.data.map(item => item.id).indexOf(id), 1)
}

export default {
    state, getters, actions, mutations
}