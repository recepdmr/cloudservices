'use client'

const authorizationToken = '';

const fetcher = (url: string) => fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`, {
    headers: {
        'x-tenant-id': process.env.NEXT_PUBLIC_TENANT_ID!,
        'content-type': 'application/json',
        'authorization': `Bearer ${authorizationToken}`
    }
}).then((res) => res.json())

export { fetcher };