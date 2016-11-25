'use strict'

const fs = require('fs')
const Docxtemplater = require('docxtemplater')
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const functions = require('./functions')

const ROUTE = `${__dirname}/.temp/`

let tokens = []

if (!fs.existsSync(ROUTE)){
    fs.mkdirSync(ROUTE);
}

function prepListXML(unnumbered_clause) {
    let words = unnumbered_clause.split(' ')
    let normal_text = ""

    while(words.length > 2) {
        normal_text = ` ${words.pop()}${normal_text}`
    }

    return `<w:p>
        <w:pPr>
            <w:pStyle w:val="ListParagraph" />
            <w:numPr>
                <w:ilvl w:val="0" />
                <w:numId w:val="1" />
            </w:numPr>
            <w:jc w:val="both" />
            <w:rPr>
                <w:rFonts w:ascii="Palatino" w:eastAsia="Times New Roman" w:hAnsi="Palatino" w:cs="Times New Roman" />
            </w:rPr>
        </w:pPr>
        <w:r>
            <w:rPr>
                <w:rFonts w:ascii="Palatino" w:eastAsia="Times New Roman" w:hAnsi="Palatino" w:cs="Times New Roman" />
                <w:smallCaps />
            </w:rPr>
            <w:t xml:space="preserve">${words[0]} ${words[1]}</w:t>
        </w:r>
        <w:r>
            <w:rPr>
                <w:rFonts w:ascii="Palatino" w:eastAsia="Times New Roman" w:hAnsi="Palatino" w:cs="Times New Roman" />
            </w:rPr>
            <w:t xml:space="preserve">${normal_text}</w:t>
        </w:r>
    </w:p>`
}

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static(__dirname + '/public'))
app.use('/api', require('./routes/index.js'));

app.get('/export/:token', function (req,res) {
    const index = tokens.indexOf(req.params.token);

    if(index == -1) {
        res.sendStatus(404);
        return;
    }

    res.download(`${ROUTE}${req.params.token}.docx`, `motion_${req.params.token}.docx`);
    // fs.unlinkSync(`${ROUTE}${req.params.token}.docx`);
    tokens.splice(index, 1);
});

app.post('/export', function(req, res) {
    let motion = req.body

    motion.numberedClauses = req.body.operativeClauses
    motion.operativeClauses = [{ clause: req.body.resolves }]
    motion.date = functions.formatDate(req.body.date)
    motion.leg = req.body.shortName[0]
    motion.yr = req.body.yearNum
    motion.num = req.body.motionNum || "#"
    motion.ordinal = req.body.yearNum ? functions.ordinal(req.body.yearNum) : "TBD"

    for(let i = 0; i < motion.whereasClauses.length; i++) {
        motion.whereasClauses[i].clause += functions.getWhereasSeparator(i, motion.whereasClauses.length)
    }

    for(let i = 0; i < motion.numberedClauses.length; i++) {
        motion.numberedClauses[i].clause_xml = prepListXML(`To ${motion.numberedClauses[i].verb} ${motion.numberedClauses[i].clause}${functions.getOperativeSeparator(i, motion.numberedClauses.length)}`)
    }

    // let whereas_clauses = []
    // let operative_clauses = []
    // let numbered_clauses = []

    // if(motion.text.trim().split(' ')[0].toLowerCase() === 'whereas') {
    //     const lines = motion.text.trim().split('\n')
    //
    //     for(let l of lines) {
    //         let first_word = l.split(' ')[0]
    //         if(first_word.trim().toLowerCase() === 'whereas') {
    //             whereas_clauses.push({ clause_text: l.split(first_word).pop().trim() })
    //         } else if(/^\d+\. /m.test(l.trim())) {
    //             let unnumbered = l.trim().substr(l.trim().indexOf(" ") + 1)
    //             numbered_clauses.push({ clause_xml: prepListXML(unnumbered) })
    //         } else {
    //             operative_clauses.push({ clause_text: l.trim() })
    //         }
    //     }
    // } else {
    //     console.log('no whereas')
    // }

    // motion.date = functions.formatDate(motion.date)
    // motion.leg = motion.legislation_prefix
    // motion.yr = motion.year_num
    // motion.num = motion.motion_num || "#"
    // motion.whereases = whereas_clauses
    // motion.operatives = operative_clauses
    // motion.numbereds = numbered_clauses
    // motion.ordinal = motion.year_num ? functions.ordinal(motion.year_num) : "TBD"

    let doc = new Docxtemplater(fs.readFileSync(__dirname + "/motion_template.docx", "binary"))

    doc.setData(motion)

    doc.render()

    crypto.randomBytes(16, function(err, buffer) {
        let token = buffer.toString('hex')

        tokens.push(token)

        fs.writeFileSync(`${ROUTE}${token}.docx`, doc.getZip().generate({ type:"nodebuffer" }))

        res.send(token)

        console.log(`Successfully exported to: ${ROUTE}${token}.docx`)
    })
})

app.listen(3000, () => console.log("Listening..."));

function exitHandler(options, err) {
    if(options.cleanup) {
        fs.readdirSync(ROUTE).forEach(file => fs.unlinkSync(`${ROUTE}${file}`))
        fs.rmdirSync(ROUTE)
        process.exit()
    } else {
        console.log('\nTerminating... temp docx files deleted')
    }
}

process.on('exit', exitHandler.bind(null, { cleanup: false }));
process.on('SIGINT', exitHandler.bind(null, { cleanup: true }));
