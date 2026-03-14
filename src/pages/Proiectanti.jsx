import { useState } from 'react';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

export default function Proiectanti() {
  const { proiectanti, addProiectant, updateProiectant, deleteProiectant } =
    useProjectStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nume: '',
    cui: '',
    adresa: '',
    telefon: '',
    email: '',
    sedePrincipala: '',
    logo: null,
    sefProiect: '',
    proiectat: '',
    desenat: '',
    verificat: '',
    rur: '',
    oar: '',
  });

  const handleOpenModal = (proiectant = null) => {
    if (proiectant) {
      setEditingId(proiectant.id);
      setFormData(proiectant);
    } else {
      setEditingId(null);
      setFormData({
        nume: '',
        cui: '',
        adresa: '',
        telefon: '',
        email: '',
        sedePrincipala: '',
        logo: null,
        sefProiect: '',
        proiectat: '',
        desenat: '',
        verificat: '',
        rur: '',
        oar: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateProiectant(editingId, formData);
    } else {
      addProiectant(formData);
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
              Proiectanți
            </h1>
            <p className="text-warm-text-secondary">
              Gestionează firmele de proiectare și echipele de lucru
            </p>
          </div>
          <button className="btn-primary" onClick={() => handleOpenModal()}>
            + Adaugă Proiectant
          </button>
        </div>

        {/* Proiectanți List */}
        <div className="grid grid-cols-1 gap-4">
          {proiectanti.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-warm-text-secondary mb-4">
                Niciun proiectant adăugat încă
              </p>
              <button
                className="btn-accent"
                onClick={() => handleOpenModal()}
              >
                Adaugă Primul Proiectant
              </button>
            </div>
          ) : (
            proiectanti.map((proiectant) => (
              <div key={proiectant.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-serif text-warm-text mb-1">
                      {proiectant.nume}
                    </h3>
                    <p className="text-sm text-warm-text-secondary mb-3">
                      CUI: {proiectant.cui} | {proiectant.adresa}
                    </p>
                    <p className="text-sm text-warm-text mb-2">
                      <strong>Echipă:</strong> Șef: {proiectant.sefProiect} |
                      Proiectat: {proiectant.proiectat}
                    </p>
                    <div className="flex gap-2 text-xs text-warm-text-secondary">
                      <span>{proiectant.telefon}</span>
                      <span>•</span>
                      <span>{proiectant.email}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn-ghost"
                      onClick={() => handleOpenModal(proiectant)}
                    >
                      Editează
                    </button>
                    <button
                      className="btn-ghost text-red-600"
                      onClick={() => deleteProiectant(proiectant.id)}
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
                {editingId ? 'Editează Proiectant' : 'Adaugă Proiectant Nou'}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  name="nume"
                  placeholder="Nume Firmă"
                  value={formData.nume}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cui"
                  placeholder="CUI"
                  value={formData.cui}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="adresa"
                  placeholder="Adresa"
                  value={formData.adresa}
                  onChange={handleChange}
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
                <input
                  type="text"
                  name="sedePrincipala"
                  placeholder="Sediu Principal"
                  value={formData.sedePrincipala}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="sefProiect"
                  placeholder="Șef Proiect"
                  value={formData.sefProiect}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="proiectat"
                  placeholder="Proiectat"
                  value={formData.proiectat}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="desenat"
                  placeholder="Desenat"
                  value={formData.desenat}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="verificat"
                  placeholder="Verificat"
                  value={formData.verificat}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="rur"
                  placeholder="RUR (Responsabil Urbanism)"
                  value={formData.rur}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="oar"
                  placeholder="OAR (Organizația Arhitecților)"
                  value={formData.oar}
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
