const showSurveyTemplate = require('../templates/helpers/surveys.handlebars')
const createSurveyTemplate = require('../templates/helpers/makesurvey.handlebars')
const store = require('../store')

const getSuccess = function (data) {
  $('.feed').text(null)
  // console.log('data is ', JSON.stringify(data.surveys))
  const showSurveyHTML = showSurveyTemplate({ surveys: data.surveys })
  $('.feed').append(showSurveyHTML)
}

const createSuccess = function (data) {
  console.log('id is ', data.survey._id)
  // $('.dash').text(null)
  const surveyId = data.survey._id
  store.surveyId = surveyId
  $('.update-survey').show()
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
  updateSuccess
}
