export interface FacultyModel {
    id: number;
    name: string;
    departments: DepartmentModel[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface DepartmentModel {
    id: number;
    name: string;
    alias: string;
    faculty_id: number;
    faculty: FacultyModel;
    levels: LevelModel[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface LevelModel {
    id: number;
    name: string;
    alias: string;
    department_id: number;
    department: DepartmentModel;
    courses: CourseModel[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface YearModel {
    id: number;
    name: string;
    start: string;
    end: string;
    is_closed: boolean;
    created_at: string;
    updated_at: string;
}

export interface CourseModel {
    id: number;
    name: string;
    semester: string;
    level_id: number;
    level: LevelModel;
    teacher: TeacherModel;
    teacher_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface TeacherModel {
    id: number;
    name: string;
    firstname: string;
    gender: string;
    phone: string;
    departments: DepartmentModel[];
    courses: CourseModel[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
