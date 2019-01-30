
const state = {
    breadcrumbs: [],
    inProgress: false,
    isDark: localStorage.getItem('isDark') === 'true' ? true : false
}

const getters = {
    breadcrumbs: (state) => {
        return state.breadcrumbs;
    },
    drawer(state) {
        return state.drawer
    },
    inProgress(state) {
        return state.inProgress
    },
    isDark(state) {
        return state.isDark;
    }
}

const actions = {
    SetBreadcrumbs({ commit }, payload) {
        commit('SET_BREADCRUMBS', payload)
    },
    ToggleTheme({ commit }, payload) {
        commit('TOGGLE_THEME', payload)
    }
}

const mutations = {
    SET_BREADCRUMBS(state, payload: any[] = []) {
        state.breadcrumbs = payload;
    },
    SHOW_PROGRESS(state) {
        state.inProgress = true;
    },
    HIDE_PROGRESS(state) {
        state.inProgress = false;
    },
    TOGGLE_THEME(state, payload) {
        state.isDark = payload;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}