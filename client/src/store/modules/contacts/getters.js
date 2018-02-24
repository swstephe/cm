let empty = {
  id: null,
  first: '',
  last: '',
  phones: [],
  emails: []
}

export default {
  isRequesting (state) { return state.isRequesting },
  error (state) { return state.error },
  contacts (state) { return state.contacts },
  contact (state) {
    return state.selected === -1 ? empty : state.contacts[state.selected]
  },
}
