import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const URL_BASE = "http://localhost:5000";

export const useLogin = (
  onSuccess: (loginToken: string) => void,
  onError: () => void
) => {
  const [ loading, setLoading ] = useState(false);

  const login = useCallback((email: string, password: string) => {
    setLoading(true);
    axios.post(`${URL_BASE}/login`, {email, password})
      .then((res) => onSuccess(res.data.loginToken))
      .catch((_) => onError())
      .finally(() => setLoading(false));
  }, [onSuccess, onError]);

  return [login, loading];
}

export const useListOrganisations = (email: string) => {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState();
  const [ error, setError ] = useState();

  useEffect(() => {
    axios.get(`${URL_BASE}/user/${email}/organisations`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
}

export const useListCohorts = (organisationId: number) => {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState();
  const [ error, setError ] = useState();

  useEffect(() => {
    axios.get(`${URL_BASE}/organisation/${organisationId}/cohorts`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
}

export const useListStudents = (organisationId: number, cohortId: number) => {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState();
  const [ error, setError ] = useState();

  useEffect(() => {
    axios.get(`${URL_BASE}/organisation/${organisationId}/cohort/${cohortId}/students`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
}