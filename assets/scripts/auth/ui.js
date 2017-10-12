const store = require('../store')
const api = require('./api')
const showNotesTemplate = require('../templates/note-listing.handlebars')
const events = require('./events')
// const getFormFields = require('../../../lib/get-form-fields')

const signUpSuccess = function (data) {
  // console.log(data)
  // console.log('Successfully signed up!')
  $('#message').text('Successfully signed up').fadeIn().delay(4000).fadeOut()
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#sign-up').hide()
}
const signInSuccess = function (data) {
  // console.log(data)
  // console.log('Successfully signed in!')
  store.user = data.user
  $('#collapseNotesButton').hide()
  $('#message').text('You`re signed in!').fadeIn().delay(4000).fadeOut()
  $('#sign-in').trigger('reset')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.directions').hide()
  $('#edit-info').hide()
  $('#sign-out').show()
  $('#change-password').show()
  $('.main').show()
  $('#note').show()
  $('#content').show()
  // $('#getNotesButton').show()
  // $('.note-listing').show()
  $('#wrapper').show()
  $('.all-notes').html('')
  // $('#sign-in').on('click', function (data) {
  //   data = data.notes
  //   if (data.notes.length !== 0) {
  //     $('#collapseNotesButton').show()
  //     $('#getNotesButton').show()
  //   } else {
  //     $('#collapseNotesButton').hide()
  //     $('#getNotesButton').hide()
  //   }
  // })
}
const changePasswordSuccess = function (data) {
  // console.log('Great success!')
  $('#change-password').trigger('reset')
  $('#message').text('You`ve successfully changed your password!').fadeIn().delay(4000).fadeOut()
}
const signOutSuccess = function () {
  $('#sign-out').hide()
  store.user = null
  store.data = null
  store.notes = null
  $('#message').text('You`ve successfully signed out!').fadeIn().delay(4000).fadeOut()
  $('#sign-up').show()
  $('#sign-in').show()
  $('.directions').show()
  $('#main').hide()
  $('#note').hide()
  $('#content').hide()
  $('.btn-default').hide()
  $('.note-listing').hide()
  $('#wrapper').hide()
  $('#change-password').hide()
  $('.all-notes').html('')
}


const signUpFailure = function (data) {
  // console.error(data)
  $('#message').text('Issue on sign-up! Try again!').fadeIn().delay(4000).fadeOut()
}
const signInFailure = function (data) {
  // console.log(data)
  // console.log('failure!')
  $('#message').text('try again!')
}
const changePasswordFailure = function (data) {
  // console.log(data)
  // console.log('FAIL!')
  $('#message').text('Something went wrong, change password!').fadeIn().delay(4000).fadeOut()
}
const signOutFailure = function (data) {
  // console.log(data)
  // console.log('FAIL!')
  $('#message').text('You have not signed out!').fadeIn().delay(4000).fadeOut()
}
const failure = (data) => {
  // console.error(data)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  failure
}
