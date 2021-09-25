import * as express from 'express'
import { json } from 'body-parser'
const app = express()

app.use(json())
app.post('/sync_bridge', (req, res) => {
  console.log('hello', req.body)

  return res.json({
    added: [],
    removed: [],
  })
})

app.listen(2000, () => {
  console.log('listening')
})
