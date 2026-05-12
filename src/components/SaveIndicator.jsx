import React, { useEffect, useState } from 'react';

export function SaveIndicator({ isSaving, error }) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && !error) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, error]);

  if (isSaving) {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <div className="animate-spin">⚙️</div>
        <span>Salvare...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-1 text-xs text-red-500">
        <span>❌</span>
        <span>Eroare salvare</span>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="flex items-center gap-1 text-xs text-green-600">
        <span>✓</span>
        <span>Salvat</span>
      </div>
    );
  }

  return null;
}
