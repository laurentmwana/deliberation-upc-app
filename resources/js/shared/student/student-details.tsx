import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StudentModel } from '@/types/model';
import { formatDate } from '@/lib/date-time';

interface StudentDetailProps {
  student: StudentModel;
}

export const StudentDetail: React.FC<StudentDetailProps> = ({ student }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          {student.firstname} {student.name}
          <Badge variant="outline" className="ml-3">
            {student.gender}
          </Badge>
        </CardTitle>
        <CardDescription className="pt-1">
          Informations détaillées de l’étudiant
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-2">
          <p>
            <span className="font-medium">ID :</span> {student.id}
          </p>
          <p>
            <span className="font-medium">Date de naissance :</span>{' '}
            {new Date(student.birth).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            <span className="font-medium">Niveau actuel :</span>{' '}
            {student.actual_level?.level.name ?? 'Non défini'}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Créé le :</span>{' '}
            {formatDate(student.created_at)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
