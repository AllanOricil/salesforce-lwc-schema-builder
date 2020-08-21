/* eslint-disable prettier/prettier */
export default {
  getSobject: (state) => (sobject) => {
    return state.sobjectsDetailed[sobject] || null
  }
}
