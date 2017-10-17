'use strict'
const config = require('../config')
const store = require('../store')

const create = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const update = function (surveyId, data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const updateResults = function (surveyId, answer, data) {
  // console.log('data is', data)
  console.log('answer is ', answer)
  const content = data.survey.questions[0].content
  const answer1 = data.survey.questions[0].responses[0].answer1
  const answer2 = data.survey.questions[0].responses[0].answer2
  let answer1Count = data.survey.questions[0].responses[0].answer1Count
  let answer2Count = data.survey.questions[0].responses[0].answer2Count
  // console.log('answer1 is ', answer1)
  // console.log('answer2 is ', answer2)
  // console.log(answer)
  if (answer === answer1) {
    answer1Count++
    return $.ajax({
      url: config.apiOrigin + '/surveys/' + surveyId,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        surveys: {
          questions: {
            content,
            responses: {
              answer1,
              answer1Count: answer1Count,
              answer2,
              answer2Count
            }
          }
        }
      }
    })
  } else if (answer === answer2) {
    answer2Count++
    return $.ajax({
      url: config.apiOrigin + '/surveys/' + surveyId,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        surveys: {
          questions: {
            content,
            responses: {
              answer1,
              answer1Count,
              answer2,
              answer2Count: answer2Count
            }
          }
        }
      }
    })
  }
}

const index = function () {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const show = function (surveyId) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'GET'
  })
}
const destroy = function (surveyId) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
module.exports = {
  create,
  update,
  index,
  show,
  destroy,
  updateResults
}
