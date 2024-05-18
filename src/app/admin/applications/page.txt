'use client'
import { Application } from "@/domain/applications/application";
import { Container, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import dayjs from 'dayjs';
import { Link } from "@chakra-ui/next-js";
import { ApplicationStatus } from "@/domain/enums/application-status";

export default function Applications() {
    const session = (useSession() as never) as ReturnType<typeof useSession> & { data: Session & { accessToken: string, tenantId: string } };
    const [applications, setApplications] = useState<Application[]>([])
    useEffect(() => {
        if (session.data?.accessToken)
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string + "/applications?status=0", {
                headers: {
                    'authorization': 'Bearer ' + session.data.accessToken,
                    'x-tenant-id': session.data.tenantId
                }
            }).then(res => res.json()).then(res => setApplications(res));
    }, [session.data?.accessToken, session.data?.tenantId]);

    return (
        <Container padding={5}>
            <Heading textAlign={'center'} margin={10}>Başvurular</Heading>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Ad Soyad</Th>
                            <Th>Başvuru Tarihi</Th>
                            <Th>Durum</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {applications.map((application) => (
                            <Tr key={application.id}>
                                <Td>{application.firstName} {application.lastName}</Td>
                                <Td>{dayjs(application.createdDate).format('DD MMMM YYYY HH:mm')}</Td>
                                <Td>{application.status === ApplicationStatus.Pending ? 'İșlem Bekleniyor' : 'Tamamlandı'}</Td>
                                <Td><Link href={`${window.location.href}/${application.id}`}>Detay</Link></Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    )
}