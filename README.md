### ~~open-dirty~~ ~~dirtydirty~~ odb

Opening dirty files from a branch.

---

**WIP NOT READY FOR GENERAL USE YET**

**I want to `checkout` the branch I'm working on then open all the files I've been working on, in that branch, in my text editor.** I don't want to fuzzy find them or search through the tree for them or open them once and leave the window open until the PR is merged... No, no. 

**What ODB does**

It runs `git diff --name-only origin/master...` the same as you could do on the command line. This gets a list of the files that include changes not on `master`. ODB then creates another command for opening the text editor with each of those files. It then runs that command. 

## How to Use

You'll need to have installed [Node.js](http://nodejs.org/download) to run ODB and of course [Git](http://git-scm.com/downloads). 

**Install**

```bash
$ npm install -g odb
```

**Use**

After you `cd` into the directory for the repo you're working on, run ODB:

```bash
$ cd <RepoDirectory>
$ od
```

The dirty files will open in your text editor :)

## Future

- Need to add config for setting your editor preference
- Command line option for a shortcut setting the branch you're comparing to (master, gh-pages : m, gh)



