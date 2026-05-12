import React, { useState, useEffect, useCallback } from 'react';
import { useProiectant } from '../hooks/useProiectant';
import { SaveIndicator } from './SaveIndicator';
import { debounce } from '../utils/debounce';

export function SettingsProfilulMeu() {
  const { proiectant, saveProiectant, loading, error } = useProiectant();
  const [formData, setFormData] = useState({
    nume: '',
    titlu: '',
    nr_legitimatie: '',
    firma: '',
    cui: '',
    adresa: '',
    telefon: '',
    email: ''
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Pre-populate form cu datele salvate
  useEffect(() => {
    if (proiectant) {
      setFormData({
        nume: proiectant.nume || '',
        titlu: proiectant.titlu || '',
        nr_legitimatie: proiectant.nr_legitimatie || '',
        firma: proiectant.firma || '',
        cui: proiectant.cui || '',
        adresa: proiectant.adresa || '',
        telefon: proiectant.telefon || '',
        email: proiectant.email || ''
      });
    }
  }, [proiectant]);

  // Debounced save
  const debouncedSave = useCallback(
    debounce(async (data) => {
      setSaving(true);
      setSaveError(null);
      const { error: err } = await saveProiectant(data);
      if (err) {
        setSaveError(err.message || 'Eroare la salvare');
      }
      setSaving(false);
    }, 1000),
    [saveProiectant]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    debouncedSave(newData);
  };

  if (loading) {
    return <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>Se încarcă profilul...</div>;
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 24px 0' }}>
          Profilul meu
        </h2>

        <div style={{ space: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Nume */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              Nume complet
            </label>
            <input
              type="text"
              name="nume"
              value={formData.nume}
              onChange={handleChange}
              placeholder="Popescu Ion"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Titlu profesional */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              Titlu profesional
            </label>
            <select
              name="titlu"
              value={formData.titlu}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                background: 'white'
              }}
            >
              <option value="">-- Selectează --</option>
              <option value="Arhitect">Arhitect</option>
              <option value="Urbanist">Urbanist</option>
              <option value="Inginer">Inginer</option>
              <option value="Altul">Altul</option>
            </select>
          </div>

          {/* Nr legitimatie */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              Nr. legitimație RUR/OAR
            </label>
            <input
              type="text"
              name="nr_legitimatie"
              value={formData.nr_legitimatie}
              onChange={handleChange}
              placeholder="ex: RUR-1234567"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Firma */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              Firmă / Birou de proiectare
            </label>
            <input
              type="text"
              name="firma"
              value={formData.firma}
              onChange={handleChange}
              placeholder="ex: Popescu & Asociații SRL"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* CUI */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              CUI Firmă
            </label>
            <input
              type="text"
              name="cui"
              value={formData.cui}
              onChange={handleChange}
              placeholder="ex: RO12345678"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Adresa */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              Adresă Firmă
            </label>
            <input
              type="text"
              name="adresa"
              value={formData.adresa}
              onChange={handleChange}
              placeholder="ex: Bd. Libertății 123, Cluj-Napoca"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Telefon */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              Telefon
            </label>
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="ex: +40 264 123 456"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '8px' }}>
              Email profesional
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ex: ion@popescu.ro"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Save indicator */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SaveIndicator isSaving={saving} error={saveError} />
          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
            Aceste date apar automat pe toate documentele generate.
          </p>
        </div>
      </div>
    </div>
  );
}
