
const state = {
    snackbar: {
        success: true,
        visible: false,
        text: null,
        timeout: 6000,
        multiline: false,
    }
};


const actions = {
    ShowSnackbar({ commit }, payload) {
        commit('SHOW_SNACKBAR', payload);
    },
    HideSnackbar({ commit }) {
        commit('HIDE_SNACKBAR');
    }
}

const getters = {
    snackbar(state) {
        return state.snackbar;
    }
}

const mutations = {
    SHOW_SNACKBAR(state, { text, multiline, timeout, success }) {
        state.snackbar.text = text
        state.snackbar.multiline = (text.length > 50) ? true : false

        if (multiline) {
            state.snackbar.multiline = multiline
        }

        if (timeout) {
            state.snackbar.timeout = timeout
        }

        state.snackbar.success = success;

        state.snackbar.visible = true
    },
    HIDE_SNACKBAR(state) {
        state.snackbar.visible = false
        state.snackbar.multiline = false
        state.snackbar.timeout = 6000
        state.snackbar.text = null
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}