export default {
  SET_SOBJECTS: (state, sobjects) => {
    state.sobjects = sobjects
  },
  SET_SOBJECT: (state, sobject) => {
    state.sobjectsDetailed[sobject.name] = sobject
  },
}
