import { Command, flags } from '@oclif/command'
import Readme from '../clients/readme'
import { convertSlugToApiFormat } from '../utils'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as csv from 'fast-csv';

export default class BulkCategoryChange extends Command {
  static description = 'Change category of docs in bulk by reading a CSV file'

  static examples = [
    `$ readme bulk-category-change example.csv`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    { name: 'csvFilePath', required: true },
  ]

  static configurationFormat = {
    API_KEY: 'YOUR_API_KEY',
    VERSION: 'YOUR_README_VERSION'
  }

  async run() {
    const {
      args: { csvFilePath },
    } = this.parse(BulkCategoryChange) as { args: Args }

    try {
      const { API_KEY, VERSION }: ReadmeConfig = await fs.readJSON(path.join(this.config.configDir, 'readme-config.json'))
      const readmeClient = new Readme(API_KEY, VERSION)

        fs.createReadStream(path.resolve(csvFilePath))
        .pipe(csv.parse({ headers: true }))
        .on('data', async (row: CsvRow) => {
          const categoryId = await (await readmeClient.getCategory(convertSlugToApiFormat(row.category)))._id
          await readmeClient.updateDoc(row.slug, { category: categoryId, parentDoc: null })
          this.log(`Changed category of doc ${row.slug} to ${row.category}`)
        }).on('error', error => this.error(error.message))
        .on('end', (rowCount: number) => console.log(`There will be ${rowCount} docs updated`))
    } catch(e) {
      if (e.code === 'ENOENT') {
        this.error(`Config file not found in ${path.join(this.config.configDir, 'readme-config.json')}. Use the following format to create it ${JSON.stringify(BulkCategoryChange.configurationFormat)}`)
      }
    }
  }
}

interface Args {
  csvFilePath: string
}

interface ReadmeConfig {
  API_KEY: string
  VERSION: string
}

interface CsvRow {
  slug: string
  category: string
}
