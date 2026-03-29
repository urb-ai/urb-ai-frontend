import { useState, useRef } from 'react';

const styles = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export default function DocumentUploadZone({
  helperText,
  acceptedTypes = '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx',
  onFileUploaded,
}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractionStatus, setExtractionStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    const validTypes = acceptedTypes.split(',').map(t => t.trim());

    if (!validTypes.some(type => fileExt === type)) {
      alert('Tip de fișier nu este acceptat');
      return;
    }

    setUploadedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1),
    });

    setExtractionStatus('analyzing');

    setTimeout(() => {
      setExtractionStatus('success');
      if (onFileUploaded) {
        onFileUploaded({
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(1),
          file,
        });
      }
    }, 2000);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractionStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickZone = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <style>{styles}</style>

      {/* Helper Text */}
      {helperText && (
        <p
          style={{
            fontSize: '13px',
            color: '#9a938a',
            marginBottom: '8px',
            fontWeight: 400,
          }}
        >
          {helperText}
        </p>
      )}

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClickZone}
        style={{
          width: '100%',
          height: '120px',
          backgroundColor: uploadedFile
            ? 'rgba(31,122,69,0.04)'
            : dragActive
            ? 'rgba(196,137,58,0.02)'
            : '#ffffff',
          border: uploadedFile
            ? '2px solid #1f7a45'
            : dragActive
            ? '2px solid #c4893a'
            : '2px dashed #ddd4c8',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          padding: '16px',
          boxSizing: 'border-box',
        }}
        onMouseEnter={(e) => {
          if (!uploadedFile && !dragActive) {
            e.currentTarget.style.borderColor = '#c4893a';
            e.currentTarget.style.backgroundColor = 'rgba(196,137,58,0.02)';
          }
        }}
        onMouseLeave={(e) => {
          if (!uploadedFile && !dragActive) {
            e.currentTarget.style.borderColor = '#ddd4c8';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={acceptedTypes}
          style={{ display: 'none' }}
        />

        {!uploadedFile ? (
          <>
            {/* Upload Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9a938a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '28px', height: '28px', flexShrink: 0 }}
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>

            {/* Text Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1613' }}>
                Încarcă document pentru completare automată
              </div>
              <div style={{ fontSize: '11px', color: '#9a938a' }}>
                Drag & drop sau click · PDF, JPG, PNG, DOCX, XLS
              </div>
            </div>

            {/* Choose File Button */}
            <button
              style={{
                background: 'transparent',
                border: '1px solid #ddd4c8',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '12px',
                color: '#5c5466',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'border-color 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c4893a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ddd4c8';
              }}
            >
              Alege fișier
            </button>
          </>
        ) : (
          <>
            {/* Success Icon */}
            <div style={{ fontSize: '28px', flexShrink: 0 }}>✅</div>

            {/* File Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1613' }}>
                {uploadedFile.name} · {uploadedFile.size} MB
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: extractionStatus === 'success' ? '#1f7a45' : '#c4893a',
                  fontWeight: 500,
                  animation: extractionStatus === 'analyzing'
                    ? 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    : 'none',
                }}
              >
                {extractionStatus === 'analyzing' && '🔍 Se analizează...'}
                {extractionStatus === 'success' && '✓ Date extrase cu succes'}
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1px solid #ddd4c8',
                background: '#f5f0e8',
                color: '#9a938a',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 200ms ease',
                lineHeight: '1',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c4893a';
                e.currentTarget.style.color = '#c4893a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ddd4c8';
                e.currentTarget.style.color = '#9a938a';
              }}
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
}
