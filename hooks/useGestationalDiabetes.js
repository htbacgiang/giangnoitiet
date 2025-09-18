import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export const useGestationalDiabetes = () => {
  const { data: session, status } = useSession();
  const [records, setRecords] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API call helper
  const apiCall = useCallback(async (endpoint, options = {}) => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || 'API call failed';
        // Handle duplicate record errors without throwing
        if (errorMessage.includes('Đã có bản ghi cho bữa ăn này trong ngày')) {
          setError(errorMessage);
          return null; // Return null for duplicate errors
        }
        // Throw for other errors
        throw new Error(errorMessage);
      }

      return data;
    } catch (err) {
      console.error(`API Error (${endpoint}):`, err);
      // Don't re-throw duplicate record errors - they're handled by error state
      if (err.message && err.message.includes('Đã có bản ghi cho bữa ăn này trong ngày')) {
        setError(err.message);
        return null; // Return null instead of throwing
      }
      throw err;
    }
  }, []);

  // Fetch records
  const fetchRecords = useCallback(async (queryParams = {}) => {
    if (status !== 'authenticated') return;

    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams(queryParams);
      const data = await apiCall(`/api/gestational-diabetes/records?${searchParams}`);
      setRecords(data.data.records || []);
      return data.data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  }, [status, apiCall]);

  // Fetch statistics
  const fetchStatistics = useCallback(async (period = '30') => {
    if (status !== 'authenticated') return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiCall(`/api/gestational-diabetes/statistics?period=${period}`);
      setStatistics(data.data);
      return data.data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching statistics:', err);
    } finally {
      setLoading(false);
    }
  }, [status, apiCall]);

  // Create record
  const createRecord = useCallback(async (recordData) => {
    if (status !== 'authenticated') {
      const errorMsg = 'Bạn cần đăng nhập để lưu dữ liệu';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiCall('/api/gestational-diabetes/records', {
        method: 'POST',
        body: JSON.stringify(recordData),
      });

      // If data is null, it means there was a duplicate record error
      if (data === null) {
        // Error is already set in apiCall, just return early
        return null;
      }

      // Refresh records after creation - don't throw on fetch error
      try {
        await fetchRecords();
      } catch (fetchError) {
        console.warn('Failed to refresh records after creation:', fetchError);
        // Don't throw, just log the warning
      }
      
      return data.data;
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi lưu dữ liệu';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [status, apiCall, fetchRecords]);

  // Update record
  const updateRecord = useCallback(async (recordId, recordData) => {
    if (status !== 'authenticated') {
      const errorMsg = 'Bạn cần đăng nhập để cập nhật dữ liệu';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiCall(`/api/gestational-diabetes/records?id=${recordId}`, {
        method: 'PUT',
        body: JSON.stringify(recordData),
      });

      // Refresh records after update - don't throw on fetch error
      try {
        await fetchRecords();
      } catch (fetchError) {
        console.warn('Failed to refresh records after update:', fetchError);
        // Don't throw, just log the warning
      }
      
      return data.data;
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi cập nhật dữ liệu';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [status, apiCall, fetchRecords]);

  // Delete record
  const deleteRecord = useCallback(async (recordId) => {
    if (status !== 'authenticated') {
      const errorMsg = 'Bạn cần đăng nhập để xóa dữ liệu';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);

    try {
      await apiCall(`/api/gestational-diabetes/records?id=${recordId}`, {
        method: 'DELETE',
      });

      // Remove record from local state
      setRecords(prev => prev.filter(record => record._id !== recordId));
      
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi xóa dữ liệu';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [status, apiCall]);

  // Migrate data from localStorage
  const migrateLocalStorageData = useCallback(async (localStorageData) => {
    if (status !== 'authenticated') {
      const errorMsg = 'Bạn cần đăng nhập để di chuyển dữ liệu';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiCall('/api/gestational-diabetes/migrate-data', {
        method: 'POST',
        body: JSON.stringify({ localStorageData }),
      });

      // Refresh records after migration - don't throw on fetch error
      try {
        await fetchRecords();
      } catch (fetchError) {
        console.warn('Failed to refresh records after migration:', fetchError);
        // Don't throw, just log the warning
      }
      
      return data.data;
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi di chuyển dữ liệu';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [status, apiCall, fetchRecords]);

  // Auto-fetch data when authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      fetchRecords();
      fetchStatistics();
    }
  }, [status, fetchRecords, fetchStatistics]);

  // Check and migrate localStorage data on authentication
  useEffect(() => {
    if (status === 'authenticated' && typeof window !== 'undefined') {
      const localData = localStorage.getItem('gestationalDiabetesRecords');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            // Ask user if they want to migrate
            if (window.confirm('Bạn có dữ liệu cũ trên thiết bị này. Bạn có muốn di chuyển lên tài khoản không?')) {
              migrateLocalStorageData(parsedData).then(() => {
                // Clear localStorage after successful migration
                localStorage.removeItem('gestationalDiabetesRecords');
                alert('Đã di chuyển dữ liệu thành công!');
              }).catch(err => {
                console.error('Migration failed:', err);
                alert('Có lỗi khi di chuyển dữ liệu: ' + err.message);
              });
            }
          }
        } catch (err) {
          console.error('Error parsing localStorage data:', err);
        }
      }
    }
  }, [status, migrateLocalStorageData]);

  return {
    // Data
    records,
    statistics,
    
    // States
    loading,
    error,
    isAuthenticated: status === 'authenticated',
    session,
    
    // Actions
    fetchRecords,
    fetchStatistics,
    createRecord,
    updateRecord,
    deleteRecord,
    migrateLocalStorageData,
    
    // Utilities
    clearError: () => setError(null),
  };
};
