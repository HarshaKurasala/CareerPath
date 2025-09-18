const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const loadScholarships = () => {
  try {
    const filePath = path.join(__dirname, '../../database/seed_data/scholarships.json');
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
};

router.post('/search', (req, res) => {
  const { income, state, degree, gender, category } = req.body || {};
  const all = loadScholarships();

  const results = all.filter(s => {
    const el = s.eligibility || {};
    const byIncome = income ? Number(income) <= (el.incomeMax || Number.MAX_SAFE_INTEGER) : true;
    const byState = state ? (el.state === 'All' || el.state.toLowerCase() === String(state).toLowerCase()) : true;
    const byDegree = degree ? (Array.isArray(el.degree) && el.degree.some(d => d.toLowerCase() === String(degree).toLowerCase())) : true;
    const byGender = gender ? (el.gender === 'Any' || el.gender.toLowerCase() === String(gender).toLowerCase()) : true;
    const byCategory = category ? (s.category && s.category.toLowerCase() === String(category).toLowerCase()) : true;
    return byIncome && byState && byDegree && byGender && byCategory;
  });

  res.json({ total: results.length, items: results });
});

module.exports = router;


