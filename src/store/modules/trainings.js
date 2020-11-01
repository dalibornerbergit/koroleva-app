import Api from '@/plugins/Api'

const state = {
    trainings: []
}

const getters = {
    allTrainings: (state) => state.trainings
}

const actions = {
    async fetchTrainings({ commit }, [page, group_id]) {
        const response = await Api.get(`trainings?page=${page}&group_id=${group_id}`)

        commit('setTrainings', response.data)
    },
    async addTraining({ commit }, training) {
        const response = await Api.post('trainings', training)

        console.log(response)

        commit('newTraining', response.data.data)
    },
    async updateTraining({ commit }, training) {
        const response = await Api.put(`trainings/${training.id}`, training)

        commit('updatedTraining', response.data.data)
    },
    async deleteTraining({ commit }, id) {
        await Api.delete(`trainings/${id}`)

        commit('removeTraining', id)
    },
}

const mutations = {
    setTrainings: (state, trainings) => state.trainings = trainings,
    newTraining: (state, training) => state.trainings.data.unshift(training),
    updatedTraining: (state, updTraining) => {
        const index = state.trainings.data.findIndex(training => training.id === updTraining.id)

        if (index !== -1) {
            state.trainings.data.splice(index, 1, updTraining)
        }
    },
    removeTraining: (state, id) => state.trainings.data.splice(state.trainings.data.map(item => item.id).indexOf(id), 1)
}

export default {
    state, getters, actions, mutations
}