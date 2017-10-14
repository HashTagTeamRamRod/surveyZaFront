const showSurveyTemplate = require('../templates/helpers/surveys.handlebars')
const createSurveyTemplate = require('../templates/helpers/makesurvey.handlebars')
const store = require('../store')
const api = require('./api')

const getSuccess = function (data) {
  $('.feed').text(null)
  console.log('data is ', data)
  console.log(this)
  console.log(store.user.id)
  const showSurveyHTML = showSurveyTemplate({ surveys: data.surveys })
  $('.feed').append(showSurveyHTML)

  // checkUser(data)
}
const checkUser = function (data) {
  const userId = store.user.id
  for (let i = 0; i < data.surveys.length; i++) {
    if (data.surveys[i]._owner === userId) {
      $(`[data-id="${data.surveys[i].id}"].edits-survey`).show()
      $(`[data-id="${data.surveys[i].id}"].delete-survey`).show()
    } else {
      $(`[data-id="${data.surveys[i].id}"].edits-survey`).hide()
      $(`[data-id="${data.surveys[i].id}"].delete-survey`).hide()
    }
  }
}

const createSuccess = function (data) {
  console.log('id is ', data.survey._id)
  // $('.dash').text(null)
  const surveyId = data.survey._id
  store.surveyId = surveyId
  $('.update-survey').show()
}

const deleteSuccess = function (event) {
    event.preventDefault()
  $('#message').text('Deleted survey!').fadeIn().delay(4000).fadeOut()
  api.index()
    .then((data) => {
      getSuccess(data)
      checkUser(data)
  })
  .catch(updateFailure)
}

const updateSuccess = function (data) {
  console.log('this is ui', data)
}

const updateFailure = function (data) {
  console.log('error is', data)
}

const failure = (data) => {
  console.error(data)
}

module.exports = {
  getSuccess,
  createSuccess,
  failure,
  updateSuccess,
  updateFailure,
  checkUser,
  deleteSuccess
}
