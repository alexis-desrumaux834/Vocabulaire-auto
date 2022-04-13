import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');

//common
import { VocabularyFile } from 'common/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const vocab: VocabularyFile = require('config/vocabulaire.json')

    if (!('form' in req.body)) return res.status(400).send({})
    if (!('word' in req.body.form)) return res.status(400).send({})
    if (!('translation' in req.body.form)) return res.status(400).send({})
    if (!('pronunciation' in req.body.form)) return res.status(400).send({})
    let newVocab: VocabularyFile = {
      ...vocab,
      words: [
        ...vocab.words,
        {
          word: req.body.form.word,
          translation: req.body.form.translation,
          pronunciation: req.body.form.pronunciation,
        },
      ],
    }
    fs.writeFileSync('config/vocabulaire.json', JSON.stringify(newVocab))
    res.status(200).send(newVocab);
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
}
