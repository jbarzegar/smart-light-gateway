// Startup
import * as fs from 'fs'
import * as path from 'path'
import * as moduleAlias from 'module-alias'

// Init mapped paths
;['config', 'lib']
  .map(x => [x, path.resolve(__dirname, '../', x)])
  .filter(([, p]) => fs.existsSync(p))
  .forEach(([name, p]) => moduleAlias.addAlias(`@${name}`, p))

moduleAlias.addPath(__dirname)

require('./app')
