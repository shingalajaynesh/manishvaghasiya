import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.resolve(__dirname, '../public')
const outOptDir = path.resolve(publicDir, 'manish/opt')
const outBooksOptDir = path.resolve(publicDir, 'books/images/opt')

if (!fs.existsSync(outOptDir)) {
  fs.mkdirSync(outOptDir, { recursive: true })
}
if (!fs.existsSync(outBooksOptDir)) {
  fs.mkdirSync(outBooksOptDir, { recursive: true })
}

// 1. Critical Hero & Speaker Images
const imagesToOptimize = [
  { in: 'manish/MAIN photo/KPCL5172.JPG', out: 'hero-stage.webp', width: 900, quality: 82 },
  { in: 'manish/Crowd PHOTO/1I2A3724.jpg', out: 'hero-support.webp', width: 800, quality: 80 },
  { in: 'manish/MAIN photo/1I2A3897.jpg', out: 'about-portrait.webp', width: 900, quality: 82 },
  { in: 'manish/MAIN photo/1Q2A4319.JPG', out: 'footer-portrait.webp', width: 400, quality: 80 },
  { in: 'manish/MAIN photo/1I2A3537.jpg', out: 'main-1.webp', width: 800, quality: 80 },
  { in: 'manish/MAIN photo/1I2A3642.jpg', out: 'main-2.webp', width: 800, quality: 80 },
  { in: 'manish/MAIN photo/1I2A3677.jpg', out: 'main-3.webp', width: 800, quality: 80 },
  { in: 'manish/MAIN photo/1Q2A4315.JPG', out: 'main-4.webp', width: 800, quality: 80 },
  { in: 'manish/MAIN photo/1Q2A4325.JPG', out: 'main-5.webp', width: 800, quality: 80 },
  { in: 'manish/MAIN photo/1Q2A4355.JPG', out: 'main-6.webp', width: 800, quality: 80 },
  { in: 'manish/Crowd PHOTO/1I2A3376.jpg', out: 'crowd-1.webp', width: 900, quality: 78 },
  { in: 'manish/Crowd PHOTO/1I2A3456.jpg', out: 'crowd-2.webp', width: 900, quality: 78 },
  { in: 'manish/Crowd PHOTO/1I2A3593.jpg', out: 'crowd-3.webp', width: 900, quality: 78 },
  { in: 'manish/Crowd PHOTO/1I2A3594.jpg', out: 'crowd-4.webp', width: 900, quality: 78 },
  { in: 'manish/Crowd PHOTO/1I2A3805.jpg', out: 'crowd-5.webp', width: 900, quality: 78 },
  { in: 'manish/Crowd PHOTO/A21I9976.JPG', out: 'crowd-6.webp', width: 900, quality: 78 },
  { in: 'manish/Crowd PHOTO/A21I9980.JPG', out: 'crowd-7.webp', width: 900, quality: 78 },
  { in: 'manish/MOMENTS PHOTO/1I2A3781.jpg', out: 'moments-1.webp', width: 800, quality: 80 },
  { in: 'manish/MOMENTS PHOTO/1I2A3785.jpg', out: 'moments-2.webp', width: 800, quality: 80 },
  { in: 'manish/MOMENTS PHOTO/1I2A3828.jpg', out: 'moments-3.webp', width: 800, quality: 80 },
  { in: 'manish/MOMENTS PHOTO/1I2A3837.jpg', out: 'moments-4.webp', width: 800, quality: 80 },
  { in: 'manish/MOMENTS PHOTO/1I2A3840.jpg', out: 'moments-5.webp', width: 800, quality: 80 },
  { in: 'manish/MOMENTS PHOTO/1I2A3875.jpg', out: 'moments-6.webp', width: 800, quality: 80 },
  { in: 'manish/MOMENTS PHOTO/1I2A3882.jpg', out: 'moments-7.webp', width: 800, quality: 80 },
  { in: 'manish/MOMENTS PHOTO/1I2A3885.jpg', out: 'moments-8.webp', width: 800, quality: 80 },
]

async function run() {
  console.log('Optimizing images for Core Web Vitals (LCP < 2.5s)...')

  for (const img of imagesToOptimize) {
    const inputPath = path.resolve(publicDir, img.in)
    const outputPath = path.resolve(outOptDir, img.out)

    if (fs.existsSync(inputPath)) {
      const startSize = fs.statSync(inputPath).size
      await sharp(inputPath)
        .resize({ width: img.width, withoutEnlargement: true })
        .webp({ quality: img.quality })
        .toFile(outputPath)

      const endSize = fs.statSync(outputPath).size
      console.log(`[OPT] ${img.out}: ${(startSize / 1024 / 1024).toFixed(2)}MB -> ${(endSize / 1024).toFixed(1)}KB (${Math.round((1 - endSize / startSize) * 100)}% reduction)`)
    } else {
      console.warn(`[WARN] File not found: ${inputPath}`)
    }
  }

  // Optimize book covers if present
  const bookImages = [
    { in: 'books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png', out: 'jivan-jitvu-che-cover.webp' },
    { in: 'books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png', out: 'man-haryu-to-badhu-haryu-cover.webp' }
  ]

  for (const b of bookImages) {
    const inputPath = path.resolve(publicDir, b.in)
    const outputPath = path.resolve(outBooksOptDir, b.out)
    if (fs.existsSync(inputPath)) {
      const startSize = fs.statSync(inputPath).size
      await sharp(inputPath)
        .resize({ width: 500, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath)
      const endSize = fs.statSync(outputPath).size
      console.log(`[OPT BOOK] ${b.out}: ${(startSize / 1024).toFixed(1)}KB -> ${(endSize / 1024).toFixed(1)}KB`)
    }
  }

  console.log('Image optimization complete!')
}

run().catch(console.error)
