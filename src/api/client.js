import { useAuthStore } from '../stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Fetch wrapper that adds JWT token and handles API responses
 */
export async function apiCall(path, options = {}) {
  const authStore = useAuthStore.getState();
  const token = authStore.getToken();

  const url = `${API_URL}${path}`;

  // Build headers
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Merge options
  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else if (contentType && contentType.includes('text/event-stream')) {
      // For streaming responses, return the response object directly
      return response;
    } else {
      data = await response.text();
    }

    // Check for HTTP errors
    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `HTTP ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Error [${path}]:`, error);
    throw error;
  }
}

/**
 * GET request helper
 */
export async function apiGet(path) {
  return apiCall(path, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost(path, body) {
  return apiCall(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT request helper
 */
export async function apiPut(path, body) {
  return apiCall(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete(path) {
  return apiCall(path, { method: 'DELETE' });
}

/**
 * Stream helper for SSE responses
 */
export async function apiStream(path, body, onData) {
  console.log('🌊 apiStream called:', { path, bodyKeys: Object.keys(body) });

  const response = await apiCall(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  console.log('📡 Stream response received:', {
    status: response.status,
    contentType: response.headers.get('content-type'),
  });

  if (!response.ok) {
    throw new Error(`Stream failed: ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let totalChunks = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        console.log(`🏁 Stream completed. Total chunks: ${totalChunks}`);
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            totalChunks++;
            console.log(`📦 Chunk ${totalChunks}:`, data.type);
            onData(data);
          } catch (e) {
            console.error('Failed to parse chunk:', line, e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
