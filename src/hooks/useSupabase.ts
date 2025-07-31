import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseSupabaseReturn<T> extends UseSupabaseState<T> {
  refetch: () => Promise<void>;
  mutate: (newData: T) => void;
  reset: () => void;
}

// Hook لجلب البيانات من Supabase
export function useSupabaseQuery<T>(
  table: string,
  query?: string,
  dependencies: any[] = []
): UseSupabaseReturn<T[]> {
  const [state, setState] = useState<UseSupabaseState<T[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      let queryBuilder = supabase.from(table).select(query || '*');
      
      const { data, error } = await queryBuilder;
      
      if (error) {
        throw error;
      }
      
      setState({
        data: data as T[],
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error(`Error fetching ${table}:`, error);
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'حدث خطأ في تحميل البيانات',
      });
    }
  }, [table, query, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mutate = useCallback((newData: T[]) => {
    setState(prev => ({ ...prev, data: newData }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: true,
      error: null,
    });
  }, []);

  return {
    ...state,
    refetch: fetchData,
    mutate,
    reset,
  };
}

// Hook لإدراج البيانات
export function useSupabaseInsert<T>(table: string) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  const insert = useCallback(async (data: Partial<T>) => {
    try {
      setState({ loading: true, error: null, success: false });
      
      const { error } = await supabase
        .from(table)
        .insert(data);
      
      if (error) {
        throw error;
      }
      
      setState({ loading: false, error: null, success: true });
      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في حفظ البيانات';
      setState({ loading: false, error: errorMessage, success: false });
      return { success: false, error: errorMessage };
    }
  }, [table]);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false });
  }, []);

  return {
    ...state,
    insert,
    reset,
  };
}

// Hook لتحديث البيانات
export function useSupabaseUpdate<T>(table: string) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  const update = useCallback(async (id: string, data: Partial<T>) => {
    try {
      setState({ loading: true, error: null, success: false });
      
      const { error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setState({ loading: false, error: null, success: true });
      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في تحديث البيانات';
      setState({ loading: false, error: errorMessage, success: false });
      return { success: false, error: errorMessage };
    }
  }, [table]);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false });
  }, []);

  return {
    ...state,
    update,
    reset,
  };
}

// Hook لحذف البيانات
export function useSupabaseDelete(table: string) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  const deleteRecord = useCallback(async (id: string) => {
    try {
      setState({ loading: true, error: null, success: false });
      
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setState({ loading: false, error: null, success: true });
      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في حذف البيانات';
      setState({ loading: false, error: errorMessage, success: false });
      return { success: false, error: errorMessage };
    }
  }, [table]);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false });
  }, []);

  return {
    ...state,
    delete: deleteRecord,
    reset,
  };
}

// Hook لمراقبة التغييرات في الوقت الفعلي
export function useSupabaseSubscription<T>(
  table: string,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
  callback?: (payload: any) => void
) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event,
          schema: 'public',
          table,
        },
        (payload) => {
          setIsConnected(true);
          setError(null);
          if (callback) {
            callback(payload);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setError(null);
        } else if (status === 'CLOSED') {
          setIsConnected(false);
        }
      });

    return () => {
      channel.unsubscribe();
      setIsConnected(false);
    };
  }, [table, event, callback]);

  return {
    isConnected,
    error,
  };
}

// Hook لفحص حالة الاتصال
export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [latency, setLatency] = useState<number | null>(null);

  const checkConnection = useCallback(async () => {
    try {
      const startTime = Date.now();
      const { error } = await supabase.from('services').select('id').limit(1);
      const endTime = Date.now();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found" which is OK
        throw error;
      }
      
      setIsConnected(true);
      setLatency(endTime - startTime);
    } catch (error) {
      console.error('Supabase connection error:', error);
      setIsConnected(false);
      setLatency(null);
    }
  }, []);

  useEffect(() => {
    checkConnection();
    
    // فحص الاتصال كل 30 ثانية
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, [checkConnection]);

  return {
    isConnected,
    latency,
    checkConnection,
  };
}

// Utility function للتعامل مع أخطاء Supabase
export function handleSupabaseError(error: PostgrestError | Error | null): string {
  if (!error) return '';
  
  // أخطاء Supabase المحددة
  if ('code' in error) {
    switch (error.code) {
      case 'PGRST116':
        return 'لم يتم العثور على بيانات';
      case 'PGRST301':
        return 'غير مصرح بالوصول';
      case '23505':
        return 'البيانات موجودة بالفعل';
      case '23503':
        return 'لا يمكن حذف هذا العنصر';
      default:
        return error.message || 'حدث خطأ في قاعدة البيانات';
    }
  }
  
  return error.message || 'حدث خطأ غير معروف';
}

// Type guards
export function isPostgrestError(error: any): error is PostgrestError {
  return error && typeof error === 'object' && 'code' in error;
}
