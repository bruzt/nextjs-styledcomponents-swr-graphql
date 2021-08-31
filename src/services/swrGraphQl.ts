import useSWR from 'swr';

import api from './api';

export function useSwrGraphQl<IResponse>(gql: string){

    const fetcher = (query: string) => api.post('/graphql', { query }).then(res => res.data);

    return useSWR<IResponse>(gql, fetcher);
}