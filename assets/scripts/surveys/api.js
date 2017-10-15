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
const updateResults = function (surveyId, data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
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
const show = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + store.user.id,
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
  destroy
}
