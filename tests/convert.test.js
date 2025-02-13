const { convertMarkdownToHTML, convertHTMLToPortableText, convertMarkdownToPortableText } = require('../src/convert');

describe('convertMarkdownToHTML', () => {
  it('should convert markdown to HTML', () => {
    const markdown = '# Hello World';
    const html = convertMarkdownToHTML(markdown);
    expect(html).toBe('<h1>Hello World</h1>\n');
  });
});

describe('convertHTMLToPortableText', () => {
  it('should convert HTML to Portable Text', () => {
    const html = '<h1>Hello World</h1>';
    const blocks = convertHTMLToPortableText(html);

    expect(blocks).toEqual([
    expect.objectContaining({
        _type: 'block',
        style: 'h1',
        markDefs: [],
        children: [
            expect.objectContaining({
            _type: 'span',
            text: 'Hello World',
            marks: []
            })
        ]
        })
    ]);
  });

  it('should handle empty HTML', () => {
    const html = '';
    const blocks = convertHTMLToPortableText(html);
    expect(blocks).toEqual([]);
  });
});

describe('convertMarkdownToPortableText', () => {
    it('should convert markdown to portable text', () =>
    {
        const markdown = '# Hello World';
        const blocks = convertMarkdownToPortableText(markdown);
        expect(blocks).toEqual([
            expect.objectContaining({
                _type: 'block',
                style: 'h1',
                markDefs: [],
                children: [
                    expect.objectContaining({
                        _type: 'span',
                        text: 'Hello World',
                        marks: []
                    })
                ]
            })
        ]);
    });
});