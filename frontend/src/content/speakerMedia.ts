const publicImage = (folder: string, file: string) => encodeURI(`/manish/${folder}/${file}`)

const mainPortraits = [
  publicImage('MAIN photo', '1I2A3537.jpg'),
  publicImage('MAIN photo', '1I2A3642.jpg'),
  publicImage('MAIN photo', '1I2A3677.jpg'),
  publicImage('MAIN photo', '1I2A3897.jpg'),
  publicImage('MAIN photo', '1Q2A4315.JPG'),
  publicImage('MAIN photo', '1Q2A4319.JPG'),
  publicImage('MAIN photo', '1Q2A4325.JPG'),
  publicImage('MAIN photo', '1Q2A4355.JPG'),
  publicImage('MAIN photo', 'KPCL5172.JPG'),
]

const crowdPhotos = [
  publicImage('Crowd PHOTO', '1I2A3376.jpg'),
  publicImage('Crowd PHOTO', '1I2A3456.jpg'),
  publicImage('Crowd PHOTO', '1I2A3593.jpg'),
  publicImage('Crowd PHOTO', '1I2A3594.jpg'),
  publicImage('Crowd PHOTO', '1I2A3724.jpg'),
  publicImage('Crowd PHOTO', '1I2A3805.jpg'),
  publicImage('Crowd PHOTO', 'A21I9976.JPG'),
  publicImage('Crowd PHOTO', 'A21I9980.JPG'),
]

const momentsPhotos = [
  publicImage('MOMENTS PHOTO', '1I2A3781.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3785.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3828.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3837.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3840.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3875.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3882.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3885.jpg'),
]

export const speakerMedia = {
  heroStage: mainPortraits[8],
  heroSupport: crowdPhotos[4],
  aboutPortrait: mainPortraits[3],
  footerPortrait: mainPortraits[5],
  homePreview: [mainPortraits[1], crowdPhotos[2], crowdPhotos[5], momentsPhotos[1]],
  mainPortraits,
  crowdPhotos,
  momentsPhotos,
  allPhotos: [...mainPortraits, ...crowdPhotos, ...momentsPhotos],
} as const
