import api from '@/api';

const fetcher = <T>(url: string) => api.get<T>(url).then(res => res.data);

export default fetcher;
