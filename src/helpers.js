const fs = require('fs');
const path = require('path')

const psReadFile = fileToRead => new Promise( function(resolve, reject) {
  fs.readFile(fileToRead, 'utf8', (error, contentFile) => {
    if (error) reject(error)
    resolve(contentFile)
  })

})

const psWriteFile = fileToWrite => contentToWrite => 
new Promise(resolve => {
  fs.writeFile(fileToWrite, contentToWrite, error => {
    if (error) reject(error)
    resolve(`Results written succesfully`)
  })
})

const isDirectory = pathArg => fs.lstatSync(pathArg).isDirectory() 
const isREADME = pathArg => pathArg.search(/README\.md/) !== -1

module.exports = {psReadFile, psWriteFile, isDirectory, isREADME}