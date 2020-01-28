const app = require('express')();


app.get('/pdf', (req, res) => {
    var docDefinition = {
        content: [
            { text: 'This is a header', style: 'header' },
            'No styling here, this is a standard paragraph',
            { text: 'Another text', style: 'anotherStyle' },
            { text: 'Multiple styles applied', style: ['header', 'anotherStyle'] }
        ],

        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            anotherStyle: {
                italics: true,
                alignment: 'right'
            }
        }
    };
    try {
        // Define font files
        var fonts = {
            Roboto: {
                normal: 'Courier',
                bold: 'Courier-Bold',
                italics: 'Courier-Oblique',
                bolditalics: 'Courier-BoldOblique'
            }
        };

        var PdfPrinter = require('pdfmake');
        var printer = new PdfPrinter(fonts);
        var fs = require('fs');

        var docDefinition = {
            content: [
              'Bulleted list example:',
              {
                // to treat a paragraph as a bulleted list, set an array of items under the ul key
                ul: [
                  'Item 1',
                  'Item 2',
                  'Item 3',
                  { text: 'Item 4', bold: true },
                ]
              },
          
              'Numbered list example:',
              {
                // for numbered lists set the ol key
                ol: [
                  'Item 1',
                  'Item 2',
                  'Item 3'
                ]
              }
            ]
          };

        var options = {
            // ...
        }

        var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        pdfDoc.pipe(fs.createWriteStream('document.pdf'));
        pdfDoc.end();
        res.json({ x: PdfPrinter.createPdf(docDefinition).download() })
    }
    catch (error) {
        console.log(error)
        res.json({ error })
    }

})

app.listen(4000, () => console.log(`Example app listening on port localhost${4000}!`))