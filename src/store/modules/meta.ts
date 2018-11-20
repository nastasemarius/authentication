
const state = {
    breadcrumbs: []
}

const getters = {
    breadcrumbs: (state) => {
        return state.breadcrumbs;
    },
    drawer(state) {
        return state.drawer
    }
}

const actions = {
    SetBreadcrumbs({ commit }, payload) {
        commit('SET_BREADCRUMBS', payload)
    }
}

const mutations = {
    SET_BREADCRUMBS(state, payload: any[] = []) {
        state.breadcrumbs = payload;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}