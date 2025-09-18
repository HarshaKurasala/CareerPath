import React, { useEffect, useState } from 'react';

const Colleges = () => {
  const [filters, setFilters] = useState({ q: '', state: '', degree: '', lang: '', facility: '' });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const onChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams(Object.entries(filters).filter(([, v]) => v));
    try {
      const res = await fetch(`http://localhost:5000/api/colleges?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card card-hover" style={{ padding: '1rem', marginTop: '1rem' }}>
      <h2>🏫 Colleges Directory</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
        <input name="q" placeholder="Search name or district" value={filters.q} onChange={onChange} />
        <input name="state" placeholder="State" value={filters.state} onChange={onChange} />
        <select name="degree" value={filters.degree} onChange={onChange}>
          <option value="">Degree</option>
          <option>B.Tech</option>
          <option>B.Sc</option>
          <option>B.Com</option>
          <option>B.A</option>
        </select>
        <input name="lang" placeholder="Language" value={filters.lang} onChange={onChange} />
        <input name="facility" placeholder="Facility (Hostel, Library)" value={filters.facility} onChange={onChange} />
        <button className="btn btn-primary" onClick={load}>Search</button>
      </div>

      {loading ? (
        <div className="loading" style={{ marginTop: '1rem' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div>
      ) : (
        <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
          {items.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🔍</div>No colleges found.</div>
          ) : (
            items.map(c => (
              <div key={c.id} className="card card-hover" style={{ padding: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4>{c.name}</h4>
                    <div style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>{c.district}, {c.state}</div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                    <div>Degrees: {c.degrees?.join(', ')}</div>
                    <div>Facilities: {c.facilities?.join(', ')}</div>
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

export default Colleges;


