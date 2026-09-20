module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'smart-student-university';
  const apiKey = process.env.CLOUDINARY_API_KEY || 'demo_key_7788';
  const timestamp = Math.round(new Date().getTime() / 1000);

  return res.status(200).json({
    timestamp,
    signature: 'signed_token_' + timestamp,
    apiKey: apiKey,
    cloudName: cloudName,
    folder: 'academic_submissions'
  });
};
