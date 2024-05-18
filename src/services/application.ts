import useSWR from 'swr'
import { fetcher } from './abstractions';
import { Application } from '@/domain/applications/application';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

const useApplications = () => {
    const session = (useSession() as never) as ReturnType<typeof useSession> & { data: Session & { access_token?: string } };
    const { data, error, isLoading } = useSWR<Application[]>(`/applications`, fetcher)
    return {
        applications: data,
        isLoading,
        isError: error
    }
}

export { useApplications };
