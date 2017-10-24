const showSurveyTemplate = require('../templates/helpers/surveys.handlebars')
// const createSurveyTemplate = require('../templates/helpers/makesurvey.handlebars')
const store = require('../store')
const api = require('./api')
// const events = require('./events')

const getSuccess = function (data) {
  $('.feed').text(null)
  $('.feed').show()
  // console.log('data is ', data)
  // console.log(store.user.id)
  const showSurveyHTML = showSurveyTemplate({
    surveys: data.surveys
  })
  $('.feed').append(showSurveyHTML)
  $('.edits-survey').on('click', onEditSurvey)
  $('.vote').on('click', onVote)
  $('.vote-tally').hide()
  // checkUser(data)
}

const onVote = function (event) {
  event.preventDefault()
  // let answer = null
  const surveyId = $(this).attr('data-id')
  const answer = $('input[name="answer"]:checked').val()
  console.log('THE ANSWER IS ', answer)
  // const count = $('p[name="count"]:checked').val()
  // console.log('count is ', count)
  if (answer !== undefined) {
  api.show(surveyId)
    .then((data) => {
      return api.updateResults(surveyId, answer, data)
    })
    .then(voteSuccess)
    .catch(voteFailure)
  } else {
    voteFailure()
  }
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

// <-----  edit survey event for showing form ---->
const onEditSurvey = function (event) {
  event.preventDefault()
  const surveyTitle = $(this).siblings()[0]
  const question = $(this).siblings()[1]
  const response1 = $(this).siblings()[3]
  const response2 = $(this).siblings()[8]
  // let answer1Count = $(this).siblings()[5]
  // let answer2Count = $(this).siblings()[9]
  // console.log(surveyTitle)
  // console.log(question)
  // console.log(response1)
  // console.log(response2)
  const surveyId = $(this).attr('data-id')
  // console.log(surveyId)
  surveyTitle.contentEditable = false
  question.contentEditable = true
  response1.contentEditable = true
  response2.contentEditable = true
  $('.vote').hide()
  $('.reset').hide()
  $('.edits-survey').hide()
  $('.delete-survey').hide()
  $(this).parent().append('<button class="edit-survey">Confirm Edit</button>')
  $(this).parent().append('<button class="edit-cancel">Cancel Edit</button>')

  $('.edit-cancel').on('click', function (event) {
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
  $('.edit-survey').on('click', function (event) {
    onSurveyEdit(surveyId, surveyTitle, question, response1, response2)
  })
}

const onSurveyEdit = function (surveyId, surveyTitle, question, response1, response2) {
  // const surveyId = $(this).attr('data-id')
  const newTitle = $(surveyTitle).html()
  const newQuestion = $(question).html()
  const newResponse1 = $(response1).html()
  const newResponse2 = $(response2).html()
  // answer1Count = $(answer1Count).html()
  // answer2Count = $(answer2Count).html()
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
const voteSuccess = function (event) {
  api.index()
    .then((data) => {
      getSuccess(data)
      checkUser(data)
      // console.log('check user ', checkUser(data))
    })
    .then(() => {
      $('#message').text('Way to get out there and vote!').fadeIn().delay(4000).fadeOut()
      // $('.vote-tally').show()
    })
    .catch(updateFailure)
}

const createSuccess = function (data) {
  // console.log('id is ', data.survey._id)
  // $('.dash').text(null)
  const surveyId = data.survey._id
  store.surveyId = surveyId
  $('#create-submit').hide()
  $('.update-survey').show()
  $('#new_title').attr('disabled', true)
  $('.creates').trigger('reset')
  $('#message').text('Survey created, title cannot be changed!').fadeIn().delay(4000).fadeOut()
}

const editSuccess = function (event) {
  $('#message').text('Updated survey!').fadeIn().delay(4000).fadeOut()
  api.index()
    .then((data) => {
      getSuccess(data)
      checkUser(data)
    })
    .catch(editFailure)
}
const viewResultSuccess = function (data) {
  // console.log('data is ', data)
  // console.log('EVENT IS ', data.survey.questions[0].responses[0].answer1Count)
  // console.log('EVENT IS ', data.survey.questions[0].responses[0].answer2Count)
  // const surveyId = data.survey.id
  // console.log('id is ', surveyId)
  // event.survey.questions[0].responses[0].answer1Count.val()
  // event.survey.questions[0].responses[0].answer2Count.val()
  // for (let i = 0; i < data.surveys.length; i++) {
  //   if (data.survey.id === surveyId) {
  //     $(`[data-id="${data.survey.id}"].vote-tally`).show()
  //   // } else {
  //   //   $(`[data-id="${data.survey.id}"].vote-tally`).hide()
  //   // }
  // }
  // if (surveyId === event.survey.id) {
  //   $('.vote-tally').show()
  // } else {
  //   $('.vote-tally').hide()
  // }
  $('#message').text('Results are in!').fadeIn().delay(4000).fadeOut()
  // $('.vote-tally').show()
  // api.show(surveyId)
  // api.index()
  //   .then((data) => {
  //     getSuccess(data)
  //     checkUser(data)
  //   })
}

const deleteSuccess = function (event) {
  $('#message').text('Deleted survey!').fadeIn().delay(4000).fadeOut()
  api.index()
    .then((data) => {
      getSuccess(data)
      checkUser(data)
    })
    .catch(updateFailure)
}

const updateSuccess = function (data) {
  // console.log('this is ui', data)
  $('#message').text('Survey added!').fadeIn().delay(4000).fadeOut()
  $('#new_title').attr('disabled', false)
  $('#create-submit').show()
  $('#update-survey').trigger('reset')
  $('.update-survey').hide()
  $('#create-a-survey').trigger('reset')
}

const updateFailure = function (data) {
  // console.log('error is', data)
  $('#message').text('Update failed!').fadeIn().delay(4000).fadeOut()
}

const editFailure = function (data) {
  // console.log('error is', data)
  $('#message').text('Edit failed!').fadeIn().delay(4000).fadeOut()
}
const resultFailure = function (data) {
  // console.log('error is', data)
  $('#message').text('Get results failed!').fadeIn().delay(4000).fadeOut()
}

const voteFailure = function (event) {
  $('#message').text('Vote fail!').fadeIn().delay(4000).fadeOut()
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
  resultFailure,
  voteSuccess,
  voteFailure
}
