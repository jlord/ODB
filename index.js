#!/usr/bin/env node

var exec = require('child_process').exec
var path = require('path')
var fs = require('fs')

var args = process.argv.slice(2)
var branch = "master"
var editor = "subl"
var dir = path.join(process.env.HOME || process.env.USERPROFILE, '.config', 'ODBEditor.json')

// are they just setting editor?
if (args && args[0] == '--editor') {
  if (args[1]) {
    editor = args[1]
    return writeSetting(editor, dir)
  } else {
    return console.log("Type 'atom' or 'subl' to set editor")
  }
}

// is it a branch being set
if (args.length > 0 && args[0] === 'gh') branch = "gh-pages"
if (args.length > 0 && !args[0].match('--editor')) branch = args[0]

// see if user had set editor
fs.open(dir, 'r+', function(err, fd) {
  if (err && err.errno === 34) {
    return buildCommands(editor)
  } else if (err) return console.log(err)
  getEditor(dir)
})

// if config exists, read it to get editor
function getEditor(dir){
  fs.readFile(dir, function (err, data) {
    if (err) return console.log(err)
    editor = JSON.parse(data.toString())
    buildCommands(editor)
  })
}

var diff = "git diff --name-only origin/" + branch + "..."

function buildCommands(editor) {
  exec(diff, function(err, stdout, stdrr) {
  var files = stdout.split('\n')
  var command = ""
  counter = 0

  if (files.length === 1 && files[0] === '') {
    return console.log("No dirty files.")
  }

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
}

function writeSetting(editor, dir) {
  fs.writeFile(dir, {'editor': editor}, function (err) {
  if (err) throw err;
})
}