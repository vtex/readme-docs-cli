import { Command, flags } from '@oclif/command'
import Readme from '../clients/readme'
import { convertSlugToApiFormat } from '../utils'
import * as fs from 'fs-extra'
import * as path from 'path'

export default class ChangeCategory extends Command {
  static description = 'Change category of a documentation'

  static examples = [
    `$ readme change-category "vtex_io-documentation_customizing-your-stores-typography" "Style Recipes"`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    { name: 'docSlug', required: true },
    { name: 'newCategorySlug', required: true },
  ]

  static configurationFormat = {
    API_KEY: 'YOUR_API_KEY',
    VERSION: 'YOUR_README_VERSION'
  }

  async run() {
    const {
      args: { docSlug, newCategorySlug },
    } = this.parse(ChangeCategory) as { args: Args }

    try {
      const { API_KEY, VERSION }: ReadmeConfig = await fs.readJSON(path.join(this.config.configDir, 'readme-config.json'))
      const readmeClient = new Readme(API_KEY, VERSION)
      const newCategoryId = (await readmeClient.getCategory(convertSlugToApiFormat(newCategorySlug)))._id
      await readmeClient.updateDoc(docSlug, { category: newCategoryId, parentDoc: null })
      this.log(`Changed category of doc ${docSlug} to ${newCategorySlug}`)
    } catch(e) {
      if (e.code === 'ENOENT') {
        this.error(`Config file not found in ${path.join(this.config.configDir, 'readme-config.json')}. Use the following format to create it ${JSON.stringify(ChangeCategory.configurationFormat)}`)
      }
    }
  }
}

interface Args {
  docSlug: string
  newCategorySlug: string
}

interface ReadmeConfig {
  API_KEY: string
  VERSION: string}
