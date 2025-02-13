const marked = require('marked');
const { htmlToBlocks } = require('@portabletext/block-tools');
const jsdom = require('jsdom')
const { JSDOM } = jsdom

/**
 *  block tools needs a schema definition to now what
 * types are available
 *  */
const defaultSchema = require('./defaultSchema')
const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find(field => field.name === 'body').type

function convertMarkdownToHTML(markdown) {
    return marked.parse(markdown);
}

function convertHTMLToPortableText(html) {
    return htmlToBlocks(html, blockContentType, {parseHtml: html => new JSDOM(html).window.document} );
}

function convertMarkdownToPortableText(markdown) {
    const html = convertMarkdownToHTML(markdown);
    return convertHTMLToPortableText(html);
}

module.exports = { convertMarkdownToPortableText, convertMarkdownToHTML, convertHTMLToPortableText };