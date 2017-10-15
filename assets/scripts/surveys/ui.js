const showSurveyTemplate = require('../templates/helpers/surveys.handlebars')
const createSurveyTemplate = require('../templates/helpers/makesurvey.handlebars')
const store = require('../store')
const api = require('./api')

const getSuccess = function(data) {
  $('.feed').text(null)
  console.log('data is ', data)
  console.log(store.user.id)
  const showSurveyHTML = showSurveyTemplate({
    surveys: data.surveys
  })
  $('.feed').append(showSurveyHTML)
  $('.edits-survey').on('click', onEditSurvey)
  $('.vote').on('click', onVote)

  // checkUser(data)
}

const onVote = function(event) {
  event.preventDefault()
  // let answer = null
  const surveyId = $(this).attr('data-id')
  const answer = $('input[name="answer"]:checked').val()
  api.show(surveyId)
    .then((data) => {
      api.updateResults(surveyId, answer, data)
    })
}

const checkUser = function(data) {
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

// <-----  edit survey event for showing form ---->
const onEditSurvey = function(event) {
  event.preventDefault()
  const surveyTitle = $(this).siblings()[0]
  const question = $(this).siblings()[1]
  const response1 = $(this).siblings()[3]
  const response2 = $(this).siblings()[8]
  console.log(surveyTitle)
  console.log(question)
  console.log(response1)
  console.log(response2)
  const surveyId = $(this).attr('data-id')
  console.log(surveyId)
  surveyTitle.contentEditable = true
  question.contentEditable = true
  response1.contentEditable = true
  response2.contentEditable = true
  $('.vote').hide()
  $('.reset').hide()
  $('.edits-survey').hide()
  $('.delete-survey').hide()
  $(this).parent().append('<button class="edit-survey">Confirm Edit</button>')
  $(this).parent().append('<button class="edit-cancel">Cancel Edit</button>')

  $('.edit-cancel').on('click', function(event) {
    // clearTable()
    $(this).parent().parent().append()
    $('.edit-cancel').hide()
    // $('#collapseNotesButton').hide()
    api.index()
      .then((data) => {
        getSuccess(data)
        checkUser(data)
      })
      .catch(failure)
  })
  $('.edit-survey').on('click', function(event) {
    onSurveyEdit(surveyId, surveyTitle, question, response1, response2)
  })
}

const onSurveyEdit = function(surveyId, surveyTitle, question, response1, response2) {
  const newTitle = $(surveyTitle).html()
  const newQuestion = $(question).html()
  const newResponse1 = $(response1).html()
  const newResponse2 = $(response2).html()
  const data = {
    surveys: {
      title: newTitle,
      questions: {
        content: newQuestion,
        responses: {
          answer1: newResponse1,
          answer2: newResponse2
        }
      }
    }
  }

  api.update(surveyId, data)
    .then(editSuccess)
    .catch(failure)
}

// increment accumulator for selected vote and submit patch request

// <-----  edit survey event for showing form ---->

const createSuccess = function(data) {
  console.log('id is ', data.survey._id)
  // $('.dash').text(null)
  const surveyId = data.survey._id
  store.surveyId = surveyId
  $('.update-survey').show()
}

const editSuccess = function(event) {
  $('#message').text('Updated survey!').fadeIn().delay(4000).fadeOut()
  api.index()
    .then((data) => {
      getSuccess(data)
      checkUser(data)
    })
    .catch(editFailure)
}
const viewResultSuccess = function(event) {
  $('#message').text('Results are in!').fadeIn().delay(4000).fadeOut()
  $('.count').show()
  $('.view-results').hide()
  api.index()
    .then((data) => {
      getSuccess(data)
      checkUser(data)
    })
}

const deleteSuccess = function(event) {
  $('#message').text('Deleted survey!').fadeIn().delay(4000).fadeOut()
  api.index()
    .then((data) => {
      getSuccess(data)
      checkUser(data)
    })
    .catch(updateFailure)
}

const updateSuccess = function(data) {
  console.log('this is ui', data)
  $('#message').text('Survey added!').fadeIn().delay(4000).fadeOut()
}

const updateFailure = function(data) {
  console.log('error is', data)
  $('#message').text('Update failed!').fadeIn().delay(4000).fadeOut()
}

const editFailure = function(data) {
  console.log('error is', data)
  $('#message').text('Edit failed!').fadeIn().delay(4000).fadeOut()
}
const resultFailure = function(data) {
  console.log('error is', data)
  $('#message').text('Get results failed!').fadeIn().delay(4000).fadeOut()
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
  deleteSuccess,
  viewResultSuccess,
  resultFailure
}
