const showSurveyTemplate = require('../templates/helpers/surveys.handlebars')
const createSurveyTemplate = require('../templates/helpers/makesurvey.handlebars')

const getSuccess = function (data) {
  $('.dash').text(null)
  const showSurveyHTML = showSurveyTemplate({ surveys: data.surveys })
  $('.dash').append(showSurveyHTML)
  console.log('data is', data)
  console.log(data.surveys)
}

const createSuccess = function (data) {
  console.log('id is ', data.survey.id)
  // $('.dash').text(null)
  $('.update-survey').show()
}

const updateSuccess = function (data) {
  console.log('this is ui', data)
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
