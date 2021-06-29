#!/usr/bin/env node

const pathArg = process.argv[2]

const {isDirectory, isREADME} = require('../src/helpers')
const addToc = require('../src/addToc')
const processDirectorySync = require('../src/processDirectorySync')

if (isDirectory(pathArg)) {
  console.log(`${pathArg} is a Directory (checking its content)`)
  processDirectorySync(addToc)(pathArg)
}
else if (!isREADME(pathArg)) {
  console.log(`${pathArg} is NOT a README`)
}
else {
  addToc(pathArg)
}
  

