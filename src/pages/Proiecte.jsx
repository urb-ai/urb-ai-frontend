import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import { useWizardStore } from '../stores/wizardStore';
import Layout from '../components/Layout';

export default function Proiecte() {
  const navigate = useNavigate();
  const { proiecte, addProiect, updateProiect, deleteProiect, proiectanti, beneficiari } = useProjectStore();
  const { setSelectedProiect } = useWizardStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedProiectId, setSelectedProiectId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const [formData, setFormData] = useState({
    titlu: '',
    nr: '',
    data: '',
    proiectantId: '',
    beneficiariId: '',
    tipDocumentatie: '',
    amplasament: '',
    cadastral: '',
    suprafata: '',
    localitate: '',
    judet: '',
    potPropus: '',
    cutPropus: '',
    rhPropus: '',
    potExistent: '',
    cutExistent: '',
    rhExistent: '',
    vecini: '',
    accese: '',
    functiune: '',
    zonaUtr: '',
    status: 'draft',
  });

  const handleOpenModal = (proiect = null) => {
    if (proiect) {
      setEditingId(proiect.id);
      setFormData(proiect);
    } else {
      setEditingId(null);
      setFormData({
        titlu: '',
        nr: '',
        data: '',
        proiectantId: '',
        beneficiariId: '',
        tipDocumentatie: '',
        amplasament: '',
        cadastral: '',
        suprafata: '',
        localitate: '',
        judet: '',
        potPropus: '',
        cutPropus: '',
        rhPropus: '',
        potExistent: '',
        cutExistent: '',
        rhExistent: '',
        vecini: '',
        accese: '',
        functiune: '',
        zonaUtr: '',
        status: 'draft',
      });
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.titlu.trim() || !formData.amplasament.trim() || !formData.tipDocumentatie) {
      alert('Completează titlul, tipul de documentație și amplasamentul proiectului');
      return;
    }

    if (editingId) {
      updateProiect(editingId, formData);
    } else {
      addProiect(formData);
    }
    setShowModal(false);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return '#9a938a';
      case 'in_progress':
        return '#c4893a';
      case 'finalized':
        return '#1f7a45';
      default:
        return '#9a938a';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'draft':
        return 'DRAFT';
      case 'in_progress':
        return 'ÎN LUCRU';
      case 'finalized':
        return 'FINALIZAT';
      default:
        return 'DRAFT';
    }
  };

  // Get beneficiary name
  const getBeneficiariName = (beneficiariId) => {
    const b = beneficiari.find((x) => x.id === beneficiariId);
    return b ? (b.tip === 'PJ' ? b.denumire : `${b.prenume} ${b.nume}`) : '';
  };

  // Handle card selection
  const handleSelectProiect = (proiectId) => {
    const selected = proiecte.find((p) => p.id === proiectId);
    setSelectedProiectId(proiectId);
    setSelectedProiect(selected);

    // Auto-navigate to document type selection
    setTimeout(() => {
      navigate(`/app/proiect/${proiectId}/tip-document`);
    }, 500);
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Grid: Project Cards + Add New Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
            minHeight: 'calc(100vh - 150px)',
          }}
        >
          {/* Project Cards - sortați descrescător (cel mai nou primeiro) */}
          {[...proiecte].reverse().map((proiect) => {
            const isSelected = selectedProiectId === proiect.id;
            const statusColor = getStatusColor(proiect.status);

            return (
              <div
                key={proiect.id}
                onClick={() => handleSelectProiect(proiect.id)}
                style={{
                  background: 'white',
                  border: `2px solid ${isSelected ? '#c4893a' : '#e8e0d6'}`,
                  borderRadius: '10px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  aspectRatio: '1 / 1.618',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  backgroundColor: isSelected ? 'rgba(196,137,58,0.03)' : 'white',
                }}
                onMouseEnter={(e) => {
                  setHoveredCardId(proiect.id);
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#c4893a';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(196,137,58,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  setHoveredCardId(null);
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#e8e0d6';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Top Section: Status Badge + Edit/Delete Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  {/* Status Badge */}
                  <div
                    style={{
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      background: statusColor,
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    {getStatusLabel(proiect.status)}
                  </div>

                  {/* Edit/Delete Buttons - visible on hover */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      opacity: hoveredCardId === proiect.id ? 1 : 0,
                      transition: 'opacity 0.2s',
                      pointerEvents: hoveredCardId === proiect.id ? 'auto' : 'none',
                    }}
                  >
                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(proiect);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9a938a',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#1a1613';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#9a938a';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProiect(proiect.id);
                        if (selectedProiectId === proiect.id) {
                          setSelectedProiectId(null);
                          setSelectedProiect(null);
                        }
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9a938a',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#b83232';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#9a938a';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Project Number */}
                {proiect.nr && (
                  <p
                    style={{
                      fontSize: '10px',
                      fontFamily: '"Courier New", monospace',
                      color: '#9a938a',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                    }}
                  >
                    Nr. {proiect.nr}
                  </p>
                )}

                {/* Project Title */}
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1a1613',
                    margin: '0 0 8px 0',
                    fontFamily: '"DM Sans", sans-serif',
                    wordBreak: 'break-word',
                    lineHeight: '1.4',
                  }}
                >
                  {proiect.titlu.substring(0, 60)}
                  {proiect.titlu.length > 60 ? '...' : ''}
                </h3>

                {/* Info Chips */}
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    flexWrap: 'wrap',
                    marginBottom: '8px',
                    fontSize: '10px',
                  }}
                >
                  {proiect.localitate && (
                    <span
                      style={{
                        background: '#f0ebe3',
                        color: '#5c5466',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      {proiect.localitate}
                    </span>
                  )}
                  {proiect.suprafata && (
                    <span
                      style={{
                        background: '#f0ebe3',
                        color: '#5c5466',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      {proiect.suprafata} m²
                    </span>
                  )}
                  {proiect.judet && (
                    <span
                      style={{
                        background: '#f0ebe3',
                        color: '#5c5466',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      {proiect.judet}
                    </span>
                  )}
                </div>

                {/* Urban Indicators */}
                {(proiect.potPropus || proiect.cutPropus || proiect.rhPropus) && (
                  <p
                    style={{
                      fontSize: '11px',
                      fontFamily: '"Courier New", monospace',
                      color: '#7a6e63',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {proiect.potPropus ? `POT: ${proiect.potPropus}%` : ''}
                    {proiect.potPropus && proiect.cutPropus ? ' · ' : ''}
                    {proiect.cutPropus ? `CUT: ${proiect.cutPropus}` : ''}
                    {(proiect.potPropus || proiect.cutPropus) && proiect.rhPropus ? ' · ' : ''}
                    {proiect.rhPropus ? `Rh: ${proiect.rhPropus}` : ''}
                  </p>
                )}

                {/* Beneficiary */}
                {proiect.beneficiariId && (
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#9a938a',
                      margin: '0',
                      fontFamily: '"DM Sans", sans-serif',
                      wordBreak: 'break-word',
                    }}
                  >
                    Beneficiar: {getBeneficiariName(proiect.beneficiariId)}
                  </p>
                )}

                {/* Selected Badge */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: '#c4893a',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    ✓ SELECTAT
                  </div>
                )}
              </div>
            );
          })}

          {/* Add New Project Card - MEREU ULTIMUL */}
          <div
            onClick={() => handleOpenModal()}
            style={{
              border: '2px dashed #c8d4e0',
              borderRadius: '10px',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1.618',
              transition: 'all 0.2s',
              padding: '20px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c4893a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#c8d4e0';
            }}
          >
            <div style={{ fontSize: '28px', color: '#9ab0c8', marginBottom: '12px' }}>+</div>
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#9ab0c8',
                fontWeight: '600',
                textAlign: 'center',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Adaugă Proiect Nou
            </div>
          </div>
        </div>

        {/* Show empty state if no projects */}
        {proiecte.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#7a6e63',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            <p style={{ fontSize: '14px', margin: '0' }}>Niciun proiect adăugat încă</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1a1613',
                  margin: 0,
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {editingId ? 'Editează proiect' : 'Adaugă proiect'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  color: '#9a938a',
                  cursor: 'pointer',
                  padding: '0',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* SECȚIUNEA 1: DATE PROIECT */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#c4893a',
                  borderBottom: '1px solid #e8e0d6',
                  paddingBottom: '10px',
                  marginBottom: '14px',
                }}
              >
                DATE PROIECT
              </div>

              {/* Titlu */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#7a6e63',
                    marginBottom: '4px',
                  }}
                >
                  Titlu proiect *
                </label>
                <textarea
                  name="titlu"
                  value={formData.titlu}
                  onChange={handleChange}
                  placeholder="Ex: ELABORARE PUZ PENTRU..."
                  rows="2"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #ddd4c8',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontFamily: '"DM Sans", sans-serif',
                    boxSizing: 'border-box',
                    color: '#1a1613',
                    transition: 'all 0.2s',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#c4893a';
                    e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd4c8';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Nr. proiect + Data */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Nr. proiect
                  </label>
                  <input
                    type="text"
                    name="nr"
                    value={formData.nr}
                    onChange={handleChange}
                    placeholder="Ex: 87/2024"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Data
                  </label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Proiectant */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#7a6e63',
                    marginBottom: '4px',
                  }}
                >
                  Proiectant
                </label>
                <select
                  name="proiectantId"
                  value={formData.proiectantId}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #ddd4c8',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    boxSizing: 'border-box',
                    color: '#1a1613',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#c4893a';
                    e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd4c8';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Selectează proiectant</option>
                  {proiectanti.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nume}
                    </option>
                  ))}
                </select>
              </div>

              {/* Beneficiar */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#7a6e63',
                    marginBottom: '4px',
                  }}
                >
                  Beneficiar
                </label>
                <select
                  name="beneficiariId"
                  value={formData.beneficiariId}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #ddd4c8',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    boxSizing: 'border-box',
                    color: '#1a1613',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#c4893a';
                    e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd4c8';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Selectează beneficiar</option>
                  {beneficiari.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.tip === 'PJ' ? b.denumire : `${b.prenume} ${b.nume}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SECȚIUNEA 1: TIP DOCUMENTAȚIE */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#c4893a',
                  borderBottom: '1px solid #e8e0d6',
                  paddingBottom: '10px',
                  marginBottom: '14px',
                }}
              >
                Tip Documentație
              </div>

              {/* 3 Document Type Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  marginBottom: '14px',
                }}
              >
                {/* Card 1: PUD */}
                <div
                  onClick={() => setFormData({ ...formData, tipDocumentatie: 'PUD' })}
                  style={{
                    background: 'white',
                    border: formData.tipDocumentatie === 'PUD' ? '2px solid #c4893a' : '1.5px solid #e8e0d6',
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: formData.tipDocumentatie === 'PUD' ? 'rgba(196,137,58,0.04)' : 'white',
                  }}
                  onMouseEnter={(e) => {
                    if (formData.tipDocumentatie !== 'PUD') {
                      e.target.style.borderColor = '#c4893a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.tipDocumentatie !== 'PUD') {
                      e.target.style.borderColor = '#e8e0d6';
                    }
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: '6px' }} xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="2" width="14" height="20" rx="1" fill="none" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="6" x2="16" y2="6" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="10" x2="16" y2="10" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="14" x2="16" y2="14" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="18" x2="14" y2="18" stroke="#1a1613" strokeWidth="1.5" />
                  </svg>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1a1613', marginBottom: '4px' }}>
                    PUD
                  </div>
                  <div style={{ fontSize: '9px', color: '#7a6e63', lineHeight: '1.3' }}>
                    Plan Urbanistic de Detaliu
                  </div>
                </div>

                {/* Card 2: PUZ */}
                <div
                  onClick={() => setFormData({ ...formData, tipDocumentatie: 'PUZ' })}
                  style={{
                    background: 'white',
                    border: formData.tipDocumentatie === 'PUZ' ? '2px solid #c4893a' : '1.5px solid #e8e0d6',
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: formData.tipDocumentatie === 'PUZ' ? 'rgba(196,137,58,0.04)' : 'white',
                  }}
                  onMouseEnter={(e) => {
                    if (formData.tipDocumentatie !== 'PUZ') {
                      e.target.style.borderColor = '#c4893a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.tipDocumentatie !== 'PUZ') {
                      e.target.style.borderColor = '#e8e0d6';
                    }
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: '6px' }} xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="2" width="14" height="20" rx="1" fill="none" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="6" x2="16" y2="6" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="10" x2="16" y2="10" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="14" x2="16" y2="14" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="18" x2="14" y2="18" stroke="#1a1613" strokeWidth="1.5" />
                  </svg>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1a1613', marginBottom: '4px' }}>
                    PUZ
                  </div>
                  <div style={{ fontSize: '9px', color: '#7a6e63', lineHeight: '1.3' }}>
                    Plan Urbanistic Zonal
                  </div>
                </div>

                {/* Card 3: PUG */}
                <div
                  onClick={() => setFormData({ ...formData, tipDocumentatie: 'PUG' })}
                  style={{
                    background: 'white',
                    border: formData.tipDocumentatie === 'PUG' ? '2px solid #c4893a' : '1.5px solid #e8e0d6',
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: formData.tipDocumentatie === 'PUG' ? 'rgba(196,137,58,0.04)' : 'white',
                  }}
                  onMouseEnter={(e) => {
                    if (formData.tipDocumentatie !== 'PUG') {
                      e.target.style.borderColor = '#c4893a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.tipDocumentatie !== 'PUG') {
                      e.target.style.borderColor = '#e8e0d6';
                    }
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: '6px' }} xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="2" width="14" height="20" rx="1" fill="none" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="6" x2="16" y2="6" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="10" x2="16" y2="10" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="14" x2="16" y2="14" stroke="#1a1613" strokeWidth="1.5" />
                    <line x1="8" y1="18" x2="14" y2="18" stroke="#1a1613" strokeWidth="1.5" />
                  </svg>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1a1613', marginBottom: '4px' }}>
                    PUG
                  </div>
                  <div style={{ fontSize: '9px', color: '#7a6e63', lineHeight: '1.3' }}>
                    Plan Urbanistic General
                  </div>
                </div>
              </div>
            </div>

            {/* SECȚIUNEA 2: AMPLASAMENT */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#c4893a',
                  borderBottom: '1px solid #e8e0d6',
                  paddingBottom: '10px',
                  marginBottom: '14px',
                }}
              >
                Amplasament
              </div>

              {/* Amplasament complet */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#7a6e63',
                    marginBottom: '4px',
                  }}
                >
                  Amplasament *
                </label>
                <input
                  type="text"
                  name="amplasament"
                  value={formData.amplasament}
                  onChange={handleChange}
                  placeholder="Ex: Str. Eroilor nr. 45, com. Florești"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #ddd4c8',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    boxSizing: 'border-box',
                    color: '#1a1613',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#c4893a';
                    e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd4c8';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Nr. cadastral + Suprafață */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Nr. cadastral
                  </label>
                  <input
                    type="text"
                    name="cadastral"
                    value={formData.cadastral}
                    onChange={handleChange}
                    placeholder="Ex: 312456"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Suprafață teren (mp)
                  </label>
                  <input
                    type="number"
                    name="suprafata"
                    value={formData.suprafata}
                    onChange={handleChange}
                    placeholder="Ex: 8450"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Localitate + Județ */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Localitate
                  </label>
                  <input
                    type="text"
                    name="localitate"
                    value={formData.localitate}
                    onChange={handleChange}
                    placeholder="Ex: Florești"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Județ
                  </label>
                  <input
                    type="text"
                    name="judet"
                    value={formData.judet}
                    onChange={handleChange}
                    placeholder="Ex: Constanța"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SECȚIUNEA 3: REGLEMENTĂRI URBANISTICE */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#c4893a',
                  borderBottom: '1px solid #e8e0d6',
                  paddingBottom: '10px',
                  marginBottom: '14px',
                }}
              >
                Reglementări Urbanistice
              </div>

              {/* POT/CUT/Rh propus */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    POT propus (%)
                  </label>
                  <input
                    type="number"
                    name="potPropus"
                    value={formData.potPropus}
                    onChange={handleChange}
                    placeholder="Ex: 65"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    CUT propus
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="cutPropus"
                    value={formData.cutPropus}
                    onChange={handleChange}
                    placeholder="Ex: 3.2"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Rh propus
                  </label>
                  <input
                    type="text"
                    name="rhPropus"
                    value={formData.rhPropus}
                    onChange={handleChange}
                    placeholder="Ex: P+2E"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* POT/CUT/Rh existent */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    POT existent (%)
                  </label>
                  <input
                    type="number"
                    name="potExistent"
                    value={formData.potExistent}
                    onChange={handleChange}
                    placeholder="Ex: 50"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    CUT existent
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="cutExistent"
                    value={formData.cutExistent}
                    onChange={handleChange}
                    placeholder="Ex: 2.0"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Rh existent
                  </label>
                  <input
                    type="text"
                    name="rhExistent"
                    value={formData.rhExistent}
                    onChange={handleChange}
                    placeholder="Ex: P+E"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SECȚIUNEA 4: INFORMAȚII SUPLIMENTARE */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#c4893a',
                  borderBottom: '1px solid #e8e0d6',
                  paddingBottom: '10px',
                  marginBottom: '14px',
                }}
              >
                Informații Suplimentare
              </div>

              {/* Vecinătăți */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#7a6e63',
                    marginBottom: '4px',
                  }}
                >
                  Vecinătăți
                </label>
                <textarea
                  name="vecini"
                  value={formData.vecini}
                  onChange={handleChange}
                  placeholder="Descriere vecinătăți..."
                  rows="2"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #ddd4c8',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontFamily: '"DM Sans", sans-serif',
                    boxSizing: 'border-box',
                    color: '#1a1613',
                    transition: 'all 0.2s',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#c4893a';
                    e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd4c8';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Accese + Funcțiune */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Accese
                  </label>
                  <input
                    type="text"
                    name="accese"
                    value={formData.accese}
                    onChange={handleChange}
                    placeholder="Descriere accese..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: '#7a6e63',
                      marginBottom: '4px',
                    }}
                  >
                    Funcțiune propusă
                  </label>
                  <input
                    type="text"
                    name="functiune"
                    value={formData.functiune}
                    onChange={handleChange}
                    placeholder="Ex: Locuire colectivă, Comerț"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      color: '#1a1613',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c4893a';
                      e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd4c8';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Zona UTR */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#7a6e63',
                    marginBottom: '4px',
                  }}
                >
                  Zona UTR/PUG
                </label>
                <input
                  type="text"
                  name="zonaUtr"
                  value={formData.zonaUtr}
                  onChange={handleChange}
                  placeholder="Ex: Zona rezidențială de densitate medie"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #ddd4c8',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    boxSizing: 'border-box',
                    color: '#1a1613',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#c4893a';
                    e.target.style.boxShadow = '0 0 0 2px rgba(196,137,58,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd4c8';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

            </div>

            {/* FOOTER */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                borderTop: '1px solid #e8e0d6',
                paddingTop: '20px',
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ddd4c8',
                  background: 'transparent',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#7a6e63',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.04)';
                  e.target.style.color = '#1a1613';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#7a6e63';
                }}
              >
                Anulează
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '10px 20px',
                  background: '#1a1613',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2a2623';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#1a1613';
                }}
              >
                {editingId ? 'Salvează' : 'Adaugă'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
