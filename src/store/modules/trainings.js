import axios from 'axios'

const url = 'http://127.0.0.1:8000/api/v1/training'

const state = {
    trainings: []
}

const getters = {
    allTrainings: (state) => state.trainings
}

const actions = {
    async fetchTrainings({ commit }, page) {
        const response = await axios.get(`${url}/?page=${page}`)

        commit('setTrainings', response.data)
    },
    async addTraining({ commit }, training) {
        const response = await axios.post(url, training)

        commit('newTraining', response.data.data)
    },
    async updateTraining({ commit }, training) {
        const response = await axios.put(`${url}/${training.id}`, training)

        commit('updatedTraining', response.data.data)
    },
    async deleteTraining({ commit }, id) {
        await axios.delete(`${url}/${id}`)

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