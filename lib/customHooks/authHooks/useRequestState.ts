import { useCallback, useState } from 'react';

type AuthStateType<DataType, ErrorType> =
  | {
      data: DataType;
      loading: false;
      success: true;
      error: ErrorType | undefined;
    }
  | {
      data: undefined;
      loading: true;
      success: false;
      error: ErrorType | undefined;
    }
  | {
      data: undefined;
      loading: false;
      success: false;
      error: ErrorType | undefined;
    };

/**
 * Custom hook that works like a state machine for authentificaton.
 */
const useRequestAuthState = <DataType = unknown, ErrorType = unknown>() => {
  const [authState, setAuthState] = useState<
    AuthStateType<DataType, ErrorType>
  >({
    data: undefined,
    loading: false,
    success: false,
    error: undefined,
  });

  const setLoading = useCallback((loading: boolean) => {
    setAuthState({
      data: undefined,
      loading,
      success: false,
      error: undefined,
    });
  }, []);

  const setData = useCallback((data: DataType) => {
    setAuthState({
      data,
      loading: false,
      success: true,
      error: undefined,
    });
  }, []);

  const setError = useCallback((error: ErrorType) => {
    setAuthState({
      data: undefined,
      loading: false,
      success: false,
      error,
    });
  }, []);

  return {
    authState,
    setAuthState,
    setLoading,
    setData,
    setError,
  };
};

export { useRequestAuthState };
