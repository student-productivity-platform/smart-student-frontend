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
  const question = (payload.question || '').trim();
  const subject = (payload.subject || 'General Engineering').trim();
  const difficulty = (payload.difficulty || 'Intermediate').trim();
  const tutorMode = !!payload.tutorMode;
  const history = Array.isArray(payload.history) ? payload.history : [];
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];

  if (!question && attachments.length === 0) {
    return res.status(400).json({ success: false, error: 'Question text or attachment is required.' });
  }

  if (!apiKey) {
    return res.status(200).json({
      success: false,
      backendKeyConfigured: false,
      message: 'No GEMINI_API_KEY configured in environment.'
    });
  }

  const systemInstruction = `You are the Smart Student Academic AI Tutor, an expert engineering professor.
Subject Domain: ${subject}. Target Level: ${difficulty}.
${tutorMode ? `
SOCRATIC TUTOR MODE ACTIVE:
- Do NOT provide the complete final solution immediately.
- Use the Socratic inquiry method: decompose the concept into foundational questions.
- Ask the student targeted questions to help them derive the theorem, algorithm, or solution step-by-step.
- Acknowledge what they got right and guide them past misconceptions.
` : `
RESPONSE GUIDELINES:
1. Provide a rigorous, crystal-clear conceptual foundation with formal academic terminology.
2. Provide step-by-step mathematical derivations or canonical algorithmic steps using LaTeX math notation ($...$ inline or $$...$$ block notation).
3. Provide clean, production-grade code implementations with syntax highlighting markers (\`\`\`python, \`\`\`cpp, \`\`\`sql, etc.).
4. Include practical university examination takeaways, edge cases, and Big-O runtime/space complexities.
`}
Always output clean, readable, well-structured GitHub-Flavored Markdown.`;

  const contents = [];
  for (const h of history) {
    if (!h.content) continue;
    const role = h.role === 'assistant' || h.role === 'model' ? 'model' : 'user';
    contents.push({
      role: role,
      parts: [{ text: h.content }]
    });
  }

  const currentParts = [{ text: question || 'Please analyze the attached image/diagram.' }];
  for (const att of attachments) {
    if (att.data && att.type && att.type.startsWith('image/')) {
      const base64Data = att.data.includes(',') ? att.data.split(',')[1] : att.data;
      currentParts.push({
        inline_data: {
          mime_type: att.type,
          data: base64Data
        }
      });
    }
  }
  contents.push({ role: 'user', parts: currentParts });

  const candidateModels = [model, 'gemini-3.6-flash', 'gemini-2.5-flash'].filter((v, i, a) => a.indexOf(v) === i);
  let lastError = null;

  for (const candidateModel of candidateModels) {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${candidateModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

    try {
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          system_instruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            temperature: tutorMode ? 0.4 : 0.2,
            topP: 0.95,
            maxOutputTokens: 3000
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        lastError = (data && data.error && data.error.message) ? data.error.message : `HTTP Error ${response.status}`;
        continue;
      }

      if (data.candidates && data.candidates[0]?.content?.parts) {
        const answerText = data.candidates[0].content.parts.map(p => p.text || '').join('');
        return res.status(200).json({
          success: true,
          answer: answerText,
          model: candidateModel,
          provider: `Google Gemini Backend (${candidateModel})`
        });
      }
    } catch (err) {
      lastError = err.message || 'Network error';
    }
  }

  return res.status(502).json({ success: false, error: lastError || 'All Gemini AI models temporarily unavailable.' });
};
