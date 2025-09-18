const express = require('express');
const router = express.Router();

router.post('/analyze', (req, res) => {
  const { interests = '', strengths = [], preferences = {} } = req.body || {};
  const text = String(interests).toLowerCase();

  // Simple stub logic
  let stream = 'Arts';
  let suggestedDegrees = ['B.A'];
  if (text.includes('tech') || text.includes('coding') || text.includes('math')) {
    stream = 'Science';
    suggestedDegrees = ['B.Tech', 'B.Sc'];
  } else if (text.includes('business') || text.includes('finance') || text.includes('account')) {
    stream = 'Commerce';
    suggestedDegrees = ['B.Com', 'BBA'];
  }

  res.json({
    stream,
    degrees: suggestedDegrees,
    strengths: strengths.slice(0, 5),
    recommendations: [
      'Explore degree comparison for salary and exams',
      'Take foundational online courses to validate interest',
      'Shortlist 3 colleges matching your preferences'
    ]
  });
});

module.exports = router;


