import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentStore } from '../stores/documentStore';
import Layout from '../components/Layout';

const DOCUMENT_TYPES = [
  {
    id: 'cu',
    title: 'Certificat de Urbanism',
    description: 'Certificat cu analiza urbanism completă',
    icon: '🏛️',
  },
  {
    id: 'aviz',
    title: 'Aviz Oportunitate PUZ',
    description: 'Aviz de oportunitate în Plan Urbanistic Zonal',
    icon: '✅',
  },
  {
    id: 'puz',
    title: 'Plan Urbanistic Zonal',
    description: 'Memoriu și documente PUZ',
    icon: '📐',
  },
  {
    id: 'pud',
    title: 'Plan Urbanistic Detaliat',
    description: 'Memoriu și documente PUD',
    icon: '📋',
  },
];

export default function SelectTipDocument() {
  const navigate = useNavigate();
  const { setDocumentType } = useDocumentStore();
  const [selectedType, setSelectedType] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [cadastralFile, setCadastralFile] = useState(null);

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (!selectedType) {
      alert('Selectează un tip de document');
      return;
    }

    setDocumentType(selectedType);
    navigate(`/proiect/1/document/wizard`);
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'certificate') {
        setCertificateFile(file);
      } else {
        setCadastralFile(file);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-serif text-warm-text mb-2 font-light">
            Selectează Tip Document
          </h1>
          <p className="text-warm-text-secondary">
            Alege tipul de document pe care vrei să-l generezi
          </p>
        </div>

        {/* Document Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {DOCUMENT_TYPES.map((type) => (
            <div
              key={type.id}
              className={`card cursor-pointer transition-all ${
                selectedType === type.id
                  ? 'border-urbai-gold bg-amber-50'
                  : 'hover:border-urbai-gold'
              }`}
              onClick={() => handleSelectType(type.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{type.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-warm-text mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm text-warm-text-secondary">
                    {type.description}
                  </p>
                </div>
                {selectedType === type.id && (
                  <div className="text-urbai-gold text-xl">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* File Upload Section */}
        {selectedType && (
          <div className="card mb-12">
            <h2 className="text-xl font-serif text-warm-text mb-6 font-light">
              Încarcă Documente Sursă
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Certificate File */}
              <div>
                <label className="block text-sm font-semibold text-warm-text mb-3">
                  Certificat de Urbanism (CF)
                </label>
                <div className="border-2 border-dashed border-warm-border rounded-xl p-8 text-center hover:border-urbai-gold transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'certificate')}
                    className="hidden"
                    id="certificateInput"
                  />
                  <label htmlFor="certificateInput" className="cursor-pointer">
                    <div className="text-3xl mb-3">📄</div>
                    <p className="text-warm-text font-medium">
                      {certificateFile
                        ? certificateFile.name
                        : 'Click sau drag CF'}
                    </p>
                    <p className="text-xs text-warm-text-secondary mt-2">
                      PDF sau imagine (JPG, PNG)
                    </p>
                  </label>
                </div>
              </div>

              {/* Cadastral File */}
              <div>
                <label className="block text-sm font-semibold text-warm-text mb-3">
                  Plan Cadastral
                </label>
                <div className="border-2 border-dashed border-warm-border rounded-xl p-8 text-center hover:border-urbai-gold transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'cadastral')}
                    className="hidden"
                    id="cadastralInput"
                  />
                  <label htmlFor="cadastralInput" className="cursor-pointer">
                    <div className="text-3xl mb-3">📐</div>
                    <p className="text-warm-text font-medium">
                      {cadastralFile
                        ? cadastralFile.name
                        : 'Click sau drag Plan Cadastral'}
                    </p>
                    <p className="text-xs text-warm-text-secondary mt-2">
                      PDF sau imagine (JPG, PNG)
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <p className="text-sm text-warm-text-secondary mb-6">
              AI va extrage automat date din documentele încărcate (adrese, suprafețe, etc.)
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-between">
          <button
            className="btn-secondary"
            onClick={() => navigate('/proiect/nou')}
          >
            ← Înapoi
          </button>
          <button
            className="btn-primary"
            onClick={handleContinue}
            disabled={!selectedType}
          >
            Continuă →
          </button>
        </div>
      </div>
    </Layout>
  );
}
