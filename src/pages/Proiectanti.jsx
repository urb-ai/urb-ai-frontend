import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import { useWizardStore } from '../stores/wizardStore';
import Layout from '../components/Layout';

// Icon SVG constant
const UPLOAD_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9a938a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default function Proiectanti() {
  const navigate = useNavigate();
  const { proiectanti, addProiectant, updateProiectant, deleteProiectant } = useProjectStore();
  const { setSelectedProiectant } = useWizardStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedProiectantId, setSelectedProiectantId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [documentFirma, setDocumentFirma] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(null); // null, 'analyzing', 'success'
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nume: '',
    cui: '',
    adresa: '',
    telefon: '',
    email: '',
    logo: null,
    sefProiectTitlu: '',
    sefProiectNume: '',
    proiectatTitlu: '',
    proiectatNume: '',
    desenatTitlu: '',
    desenatNume: '',
    verificatTitlu: '',
    verificatNume: '',
    rur: '',
    oar: '',
  });

  const handleOpenModal = (proiectant = null) => {
    if (proiectant) {
      setEditingId(proiectant.id);
      setFormData(proiectant);
      setLogoPreview(proiectant.logoPreview || null);
    } else {
      setEditingId(null);
      setFormData({
        nume: '',
        cui: '',
        adresa: '',
        telefon: '',
        email: '',
        logo: null,
        sefProiectTitlu: '',
        sefProiectNume: '',
        proiectatTitlu: '',
        proiectatNume: '',
        desenatTitlu: '',
        desenatNume: '',
        verificatTitlu: '',
        verificatNume: '',
        rur: '',
        oar: '',
      });
      setLogoPreview(null);
    }
    setDocumentFirma(null);
    setDocumentStatus(null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result);
        setFormData((prev) => ({ ...prev, logo: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFirma({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1),
      });
      setDocumentStatus('analyzing');
      setTimeout(() => {
        setDocumentStatus('success');
      }, 2000);
    }
  };

  const handleDocumentDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDocumentDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setDocumentFirma({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1),
      });
      setDocumentStatus('analyzing');
      setTimeout(() => {
        setDocumentStatus('success');
      }, 2000);
    }
  };

  const handleSave = () => {
    if (!formData.nume.trim()) {
      alert('Completează denumirea firmei');
      return;
    }

    if (editingId) {
      updateProiectant(editingId, formData);
    } else {
      addProiectant(formData);
    }
    setShowModal(false);
  };

  // Get initials from contractor name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle card selection
  const handleSelectProiectant = (proiectantId) => {
    const selected = proiectanti.find((p) => p.id === proiectantId);
    setSelectedProiectantId(proiectantId);
    setSelectedProiectant(selected);

    // Auto-navigate after 500ms delay
    setTimeout(() => {
      navigate('/app/beneficiari');
    }, 500);
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Grid: Contractor Cards + Add New Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
            minHeight: 'calc(100vh - 150px)',
          }}
        >
          {/* Contractor Cards - sortați descrescător (cel mai nou primeiro) */}
          {[...proiectanti].reverse().map((proiectant) => {
            const isSelected = selectedProiectantId === proiectant.id;
            return (
              <div
                key={proiectant.id}
                onClick={() => handleSelectProiectant(proiectant.id)}
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
                  setHoveredCardId(proiectant.id);
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      fontFamily: '"DM Sans", sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(proiectant.nume)}
                  </div>

                  {/* Edit/Delete Buttons - visible on hover */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      opacity: hoveredCardId === proiectant.id ? 1 : 0,
                      transition: 'opacity 0.2s',
                      pointerEvents: hoveredCardId === proiectant.id ? 'auto' : 'none',
                    }}
                  >
                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(proiectant);
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
                        deleteProiectant(proiectant.id);
                        if (selectedProiectantId === proiectant.id) {
                          setSelectedProiectantId(null);
                          setSelectedProiectant(null);
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

                {/* Company Name */}
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1a1613',
                    margin: '0 0 4px 0',
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {proiectant.nume}
                </h3>

                {/* CUI */}
                <p
                  style={{
                    fontSize: '11px',
                    fontFamily: '"Courier New", monospace',
                    color: '#9a938a',
                    margin: '0 0 12px 0',
                  }}
                >
                  {proiectant.cui}
                </p>

                {/* Separator */}
                <div style={{ height: '1px', background: '#e8e0d6', margin: '12px 0', flex: 1 }} />

                {/* Staff Fields */}
                <div style={{ fontSize: '12px', fontFamily: '"DM Sans", sans-serif' }}>
                  {/* Șef Proiect */}
                  {proiectant.sefProiectNume && (
                    <div style={{ marginBottom: '6px' }}>
                      <div style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#c4893a' }}>
                        Șef Proiect
                      </div>
                      <div style={{ fontSize: '12px', color: '#1a1613' }}>
                        {proiectant.sefProiectTitlu ? `${proiectant.sefProiectTitlu} ${proiectant.sefProiectNume}` : proiectant.sefProiectNume}
                      </div>
                    </div>
                  )}

                  {/* Proiectat */}
                  {proiectant.proiectatNume && (
                    <div style={{ marginBottom: '6px' }}>
                      <div style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#c4893a' }}>
                        Proiectat
                      </div>
                      <div style={{ fontSize: '12px', color: '#1a1613' }}>
                        {proiectant.proiectatTitlu ? `${proiectant.proiectatTitlu} ${proiectant.proiectatNume}` : proiectant.proiectatNume}
                      </div>
                    </div>
                  )}

                  {/* Desenat */}
                  {proiectant.desenatNume && (
                    <div style={{ marginBottom: '6px' }}>
                      <div style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#c4893a' }}>
                        Desenat
                      </div>
                      <div style={{ fontSize: '12px', color: '#1a1613' }}>
                        {proiectant.desenatTitlu ? `${proiectant.desenatTitlu} ${proiectant.desenatNume}` : proiectant.desenatNume}
                      </div>
                    </div>
                  )}

                  {/* Verificat */}
                  {proiectant.verificatNume && (
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#c4893a' }}>
                        Verificat
                      </div>
                      <div style={{ fontSize: '12px', color: '#1a1613' }}>
                        {proiectant.verificatTitlu ? `${proiectant.verificatTitlu} ${proiectant.verificatNume}` : proiectant.verificatNume}
                      </div>
                    </div>
                  )}
                </div>

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

          {/* Add New Contractor Card - MEREU ULTIMUL */}
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
              Adaugă Proiectant Nou
            </div>
          </div>
        </div>

        {/* Show empty state if no contractors */}
        {proiectanti.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#7a6e63',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            <p style={{ fontSize: '14px', margin: '0' }}>Niciun proiectant adăugat încă</p>
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
                  {editingId ? 'Editează proiectant' : 'Adaugă proiectant'}
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

              {/* SECȚIUNEA 1: DATE FIRMĂ */}
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
                  DATE FIRMĂ
                </div>

                {/* Denumire Firmă + CUI */}
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
                      Denumire firmă *
                    </label>
                    <input
                      type="text"
                      name="nume"
                      value={formData.nume}
                      onChange={handleChange}
                      placeholder="Ex: ProArch SRL"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #ddd4c8',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontFamily: '"DM Sans", sans-serif',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s',
                        color: '#1a1613',
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
                        transition: 'all 0.2s',
                        color: '#1a1613',
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
                    Adresă
                  </label>
                  <input
                    type="text"
                    name="adresa"
                    value={formData.adresa}
                    onChange={handleChange}
                    placeholder="Ex: Str. Exemple nr. 1, București"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s',
                      color: '#1a1613',
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

                {/* Telefon + Email */}
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
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* SECȚIUNEA 2: LOGO FIRMĂ */}
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
                  Logo Firmă
                </div>

                {/* Logo Upload Zone - Identică cu Document */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #ddd4c8',
                    borderRadius: '8px',
                    padding: '12px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: '#ffffff',
                    marginBottom: '20px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c4893a';
                    e.currentTarget.style.background = 'rgba(196,137,58,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#ddd4c8';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                >
                  {logoPreview ? (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <img src={logoPreview} alt="Logo preview" style={{ maxHeight: '60px', marginBottom: '4px' }} />
                      <p style={{ fontSize: '10px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                        ✓ Logo încărcat
                      </p>
                    </div>
                  ) : (
                    <>
                      <div style={{ width: '20px', height: '20px', flexShrink: 0 }}>
                        {UPLOAD_ICON}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '12px', fontWeight: '500', color: '#5c5466', margin: '0 0 2px 0', fontFamily: '"DM Sans", sans-serif' }}>
                          Încarcă logo firmă
                        </p>
                        <p style={{ fontSize: '10px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                          PNG, JPG, SVG · max 2MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              {/* SECȚIUNEA 3: DOCUMENT FIRMĂ */}
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
                  Document Firmă
                </div>

                {/* Document Upload Zone */}
                <div
                  onClick={() => documentInputRef.current?.click()}
                  onDragOver={handleDocumentDragOver}
                  onDrop={handleDocumentDrop}
                  style={{
                    border: '2px dashed #ddd4c8',
                    borderRadius: '8px',
                    padding: '12px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c4893a';
                    e.currentTarget.style.background = 'rgba(196,137,58,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#ddd4c8';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                >
                  {!documentFirma ? (
                    <>
                      <div style={{ width: '20px', height: '20px', flexShrink: 0 }}>
                        {UPLOAD_ICON}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '12px', fontWeight: '500', color: '#5c5466', margin: '0 0 2px 0', fontFamily: '"DM Sans", sans-serif' }}>
                          Încarcă document pentru completare automată
                        </p>
                        <p style={{ fontSize: '10px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                          PDF, JPG, DOCX · Se extrag automat datele firmei
                        </p>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <p style={{ fontSize: '12px', fontWeight: '500', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                        {documentFirma.name} · {documentFirma.size} MB
                      </p>
                      <p
                        style={{
                          fontSize: '11px',
                          color: documentStatus === 'success' ? '#1f7a45' : '#c4893a',
                          margin: 0,
                          fontWeight: 500,
                          fontFamily: '"DM Sans", sans-serif',
                          animation: documentStatus === 'analyzing'
                            ? 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                            : 'none',
                        }}
                      >
                        {documentStatus === 'analyzing' && '🔍 Se analizează...'}
                        {documentStatus === 'success' && '✓ Document încărcat'}
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={documentInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleDocumentUpload}
                  style={{ display: 'none' }}
                />

                <style>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                  }
                `}</style>
              </div>

              {/* SECȚIUNEA 3: PERSONAL DE SPECIALITATE */}
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
                  Personal de Specialitate
                </div>

                {/* Șef Proiect */}
                <div style={{ marginBottom: '14px' }}>
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
                        Șef Proiect — Titlu
                      </label>
                      <input
                        type="text"
                        name="sefProiectTitlu"
                        value={formData.sefProiectTitlu}
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
                        Șef Proiect — Nume
                      </label>
                      <input
                        type="text"
                        name="sefProiectNume"
                        value={formData.sefProiectNume}
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
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Proiectat */}
                <div style={{ marginBottom: '14px' }}>
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
                        Proiectat — Titlu
                      </label>
                      <input
                        type="text"
                        name="proiectatTitlu"
                        value={formData.proiectatTitlu}
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
                        Proiectat — Nume
                      </label>
                      <input
                        type="text"
                        name="proiectatNume"
                        value={formData.proiectatNume}
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
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Desenat */}
                <div style={{ marginBottom: '14px' }}>
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
                        Desenat — Titlu
                      </label>
                      <input
                        type="text"
                        name="desenatTitlu"
                        value={formData.desenatTitlu}
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
                        Desenat — Nume
                      </label>
                      <input
                        type="text"
                        name="desenatNume"
                        value={formData.desenatNume}
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
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Verificat */}
                <div>
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
                        Verificat — Titlu
                      </label>
                      <input
                        type="text"
                        name="verificatTitlu"
                        value={formData.verificatTitlu}
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
                        Verificat — Nume
                      </label>
                      <input
                        type="text"
                        name="verificatNume"
                        value={formData.verificatNume}
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
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECȚIUNEA 4: ÎNREGISTRĂRI */}
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
                  Înregistrări
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
                      Nr. Înregistrare RUR
                    </label>
                    <input
                      type="text"
                      name="rur"
                      value={formData.rur}
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
                      Nr. Înregistrare OAR
                    </label>
                    <input
                      type="text"
                      name="oar"
                      value={formData.oar}
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
