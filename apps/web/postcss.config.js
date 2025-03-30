import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  plugins: [tailwindcss(join(__dirname, 'tailwind.config.js')), autoprefixer()],
}
