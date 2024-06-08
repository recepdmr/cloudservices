async function getData() {
    const res = await fetch('http://144.91.88.143:3801/application/list', { next: { revalidate: 1 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    const data = await getData()

    return <main>{JSON.stringify(data)}</main>
}