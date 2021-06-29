// List all files in a directory in Node.js recursively in a synchronous fashion
const fs = require('fs')
const path = require('path')
const {isDirectory, isREADME} = require('./helpers')

const processDirectorySync = addToc => (dir, filelist) => {
  
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    const normalizedPath = path.resolve(dir, file);
    
    if ( isDirectory(normalizedPath) ) {
      filelist = processDirectorySync(addToc)(normalizedPath, filelist);
    }
    else {
      if (isREADME(normalizedPath)) {
        console.log(`✅ Found README at ${normalizedPath}`)
        console.log(`Adding TOC...`)
        addToc(normalizedPath)
      }
      console.log(filelist)
      filelist.push(file);
    }
  });
  return filelist;
};

module.exports = processDirectorySync