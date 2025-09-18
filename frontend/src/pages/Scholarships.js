import React, { useState } from 'react';

const Scholarships = () => {
  const [filters, setFilters] = useState({ income: '', state: '', degree: '', gender: '' });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const search = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/scholarships/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });
      const data = await res.json();
      setResults(data.items || []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="card card-hover" style={{ padding: '1rem', marginTop: '1rem' }}>
      <h2>🎓 Scholarships</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
        <input name="income" placeholder="Annual Income (₹)" value={filters.income} onChange={onChange} />
        <input name="state" placeholder="State" value={filters.state} onChange={onChange} />
        <select name="degree" value={filters.degree} onChange={onChange}>
          <option value="">Degree</option>
          <option>B.Tech</option>
          <option>B.Sc</option>
          <option>B.Com</option>
          <option>B.A</option>
        </select>
        <select name="gender" value={filters.gender} onChange={onChange}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button className="btn btn-primary" onClick={search}>Search</button>
      </div>

      {loading ? (
        <div className="loading" style={{ marginTop: '1rem' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div>
      ) : (
        <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
          {results.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🔍</div>No scholarships found. Try adjusting filters.</div>
          ) : (
            results.map(s => (
              <div key={s.id} className="card card-hover" style={{ padding: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4>{s.name}</h4>
                    <div style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>{s.provider} • {s.category}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div><strong>₹{s.amount?.toLocaleString?.() || s.amount}</strong></div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>Deadline: {s.deadline}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Scholarships;


