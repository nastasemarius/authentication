function permissions(state) {
    return state.permissions
}
function username(state) {
    return state.username;
}
function isPermitted(state) {
    return state.username !== "" && state.permissions.length > 0;
}

export default {
    permissions,
    username,
    isPermitted
}
