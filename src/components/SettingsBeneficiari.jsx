import React, { useState } from 'react';
import { useBeneficiari } from '../hooks/useBeneficiari';
import { SaveIndicator } from './SaveIndicator';

export function SettingsBeneficiari() {
  const { beneficiari, saveBeneficiar, deleteBeneficiar, loading, error } = useBeneficiari();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleAddNew = async () => {
    setSaving(true);
    setSaveError(null);
    const { error: err } = await saveBeneficiar({
      nume: 'Beneficiar nou',
      tip: 'persoana_fizica'
    });
    if (err) {
      setSaveError(err.message);
    }
    setSaving(false);
  };

  const handleEdit = (beneficiar) => {
    setEditingId(beneficiar.id);
    setEditData(beneficiar);
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    setSaveError(null);
    const { error: err } = await saveBeneficiar(editData);
    if (err) {
      setSaveError(err.message);
    } else {
      setEditingId(null);
    }
    setSaving(false);
  };

  const handleDeleteClick = async (id) => {
    if (confirm('Sigur vrei să ștergi acest beneficiar?')) {
      await deleteBeneficiar(id);
    }
  };

  if (loading) {
    return <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>Se încarcă beneficiarii...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
            Beneficiari
          </h2>
          <button
            onClick={handleAddNew}
            style={{
              padding: '8px 16px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            + Adaugă beneficiar
          </button>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#991b1b',
            marginBottom: '16px',
            fontSize: '13px'
          }}>
            Eroare: {error}
          </div>
        )}

        {beneficiari.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 24px',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              Nu ai beneficiari salvați. Adaugă-i pentru a-i reutiliza în proiecte.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Nume</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Tip</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>CUI/CNP</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#1a1a1a' }}>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {beneficiari.map(ben => (
                  <tr
                    key={ben.id}
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      background: editingId === ben.id ? '#f0f9ff' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '12px' }}>
                      {editingId === ben.id ? (
                        <input
                          type="text"
                          value={editData.nume || ''}
                          onChange={(e) => setEditData({ ...editData, nume: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #2563eb',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontFamily: 'inherit'
                          }}
                        />
                      ) : (
                        ben.nume
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {editingId === ben.id ? (
                        <select
                          value={editData.tip || 'persoana_fizica'}
                          onChange={(e) => setEditData({ ...editData, tip: e.target.value })}
                          style={{
                            padding: '6px 8px',
                            border: '1px solid #2563eb',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            background: 'white'
                          }}
                        >
                          <option value="persoana_fizica">PF</option>
                          <option value="persoana_juridica">PJ</option>
                        </select>
                      ) : (
                        ben.tip === 'persoana_fizica' ? 'PF' : 'PJ'
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {editingId === ben.id ? (
                        <input
                          type="text"
                          value={editData.cnp_cui || ''}
                          onChange={(e) => setEditData({ ...editData, cnp_cui: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #2563eb',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontFamily: 'inherit'
                          }}
                        />
                      ) : (
                        ben.cnp_cui || '—'
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {editingId === ben.id ? (
                        <input
                          type="email"
                          value={editData.email || ''}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #2563eb',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontFamily: 'inherit'
                          }}
                        />
                      ) : (
                        ben.email || '—'
                      )}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {editingId === ben.id ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={handleSaveEdit}
                            style={{
                              padding: '6px 12px',
                              background: '#2563eb',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Salvează
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            style={{
                              padding: '6px 12px',
                              background: '#e5e7eb',
                              color: '#666',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Anulează
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEdit(ben)}
                            style={{
                              padding: '6px 12px',
                              background: '#f0f0f0',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              color: '#1a1a1a'
                            }}
                          >
                            Editează
                          </button>
                          <button
                            onClick={() => handleDeleteClick(ben.id)}
                            style={{
                              padding: '6px 12px',
                              background: '#fee2e2',
                              border: '1px solid #fecaca',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              color: '#dc2626'
                            }}
                          >
                            Șterge
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {saving && <SaveIndicator isSaving={true} error={saveError} />}
      </div>
    </div>
  );
}
