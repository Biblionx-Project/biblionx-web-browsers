module.exports = {
  ROOT_PATH: process.env.ROOT_PATH || '../../widget/app/',

  DICTIONARY_URL: process.env.DICTIONARY_URL || 'http://localhost:8000/api/v1/words',
  REVIEW_URL: process.env.REVIEW_URL || 'http://localhost:8000/api/v1/review',
  SIGNS_URL: process.env.SIGNS_URL || 'http://localhost:8000/extracted_images',
};
