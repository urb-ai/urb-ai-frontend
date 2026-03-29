import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';
import DocumentUploadZone from '../components/DocumentUploadZone';

export default function ProiectNou() {
  const navigate = useNavigate();
  const {
    proiectanti,
    beneficiari,
    selectedProiectant,
    selectedBeneficiar,
    setSelectedProiectant,
    setSelectedBeneficiar,
    addProiectant,
    addBeneficiar,
    addProiect,
    setWorkflowStep,
  } = useProjectStore();

  const [step, setStep] = useState(1); // 1: proiectant, 2: beneficiar, 3: detalii proiect
  const [projectData, setProjectData] = useState({
    titlu: '',
    numar: '',
    data: new Date().toISOString().split('T')[0],
    amplasament: '',
    cadastral: '',
    suprafata: '',
    localitate: '',
    judet: '',
    pot: '',
    cut: '',
    rh: '',
  });

  // Modal states for adding new proiectant/beneficiar
  const [showProiectantModal, setShowProiectantModal] = useState(false);
  const [showBeneficiariModal, setShowBeneficiariModal] = useState(false);

  const [newProiectantData, setNewProiectantData] = useState({
    nume: '',
    cui: '',
    adresa: '',
  });

  const [newBeneficiariData, setNewBeneficiariData] = useState({
    nume: '',
    adresa: '',
    tipBeneficiar: 'persoana',
  });

  const handleSelectProiectant = (proiectant) => {
    setSelectedProiectant(proiectant);
    setTimeout(() => {
      setStep(2);
    }, 500);
  };

  const handleSelectBeneficiar = (beneficiar) => {
    setSelectedBeneficiar(beneficiar);
    setTimeout(() => {
      setStep(3);
    }, 500);
  };

  const handleAddProiectant = () => {
    if (!newProiectantData.nume.trim()) {
      alert('Completează denumirea proiectantului');
      return;
    }

    const proiectant = {
      id: Date.now(),
      ...newProiectantData,
      createdAt: new Date(),
    };

    addProiectant(proiectant);
    setNewProiectantData({ nume: '', cui: '', adresa: '' });
    setShowProiectantModal(false);

    // Auto-select and advance
    setTimeout(() => {
      handleSelectProiectant(proiectant);
    }, 300);
  };

  const handleAddBeneficiar = () => {
    if (!newBeneficiariData.nume.trim()) {
      alert('Completează numele beneficiarului');
      return;
    }

    const beneficiar = {
      id: Date.now(),
      ...newBeneficiariData,
      createdAt: new Date(),
    };

    addBeneficiar(beneficiar);
    setNewBeneficiariData({ nume: '', adresa: '', tipBeneficiar: 'persoana' });
    setShowBeneficiariModal(false);

    // Auto-select and advance
    setTimeout(() => {
      handleSelectBeneficiar(beneficiar);
    }, 300);
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinueToDocumentType = () => {
    if (!selectedProiectant || !selectedBeneficiar || !projectData.titlu) {
      alert('Completează toate câmpurile obligatorii');
      return;
    }

    // Generate temporary project ID for this workflow
    const tempProjectId = Date.now().toString();

    // Save project data temporarily
    setWorkflowStep('tipDocument');

    // Navigate to document type selection
    navigate(`/app/proiect/${tempProjectId}/tip-document`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${step >= 1 ? 'text-urbai-gold' : 'text-warm-text-secondary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-urbai-gold text-white' : 'bg-warm-border text-warm-text'}`}>
                1
              </div>
              <span className="text-sm">Proiectant</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-urbai-gold' : 'bg-warm-border'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-urbai-gold' : 'text-warm-text-secondary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-urbai-gold text-white' : 'bg-warm-border text-warm-text'}`}>
                2
              </div>
              <span className="text-sm">Beneficiar</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-urbai-gold' : 'bg-warm-border'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-urbai-gold' : 'text-warm-text-secondary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-urbai-gold text-white' : 'bg-warm-border text-warm-text'}`}>
                3
              </div>
              <span className="text-sm">Proiect</span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Proiectant */}
        {step === 1 && (
          <div>
            <h1 className="text-3xl font-serif text-warm-text mb-2 font-light">
              Selectează Proiectantul
            </h1>
            <p className="text-warm-text-secondary mb-8">
              Alege firma de proiectare care va genera documentele
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 220px))',
              gap: '16px',
            }}>
              {/* Existing Proiectanti */}
              {proiectanti.map((proiectant) => (
                <div
                  key={proiectant.id}
                  className="card cursor-pointer hover:border-urbai-gold transition-all"
                  style={{ padding: '16px', maxWidth: '220px' }}
                  onClick={() => handleSelectProiectant(proiectant)}
                >
                  <h3 className="text-lg font-serif text-warm-text mb-2">
                    {proiectant.nume}
                  </h3>
                  <p className="text-sm text-warm-text-secondary">
                    CUI: {proiectant.cui || '-'}
                  </p>
                  <p className="text-sm text-warm-text-secondary">
                    {proiectant.adresa || 'N/A'}
                  </p>
                </div>
              ))}

              {/* Add New Proiectant Card */}
              <div
                className="card cursor-pointer border-2 border-dashed border-warm-border hover:border-urbai-gold transition-all flex items-center justify-center"
                style={{ padding: '16px', maxWidth: '220px', minHeight: '220px' }}
                onClick={() => setShowProiectantModal(true)}
              >
                <div className="text-center">
                  <div className="text-4xl text-urbai-gold mb-3">+</div>
                  <p className="text-warm-text font-semibold">Adaugă Proiectant Nou</p>
                  <p className="text-xs text-warm-text-secondary mt-1">Clic pentru a adăuga</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Beneficiar */}
        {step === 2 && (
          <div>
            <h1 className="text-3xl font-serif text-warm-text mb-2 font-light">
              Selectează Beneficiarul
            </h1>
            <p className="text-warm-text-secondary mb-8">
              Alege persoana/firma care comandă documentele
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 220px))',
              gap: '16px',
            }}>
              {/* Existing Beneficiari */}
              {beneficiari.map((beneficiar) => (
                <div
                  key={beneficiar.id}
                  className="card cursor-pointer hover:border-urbai-gold transition-all"
                  style={{ padding: '16px', maxWidth: '220px' }}
                  onClick={() => handleSelectBeneficiar(beneficiar)}
                >
                  <h3 className="text-lg font-serif text-warm-text mb-2">
                    {beneficiar.nume}
                  </h3>
                  <p className="text-sm text-warm-text-secondary">
                    Tip: {beneficiar.tipBeneficiar === 'persoana' ? 'Persoană' : 'Firmă'}
                  </p>
                  <p className="text-sm text-warm-text-secondary">
                    {beneficiar.adresa || 'N/A'}
                  </p>
                </div>
              ))}

              {/* Add New Beneficiar Card */}
              <div
                className="card cursor-pointer border-2 border-dashed border-warm-border hover:border-urbai-gold transition-all flex items-center justify-center"
                style={{ padding: '16px', maxWidth: '220px', minHeight: '220px' }}
                onClick={() => setShowBeneficiariModal(true)}
              >
                <div className="text-center">
                  <div className="text-4xl text-urbai-gold mb-3">+</div>
                  <p className="text-warm-text font-semibold">Adaugă Beneficiar Nou</p>
                  <p className="text-xs text-warm-text-secondary mt-1">Clic pentru a adăuga</p>
                </div>
              </div>
            </div>

            <button
              className="btn-secondary mt-8"
              onClick={() => setStep(1)}
            >
              ← Înapoi
            </button>
          </div>
        )}

        {/* Step 3: Project Details */}
        {step === 3 && (
          <div>
            {/* Selected Info Banner */}
            <div
              style={{
                background: 'rgba(196, 137, 58, 0.08)',
                border: '1px solid rgba(196, 137, 58, 0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '16px',
              }}
            >
              <p style={{ fontSize: '12px', color: '#9a938a', marginBottom: '4px' }}>
                SELECȚII CURENTE
              </p>
              <p style={{ fontSize: '14px', color: '#1a1613', fontWeight: '500' }}>
                Proiectant: <span style={{ color: '#c4893a' }}>{selectedProiectant?.nume}</span> | Beneficiar: <span style={{ color: '#c4893a' }}>{selectedBeneficiar?.nume}</span>
              </p>
            </div>

            <h1 className="text-3xl font-serif text-warm-text mb-2 font-light">
              Detalii Proiect
            </h1>
            <p className="text-warm-text-secondary mb-8">
              Completează informațiile despre proiect
            </p>

            <div className="card mb-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Titlu Proiect *
                  </label>
                  <input
                    type="text"
                    name="titlu"
                    value={projectData.titlu}
                    onChange={handleProjectChange}
                    placeholder="Introduceti titlul proiectului"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Număr Proiect
                  </label>
                  <input
                    type="text"
                    name="numar"
                    value={projectData.numar}
                    onChange={handleProjectChange}
                    placeholder="ex: PUD-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Dată
                  </label>
                  <input
                    type="date"
                    name="data"
                    value={projectData.data}
                    onChange={handleProjectChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Localitate
                  </label>
                  <input
                    type="text"
                    name="localitate"
                    value={projectData.localitate}
                    onChange={handleProjectChange}
                    placeholder="ex: București"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Județ
                  </label>
                  <input
                    type="text"
                    name="judet"
                    value={projectData.judet}
                    onChange={handleProjectChange}
                    placeholder="ex: Ilfov"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Amplasament
                  </label>
                  <input
                    type="text"
                    name="amplasament"
                    value={projectData.amplasament}
                    onChange={handleProjectChange}
                    placeholder="ex: Strada Principale, nr. 10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Cadastral
                  </label>
                  <input
                    type="text"
                    name="cadastral"
                    value={projectData.cadastral}
                    onChange={handleProjectChange}
                    placeholder="ex: 35-1-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Suprafață (mp)
                  </label>
                  <input
                    type="number"
                    name="suprafata"
                    value={projectData.suprafata}
                    onChange={handleProjectChange}
                    placeholder="ex: 5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    POT (%)
                  </label>
                  <input
                    type="number"
                    name="pot"
                    value={projectData.pot}
                    onChange={handleProjectChange}
                    placeholder="ex: 50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    CUT (mp/mp)
                  </label>
                  <input
                    type="number"
                    name="cut"
                    value={projectData.cut}
                    onChange={handleProjectChange}
                    placeholder="ex: 2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-text mb-2">
                    Regim de Înălțime
                  </label>
                  <input
                    type="text"
                    name="rh"
                    value={projectData.rh}
                    onChange={handleProjectChange}
                    placeholder="ex: P+4"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-between">
                <button
                  className="btn-secondary"
                  onClick={() => setStep(2)}
                >
                  ← Înapoi
                </button>
                <button
                  className="btn-primary"
                  onClick={handleContinueToDocumentType}
                >
                  Continuă cu Tip Document →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Proiectant */}
        {showProiectantModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-serif text-warm-text mb-6 font-light">Adaugă Proiectant Nou</h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-warm-text mb-2">Denumire Firmă *</label>
                <input
                  type="text"
                  value={newProiectantData.nume}
                  onChange={(e) => setNewProiectantData({ ...newProiectantData, nume: e.target.value })}
                  placeholder="ex: SC ABC Proiectare SRL"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-warm-text mb-2">CUI</label>
                <input
                  type="text"
                  value={newProiectantData.cui}
                  onChange={(e) => setNewProiectantData({ ...newProiectantData, cui: e.target.value })}
                  placeholder="ex: 12345678"
                  className="w-full"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-warm-text mb-2">Adresă</label>
                <input
                  type="text"
                  value={newProiectantData.adresa}
                  onChange={(e) => setNewProiectantData({ ...newProiectantData, adresa: e.target.value })}
                  placeholder="ex: Strada Principale, nr. 10"
                  className="w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  className="btn-secondary flex-1"
                  onClick={() => setShowProiectantModal(false)}
                >
                  Anulează
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={handleAddProiectant}
                >
                  Salvează
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Beneficiar */}
        {showBeneficiariModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-serif text-warm-text mb-6 font-light">Adaugă Beneficiar Nou</h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-warm-text mb-2">Tip Beneficiar</label>
                <select
                  value={newBeneficiariData.tipBeneficiar}
                  onChange={(e) => setNewBeneficiariData({ ...newBeneficiariData, tipBeneficiar: e.target.value })}
                  className="w-full"
                >
                  <option value="persoana">Persoană Fizică</option>
                  <option value="firma">Persoană Juridică</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-warm-text mb-2">Nume *</label>
                <input
                  type="text"
                  value={newBeneficiariData.nume}
                  onChange={(e) => setNewBeneficiariData({ ...newBeneficiariData, nume: e.target.value })}
                  placeholder="ex: Ion Popescu"
                  className="w-full"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-warm-text mb-2">Adresă</label>
                <input
                  type="text"
                  value={newBeneficiariData.adresa}
                  onChange={(e) => setNewBeneficiariData({ ...newBeneficiariData, adresa: e.target.value })}
                  placeholder="ex: Strada Principale, nr. 10"
                  className="w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  className="btn-secondary flex-1"
                  onClick={() => setShowBeneficiariModal(false)}
                >
                  Anulează
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={handleAddBeneficiar}
                >
                  Salvează
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
