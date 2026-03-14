import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

export default function ProiectNou() {
  const navigate = useNavigate();
  const {
    proiectanti,
    beneficiari,
    selectedProiectant,
    selectedBeneficiar,
    setSelectedProiectant,
    setSelectedBeneficiar,
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

  const handleSelectProiectant = (proiectant) => {
    setSelectedProiectant(proiectant);
    setStep(2);
  };

  const handleSelectBeneficiar = (beneficiar) => {
    setSelectedBeneficiar(beneficiar);
    setStep(3);
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = () => {
    if (!selectedProiectant || !selectedBeneficiar || !projectData.titlu) {
      alert('Completează toate câmpurile obligatorii');
      return;
    }

    const newProject = {
      proiectantId: selectedProiectant.id,
      beneficiarId: selectedBeneficiar.id,
      ...projectData,
      createdAt: new Date(),
    };

    addProiect(newProject);
    setWorkflowStep('tipDocument');
    navigate(`/proiect/${Date.now()}/document`);
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

            {proiectanti.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-warm-text-secondary mb-4">
                  Niciun proiectant disponibil
                </p>
                <button
                  className="btn-accent"
                  onClick={() => navigate('/proiectanti')}
                >
                  Mergi la Proiectanți
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proiectanti.map((proiectant) => (
                  <div
                    key={proiectant.id}
                    className="card cursor-pointer hover:border-urbai-gold"
                    onClick={() => handleSelectProiectant(proiectant)}
                  >
                    <h3 className="text-lg font-serif text-warm-text mb-2">
                      {proiectant.nume}
                    </h3>
                    <p className="text-sm text-warm-text-secondary">
                      CUI: {proiectant.cui}
                    </p>
                    <p className="text-sm text-warm-text-secondary">
                      {proiectant.adresa}
                    </p>
                  </div>
                ))}
              </div>
            )}
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

            {beneficiari.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-warm-text-secondary mb-4">
                  Niciun beneficiar disponibil
                </p>
                <button
                  className="btn-accent"
                  onClick={() => navigate('/beneficiari')}
                >
                  Mergi la Beneficiari
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {beneficiari.map((beneficiar) => (
                  <div
                    key={beneficiar.id}
                    className="card cursor-pointer hover:border-urbai-gold"
                    onClick={() => handleSelectBeneficiar(beneficiar)}
                  >
                    <h3 className="text-lg font-serif text-warm-text mb-2">
                      {beneficiar.nume}
                    </h3>
                    <p className="text-sm text-warm-text-secondary">
                      Tip: {beneficiar.tipBeneficiar === 'persoana' ? 'Persoană' : 'Firmă'}
                    </p>
                    <p className="text-sm text-warm-text-secondary">
                      {beneficiar.adresa}
                    </p>
                  </div>
                ))}
              </div>
            )}

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
                  onClick={handleCreateProject}
                >
                  Continuă cu Tip Document →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
