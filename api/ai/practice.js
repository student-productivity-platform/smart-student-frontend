module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  const model = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim();

  const payload = req.body || {};
  const topic = (payload.topic || 'General STEM Concept').trim();
  const subject = (payload.subject || 'Computer Science').trim();

  if (!apiKey) {
    return res.status(200).json({
      success: false,
      backendKeyConfigured: false,
      message: 'No GEMINI_API_KEY configured in environment.'
    });
  }

  const prompt = `Generate a high-quality academic multiple-choice practice question for a university engineering student.
Topic: "${topic}"
Subject Domain: "${subject}"

Respond strictly with valid JSON conforming to this schema:
{
  "question": "A clear problem statement with specific constraints, formulas, or algorithmic invariants",
  "options": [
    "A) Option 1",
    "B) Option 2",
    "C) Option 3",
    "D) Option 4"
  ],
  "correctIndex": 0,
  "explanation": "A rigorous step-by-step derivation explaining why the correct choice holds and why others are invalid."
}`;

  const candidateModels = [model, 'gemini-3.6-flash', 'gemini-2.5-flash'].filter((v, i, a) => a.indexOf(v) === i);
  let lastError = null;

  for (const candidateModel of candidateModels) {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${candidateModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

    try {
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.3
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        lastError = (errData && errData.error && errData.error.message) ? errData.error.message : `HTTP Error ${response.status}`;
        continue;
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const raw = data.candidates[0].content.parts[0].text.trim();
        const cleaned = raw.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed && parsed.question && Array.isArray(parsed.options) && typeof parsed.correctIndex === 'number') {
          return res.status(200).json({
            success: true,
            question: {
              id: 'pq_vercel_' + Date.now(),
              topic: topic,
              subject: subject,
              question: parsed.question,
              options: parsed.options,
              correctIndex: parsed.correctIndex,
              explanation: parsed.explanation || 'Verified canonical solution.'
            }
          });
        }
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  return res.status(500).json({ success: false, error: lastError || 'Could not parse JSON question from Gemini.' });
};
