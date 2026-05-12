import React, { useState, useCallback } from 'react';
import { useProiecte } from '../hooks/useProiecte';
import { SaveIndicator } from './SaveIndicator';
import { debounce } from '../utils/debounce';

/**
 * Exemplu: Cum să integrezi useProiecte în componenta existentă
 *
 * 1. Importă hook-urile la top
 * 2. Apelează hook-urile în componenta
 * 3. La onChange pe campos: apelează saveProiect() cu debounce
 * 4. Afișează SaveIndicator pentru feedback
 * 5. Prestabilește câmpurile cu datele salvate dacă exista
 */

export function ProiecteExample() {
  const { proiecte, saveProiect, deleteProiect, loading, error } = useProiecte();
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Debounced save
  const debouncedSave = useCallback(
    debounce(async (data) => {
      setSaving(true);
      await saveProiect(data);
      setSaving(false);
    }, 800),
    [saveProiect]
  );

  const handleFieldChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    // Auto-save pe fiecare change (cu debounce)
    debouncedSave({
      ...newData,
      id: editingId // Doar dacă editez proiect existent
    });
  };

  const handleCreateNew = async () => {
    setSaving(true);
    const result = await saveProiect({
      titlu: 'Proiect nou',
      status: 'activ'
    });
    if (result.data) {
      setEditingId(result.data.id);
      setFormData(result.data);
    }
    setSaving(false);
  };

  const handleSelectProiect = (proiect) => {
    setEditingId(proiect.id);
    setFormData(proiect);
  };

  const handleDelete = async (id) => {
    if (confirm('Sigur vrei să ștergi acest proiect?')) {
      await deleteProiect(id);
      setEditingId(null);
      setFormData({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Proiectele Mele</h2>
        <button
          onClick={handleCreateNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Proiect Nou
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista proiecte */}
        <div className="space-y-2">
          {loading ? (
            <p className="text-gray-500">Se încarcă...</p>
          ) : proiecte.length === 0 ? (
            <p className="text-gray-500">Niciun proiect încă</p>
          ) : (
            proiecte.map(proiect => (
              <div
                key={proiect.id}
                onClick={() => handleSelectProiect(proiect)}
                className={`p-3 rounded cursor-pointer transition ${
                  editingId === proiect.id
                    ? 'bg-blue-100 border border-blue-400'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <p className="font-semibold">{proiect.titlu}</p>
                <p className="text-xs text-gray-500">{proiect.nr_proiect || '—'}</p>
              </div>
            ))
          )}
        </div>

        {/* Formular edit */}
        {editingId && (
          <div className="lg:col-span-2 bg-white p-6 rounded border border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Editeaza Proiect</h3>
              <SaveIndicator isSaving={saving} error={null} />
            </div>

            {/* Titlu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
              <input
                type="text"
                value={formData.titlu || ''}
                onChange={(e) => handleFieldChange('titlu', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Numar proiect */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Număr Proiect</label>
              <input
                type="text"
                value={formData.nr_proiect || ''}
                onChange={(e) => handleFieldChange('nr_proiect', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Localitate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localitate</label>
              <input
                type="text"
                value={formData.uat || ''}
                onChange={(e) => handleFieldChange('uat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Județ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Județ</label>
              <input
                type="text"
                value={formData.judet || ''}
                onChange={(e) => handleFieldChange('judet', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Adresa teren */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresa Teren</label>
              <input
                type="text"
                value={formData.adresa_teren || ''}
                onChange={(e) => handleFieldChange('adresa_teren', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Numar cadastral */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Număr Cadastral</label>
              <input
                type="text"
                value={formData.nr_cadastral || ''}
                onChange={(e) => handleFieldChange('nr_cadastral', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Suprafata teren */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Suprafață Teren (m²)</label>
              <input
                type="number"
                value={formData.suprafata_teren || ''}
                onChange={(e) => handleFieldChange('suprafata_teren', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Delete button */}
            <div className="pt-4 border-t">
              <button
                onClick={() => handleDelete(editingId)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Șterge Proiect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
