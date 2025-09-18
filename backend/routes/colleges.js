const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

let colleges = [];

const loadColleges = () => {
  try {
    const filePath = path.join(__dirname, '../../database/seed_data/colleges.json');
    const content = fs.readFileSync(filePath, 'utf8');
    colleges = JSON.parse(content);
  } catch (e) {
    console.error("Error loading colleges:", e.message);
    colleges = [];
  }
};

// Load once at startup
loadColleges();

router.get('/', (req, res) => {
  const { q = '', state, degree, lang, facility, page = 1, limit = 20 } = req.query;

  let results = colleges.filter(c => {
    const matchesQ = q ? (c.name.toLowerCase().includes(String(q).toLowerCase()) || c.district.toLowerCase().includes(String(q).toLowerCase())) : true;
    const matchesState = state ? c.state.toLowerCase() === String(state).toLowerCase() : true;
    const matchesDegree = degree ? c.degrees.some(d => d.toLowerCase() === String(degree).toLowerCase()) : true;
    const matchesLang = lang ? c.languages.some(l => l.toLowerCase() === String(lang).toLowerCase()) : true;
    const matchesFacility = facility ? c.facilities.some(f => f.toLowerCase() === String(facility).toLowerCase()) : true;
    return matchesQ && matchesState && matchesDegree && matchesLang && matchesFacility;
  });

  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
  const start = (p - 1) * l;
  const paged = results.slice(start, start + l);

  res.json({ total: results.length, page: p, limit: l, items: paged });
});

module.exports = router;
