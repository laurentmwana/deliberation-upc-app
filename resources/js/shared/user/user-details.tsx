import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { UserModel } from '@/types';
import React from 'react';

interface UserDetailProps {
    user: UserModel;
}

export const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-2xl">
                    {user.name}
                    <Badge variant="secondary" className="uppercase">
                        {user.role}
                    </Badge>
                </CardTitle>
                <CardDescription>Informations sur le compte utilisateur</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Email :</span> {user.email}
                    </p>
                    <p>
                        <span className="font-medium">Vérification email :</span>{' '}
                        {user.email_verified_at ? formatDate(user.email_verified_at) : <Badge variant="destructive">Non vérifié</Badge>}
                    </p>
                    <p>
                        <span className="font-medium">ID :</span> {user.id}
                    </p>
                </div>
                <div className="space-y-2">
                    {user.student && (
                        <p>
                            <span className="font-medium">Étudiant lié :</span> {user.student.firstname} {user.student.name}
                        </p>
                    )}
                    <p>
                        <span className="font-medium">Créé le :</span> {formatDate(user.created_at)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
