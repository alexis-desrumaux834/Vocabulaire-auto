import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');

//common
import { VocabularyFile } from 'common/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const vocab: VocabularyFile = require('config/vocabulaire.json')

    if (!('index' in req.body)) return res.status(400).send({})
    vocab.words.splice(req.body.index, 1);
    fs.writeFileSync('config/vocabulaire.json', JSON.stringify(vocab))
    res.status(200).send(vocab);
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
}
