import { useState } from 'react';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

export default function Beneficiari() {
  const { beneficiari, addBeneficiar, updateBeneficiar, deleteBeneficiar } =
    useProjectStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nume: '',
    cui: '',
    adresa: '',
    telefon: '',
    email: '',
    tipBeneficiar: 'persoana', // persoana sau firma
    reprezentant: '',
  });

  const handleOpenModal = (beneficiar = null) => {
    if (beneficiar) {
      setEditingId(beneficiar.id);
      setFormData(beneficiar);
    } else {
      setEditingId(null);
      setFormData({
        nume: '',
        cui: '',
        adresa: '',
        telefon: '',
        email: '',
        tipBeneficiar: 'persoana',
        reprezentant: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateBeneficiar(editingId, formData);
    } else {
      addBeneficiar(formData);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-warm-text font-light mb-2">
              Beneficiari
            </h1>
            <p className="text-warm-text-secondary">
              Gestionează persoane și firme beneficiare
            </p>
          </div>
          <button className="btn-primary" onClick={() => handleOpenModal()}>
            + Adaugă Beneficiar
          </button>
        </div>

        {/* Beneficiari List */}
        <div className="grid grid-cols-1 gap-4">
          {beneficiari.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-warm-text-secondary mb-4">
                Niciun beneficiar adăugat încă
              </p>
              <button
                className="btn-accent"
                onClick={() => handleOpenModal()}
              >
                Adaugă Primul Beneficiar
              </button>
            </div>
          ) : (
            beneficiari.map((beneficiar) => (
              <div key={beneficiar.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-serif text-warm-text mb-1">
                      {beneficiar.nume}
                    </h3>
                    <p className="text-sm text-warm-text-secondary mb-2">
                      Tip: {beneficiar.tipBeneficiar === 'persoana' ? 'Persoană' : 'Firmă'} |
                      CUI: {beneficiar.cui}
                    </p>
                    <p className="text-sm text-warm-text mb-2">
                      Reprezentant: {beneficiar.reprezentant}
                    </p>
                    <p className="text-sm text-warm-text mb-2">
                      Adresa: {beneficiar.adresa}
                    </p>
                    <div className="flex gap-2 text-xs text-warm-text-secondary">
                      <span>{beneficiar.telefon}</span>
                      <span>•</span>
                      <span>{beneficiar.email}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn-ghost"
                      onClick={() => handleOpenModal(beneficiar)}
                    >
                      Editează
                    </button>
                    <button
                      className="btn-ghost text-red-600"
                      onClick={() => deleteBeneficiar(beneficiar.id)}
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-warm-card rounded-2xl p-8 w-full max-w-2xl max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-serif text-warm-text mb-6 font-light">
                {editingId ? 'Editează Beneficiar' : 'Adaugă Beneficiar Nou'}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <select
                  name="tipBeneficiar"
                  value={formData.tipBeneficiar}
                  onChange={handleChange}
                >
                  <option value="persoana">Persoană Fizică</option>
                  <option value="firma">Firmă</option>
                </select>
                <input
                  type="text"
                  name="nume"
                  placeholder="Nume"
                  value={formData.nume}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cui"
                  placeholder="CUI/CNP"
                  value={formData.cui}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="reprezentant"
                  placeholder="Reprezentant"
                  value={formData.reprezentant}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="adresa"
                  placeholder="Adresa"
                  value={formData.adresa}
                  onChange={handleChange}
                  className="col-span-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  name="telefon"
                  placeholder="Telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Anulează
                </button>
                <button className="btn-primary" onClick={handleSave}>
                  {editingId ? 'Salvează' : 'Adaugă'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
