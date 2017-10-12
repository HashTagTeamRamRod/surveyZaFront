const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onGetSuccess = (event) => {
  event.preventDefault()
  api.index()
    .then(ui.getSuccess)
    .catch(ui.failure)
}

const onCreateSuccess = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.create(data)
    .then(ui.createSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('.get-surveys').on('click', onGetSuccess)
}
module.exports = {
  addHandlers
}
