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
  // console.log('data is ', data)
  api.create(data)
    .then(ui.createSuccess)
    .catch(ui.failure)
}

const onUpdateSuccess = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log(data)
  const surveyId = store.surveyId
  api.update(surveyId, data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onShowSuccess = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('data is ', data)
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

const onViewResults = function (event) {
  event.preventDefault()
  // console.log(survey.id)
  const surveyId = $(this).attr('data-id')
  // console.log('Survey Id is ', surveyId)
  const ans1 = $(this).siblings()[5]
  const ans2 = $(this).siblings()[10]
  $(ans1).show()
  $(ans2).show()
  api.show(surveyId)
    .then((data) => {
      ui.viewResultSuccess(data)
      // $(`[data-id="${data.count.id}"].vote-tally`).show()
      // $('.vote-tally[data-id="surveyId"]').show()
      // console.log('console data is ', data)
    })
    .catch(ui.resultFailure)
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
  $('.feed').hide()
  $('.feed').text(null)
  $('.dash').hide()
  $('.feed-btns').hide()
  $('.get-surveys').hide()
  $('#update-survey').on('submit', onUpdateSuccess)
  $('.refresh-surveys').on('click', onRefresh)
  $('.clear-surveys').on('click', onClear)
  // $('.delete-survey').on('click', onDestroySurvey)
  $('.feed').on('click', '.delete-survey', onDestroySurvey)
  $('.feed').on('click', '.view-results', onViewResults)
  $('.reset').on('click', onRefresh)
  // $('.feed').on('click', '.edits-survey', onEditSurvey)
  // $(`[data-id="${data.surveys.id}"].delete-survey`).on('click', onDestroySurvey)
}
module.exports = {
  addHandlers
}
