// initial state
const state = {
  examList: [],
}

// getters
const getters = {
//   enumFormat: (state) => (arrary, key) => {
//     return format(arrary, key)
//   }
}

// actions
const actions = {}

// mutations
const mutations = {
    updateExamList(state,exam){
        exam ? state.examList.push(exam):""
    }
}

const format = function (array, key) {
  for (let item of array) {
    if (item.key === key) {
      return item.value
    }
  }
  return null
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
