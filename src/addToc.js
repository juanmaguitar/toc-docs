const toc = require('markdown-toc');
const uslug = require('uslug')
const {psReadFile, psWriteFile} = require('./helpers')

const MAX_DEPTH = 4

const customSlugParser = (headerDetected /*, optionsSlug */) => {
  const parsedHeader = headerDetected
  .replace(/html2react/g, 'html 2 react')
  .replace(/\./g, ' ')
  .replace(/[\[|\]]/g, ' ')
  .replace(/\<.*\>/g, '')
  
  
  const headerToWrite = uslug(parsedHeader)
  
  return headerToWrite
}

const addBlockTOC = contentFile => {
  const regExpHeadingTocWithTag = /#{2}\s.*\n+<!-- toc *-->/
  const isBlockToc = contentFile.search(regExpHeadingTocWithTag) !== -1
  
  if (isBlockToc) {
    console.log("This README has already a TOC")
    return contentFile
  }
  else {
    const regExpHeadingToc = /#{2}\s.*/
    return contentFile.replace(regExpHeadingToc, `
## Table of Contents

<!-- toc -->
<!-- tocstop -->

$&
    `)  
  }

}

const parseMarkdownTOC = contentFile => {

  const parsedContentFile = addBlockTOC(contentFile)

  return toc.insert(parsedContentFile, { 
    slugify: customSlugParser,
    maxdepth: MAX_DEPTH
  });
  
}

module.exports = fileToRead => {
  const fileToWrite = fileToRead
  const psWriteFileWithTarget = psWriteFile(fileToWrite)
  
  return psReadFile(fileToRead)
    .then(parseMarkdownTOC)
    .then(psWriteFileWithTarget)
    .then(console.log)
    .catch(console.log)
}