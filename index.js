#!/usr/bin/env node

var exec = require('child_process').exec

exec('git diff --name-only origin/gh-pages...', function(err, stdout, stdrr) {
  var files = stdout.split('\n')
  var command = ""
  counter = 0
  files.forEach(function(file) {
    if (!file) return
    if (counter === 0) {
      command += 'subl . ' + file
    } else {
      command += ' ' + file
    }
    counter++
  })
  exec(command)
})

// make it take in an arg for gh-pages or master branch