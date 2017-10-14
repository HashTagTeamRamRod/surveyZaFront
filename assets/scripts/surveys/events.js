const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onGetSuccess = (event) => {
  event.preventDefault()
  api.index()
    .then((data) => {
      ui.getSuccess(data)
      ui.checkUser(data)
    })
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
    .catch(ui.updateFailure)
}

const onShowSuccess = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('data is ', data)
  api.show(data)
  .then((data) => {
    ui.getSuccess(data)
    ui.checkUser(data)
  })
    .catch(ui.failure)
}

const onDestroySurvey = function (event) {
  event.preventDefault()
  const surveyId = $(this).attr('data-id')
  api.destroy(surveyId)
    .then(ui.deleteSuccess)
    .catch(ui.failure)
}

const onRefresh = (event) => {
  event.preventDefault()
  api.index()
  .then((data) => {
    ui.getSuccess(data)
    ui.checkUser(data)
  })
  .catch(ui.failure)
}
const onClear = (event) => {
  event.preventDefault()
  $('.feed').text(null)
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
  $('.refresh-surveys').on('click', onRefresh)
  $('.clear-surveys').on('click', onClear)
  // $('.delete-survey').on('click', onDestroySurvey)
  $('.feed').on('click', '.delete-survey', onDestroySurvey)
  // $('.feed').on('click', '.edits-survey', onEditSurvey)
  // $(`[data-id="${data.surveys.id}"].delete-survey`).on('click', onDestroySurvey)
}
module.exports = {
  addHandlers
}
