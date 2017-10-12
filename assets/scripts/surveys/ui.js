const showSurveyTemplate = require('../templates/helpers/surveys.handlebars')

const getSuccess = function (data) {
  $('.dash').text(null)
  const showSurveyHTML = showSurveyTemplate({ surveys: data.surveys })
  $('.dash').append(showSurveyHTML)
}

const failure = (data) => {
  console.error(data)
}

module.exports = {
  getSuccess,
  failure

}
