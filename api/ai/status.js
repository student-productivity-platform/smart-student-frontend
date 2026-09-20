module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  const currentModel = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim();

  return res.status(200).json({
    configured: !!apiKey,
    model: currentModel,
    provider: apiKey ? `Google Gemini Backend (${currentModel})` : 'Local Offline Engine'
  });
};
