const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onGetSuccess = (event) => {
  event.preventDefault()
  api.index()
    .then(ui.getSuccess)
    .catch(ui.failure)
}

const onCreateSuccess = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('data is ', data)
  api.create(data)
    .then(ui.createSuccess)
    .catch(ui.failure)
}

const onUpdateSuccess = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  const surveyId = store.surveyId
  api.update(surveyId, data)
    .then(ui.updateSuccess)
    .catch(ui.failure)
}
// onUpdateSurvey = (surveyId, data) => {
//   event.preventDefault()
//   const
// }
const addHandlers = () => {
  $('.get-surveys').on('click', onGetSuccess)
  $('.creates').on('submit', onCreateSuccess)
  $('.creates').hide()
  $('.update-survey').hide()
  $('#update-survey').on('submit', onUpdateSuccess)
}
module.exports = {
  addHandlers
}
