#!/usr/bin/env node

var exec = require('child_process').exec

var args = process.argv.slice(2)
var branch = "master"
var editor = "subl"

if (args && args[0] === 'gh') branch = "gh-pages"
else branch = args[0]

if (args && args[1] === 'a') editor = "atom"

var diff = "git diff --name-only origin/" + branch + "..."

exec(diff, function(err, stdout, stdrr) {
  var files = stdout.split('\n')
  var command = ""
  counter = 0
  files.forEach(function(file) {
    if (!file) return
    if (counter === 0) {
      command += editor + ' . ' + file
    } else {
      command += ' ' + file
    }
    counter++
  })
  exec(command)
})
