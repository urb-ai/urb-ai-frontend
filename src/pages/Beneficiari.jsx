import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import { useWizardStore } from '../stores/wizardStore';
import Layout from '../components/Layout';

export default function Beneficiari() {
  const navigate = useNavigate();
  const { beneficiari, addBeneficiar, updateBeneficiar, deleteBeneficiar } = useProjectStore();
  const { setBeneficiar } = useWizardStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedBeneficiariId, setSelectedBeneficiariId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const [formData, setFormData] = useState({
    tip: 'PJ',
    // PJ fields
    denumire: '',
    cui: '',
    nrRegCom: '',
    adresa: '',
    reprezentant: '',
    // PF fields
    nume: '',
    prenume: '',
    cnp: '',
    serieNrCI: '',
    // Common fields
    telefon: '',
    email: '',
  });

  const handleOpenModal = (beneficiar = null) => {
    if (beneficiar) {
      setEditingId(beneficiar.id);
      setFormData(beneficiar);
    } else {
      setEditingId(null);
      setFormData({
        tip: 'PJ',
        denumire: '',
        cui: '',
        nrRegCom: '',
        adresa: '',
        reprezentant: '',
        nume: '',
        prenume: '',
        cnp: '',
        serieNrCI: '',
        telefon: '',
        email: '',
      });
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const requiredField = formData.tip === 'PJ' ? formData.denumire : formData.nume;
    if (!requiredField.trim()) {
      alert(formData.tip === 'PJ' ? 'Completează denumirea firmei' : 'Completează numele');
      return;
    }

    if (editingId) {
      updateBeneficiar(editingId, formData);
    } else {
      addBeneficiar(formData);
    }
    setShowModal(false);
  };

  // Get initials from beneficiary name
  const getInitials = (beneficiar) => {
    const name = beneficiar.tip === 'PJ' ? beneficiar.denumire : `${beneficiar.prenume} ${beneficiar.nume}`;
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle card selection
  const handleSelectBeneficiar = (beneficiariId) => {
    const selected = beneficiari.find((b) => b.id === beneficiariId);
    setSelectedBeneficiariId(beneficiariId);
    setBeneficiar(selected);

    // Auto-navigate after 500ms delay
    setTimeout(() => {
      navigate('/app/proiecte');
    }, 500);
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Grid: Beneficiary Cards + Add New Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
            minHeight: 'calc(100vh - 150px)',
          }}
        >
          {/* Beneficiary Cards - sortați descrescător (cel mai nou primeiro) */}
          {[...beneficiari].reverse().map((beneficiar) => {
            const isSelected = selectedBeneficiariId === beneficiar.id;
            const displayName = beneficiar.tip === 'PJ' ? beneficiar.denumire : `${beneficiar.prenume} ${beneficiar.nume}`;
            const displayCUI = beneficiar.tip === 'PJ' ? beneficiar.cui : beneficiar.cnp;

            return (
              <div
                key={beneficiar.id}
                onClick={() => handleSelectBeneficiar(beneficiar.id)}
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
                  setHoveredCardId(beneficiar.id);
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
                {/* Top Section: Avatar + Edit/Delete Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1f7a45 0%, #28a745 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      fontFamily: '"DM Sans", sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(beneficiar)}
                  </div>

                  {/* Edit/Delete Buttons - visible on hover */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      opacity: hoveredCardId === beneficiar.id ? 1 : 0,
                      transition: 'opacity 0.2s',
                      pointerEvents: hoveredCardId === beneficiar.id ? 'auto' : 'none',
                    }}
                  >
                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(beneficiar);
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
                        deleteBeneficiar(beneficiar.id);
                        if (selectedBeneficiariId === beneficiar.id) {
                          setSelectedBeneficiariId(null);
                          setBeneficiar(null);
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

                {/* Type Badge */}
                <div
                  style={{
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    background: '#f0ebe3',
                    color: '#5c5466',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginBottom: '8px',
                    fontFamily: '"DM Sans", sans-serif',
                    width: 'fit-content',
                  }}
                >
                  {beneficiar.tip === 'PJ' ? 'PJ' : 'PF'}
                </div>

                {/* Beneficiary Name */}
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1a1613',
                    margin: '0 0 4px 0',
                    fontFamily: '"DM Sans", sans-serif',
                    wordBreak: 'break-word',
                  }}
                >
                  {displayName}
                </h3>

                {/* CUI/CNP */}
                {displayCUI && (
                  <p
                    style={{
                      fontSize: '11px',
                      fontFamily: '"Courier New", monospace',
                      color: '#9a938a',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {displayCUI}
                  </p>
                )}

                {/* Separator */}
                <div style={{ height: '1px', background: '#e8e0d6', margin: '8px 0', flex: 1 }} />

                {/* Address */}
                {beneficiar.adresa && (
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#5c5466',
                      margin: '0 0 6px 0',
                      fontFamily: '"DM Sans", sans-serif',
                      lineHeight: '1.4',
                      wordBreak: 'break-word',
                    }}
                  >
                    {beneficiar.adresa}
                  </p>
                )}

                {/* Representative (for PJ) */}
                {beneficiar.tip === 'PJ' && beneficiar.reprezentant && (
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#7a6e63',
                      margin: '0',
                      fontFamily: '"DM Sans", sans-serif',
                      wordBreak: 'break-word',
                    }}
                  >
                    {beneficiar.reprezentant}
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

          {/* Add New Beneficiary Card - MEREU ULTIMUL */}
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
              Adaugă Beneficiar Nou
            </div>
          </div>
        </div>

        {/* Show empty state if no beneficiaries */}
        {beneficiari.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#7a6e63',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            <p style={{ fontSize: '14px', margin: '0' }}>Niciun beneficiar adăugat încă</p>
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
                {editingId ? 'Editează beneficiar' : 'Adaugă beneficiar'}
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

            {/* SECȚIUNEA 1: DATE BENEFICIAR */}
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
                DATE BENEFICIAR
              </div>

              {/* Tip Beneficiar */}
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
                  Tip beneficiar *
                </label>
                <select
                  name="tip"
                  value={formData.tip}
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
                  <option value="PJ">Persoană Juridică</option>
                  <option value="PF">Persoană Fizică</option>
                </select>
              </div>

              {/* PJ Fields */}
              {formData.tip === 'PJ' && (
                <>
                  {/* Denumire Firmă */}
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
                      Denumire firmă *
                    </label>
                    <input
                      type="text"
                      name="denumire"
                      value={formData.denumire}
                      onChange={handleChange}
                      placeholder="Ex: S.C. URBAN INVEST S.R.L."
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

                  {/* CUI + Nr. Reg Com */}
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
                        CUI / CIF
                      </label>
                      <input
                        type="text"
                        name="cui"
                        value={formData.cui}
                        onChange={handleChange}
                        placeholder="Ex: RO12345678"
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
                        Nr. Înregistrare Comerț
                      </label>
                      <input
                        type="text"
                        name="nrRegCom"
                        value={formData.nrRegCom}
                        onChange={handleChange}
                        placeholder="Ex: J/BUC/234/2020"
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
                </>
              )}

              {/* PF Fields */}
              {formData.tip === 'PF' && (
                <>
                  {/* Nume + Prenume */}
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
                        Nume *
                      </label>
                      <input
                        type="text"
                        name="nume"
                        value={formData.nume}
                        onChange={handleChange}
                        placeholder="Ex: Popescu"
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
                        Prenume *
                      </label>
                      <input
                        type="text"
                        name="prenume"
                        value={formData.prenume}
                        onChange={handleChange}
                        placeholder="Ex: Ion"
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

                  {/* CNP + Serie CI */}
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
                        CNP
                      </label>
                      <input
                        type="text"
                        name="cnp"
                        value={formData.cnp}
                        onChange={handleChange}
                        placeholder="Ex: 1751023123456"
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
                        Serie/Nr. CI
                      </label>
                      <input
                        type="text"
                        name="serieNrCI"
                        value={formData.serieNrCI}
                        onChange={handleChange}
                        placeholder="Ex: AB 123456"
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
                </>
              )}

              {/* Adresă */}
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
                  {formData.tip === 'PJ' ? 'Adresă sediu' : 'Adresă domiciliu'}
                </label>
                <input
                  type="text"
                  name="adresa"
                  value={formData.adresa}
                  onChange={handleChange}
                  placeholder="Ex: Str. Exemplu nr. 1, București"
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

              {/* Reprezentant (for PJ) */}
              {formData.tip === 'PJ' && (
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
                    Reprezentant legal
                  </label>
                  <input
                    type="text"
                    name="reprezentant"
                    value={formData.reprezentant}
                    onChange={handleChange}
                    placeholder="Ex: ing. Dan Popescu — Director General"
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
              )}
            </div>

            {/* SECȚIUNEA 2: CONTACT */}
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
                Contact
              </div>

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
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    placeholder="Ex: +40 21 XXX XXXX"
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
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ex: contact@firma.ro"
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
