'use strict'
const config = require('../config')
const store = require('../store')

const create = function(data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const update = function(surveyId, data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const updateResults = function(surveyId, answer, data) {
  console.log('data is', data)
  let answer1count
  let answer2count
  const answer1 = data.survey.questions[0].responses[0].answer1
  const answer2 = data.survey.questions[0].responses[0].answer2
  console.log('answer1 is ', answer1)
  console.log('answer2 is ', answer2)
  console.log(answer)
  if (answer === answer1) {
    answer1count++
    return $.ajax({
        url: config.apiOrigin + '/surveys/' + surveyId,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + store.user.token
        },
        data: {
          surveys: {
            questions: {
              responses: {
                answer1count: answer1count
              }
            }
          }
        }
    })
    } else if (answer === answer2) {
  answer2count++
  return $.ajax({
      url: config.apiOrigin + '/surveys/' + surveyId,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        surveys: {
          questions: {
            responses: {
              answer2count: answer2count
            }
          }
        }
    }
  })
}
}


const index = function() {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const show = function(surveyId) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'GET'
  })
}
const destroy = function(surveyId) {
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
