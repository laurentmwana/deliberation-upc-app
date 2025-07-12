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

export interface OrientationModel {
    id: number;
    name: string;
    department_id: number;
    department: DepartmentModel;
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
    orientation_id: number | null;
    orientation: OrientationModel | null;
    courses: CourseModel[];
    students: StudentModel[];
    semesters: SemesterModel[];
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
    closed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface CourseModel {
    id: number;
    name: string;
    alias: string;
    credits: number;
    level_id: number;
    level: LevelModel;
    teacher: TeacherModel;
    teacher_id: number;
    semester_id: number;
    semester: SemesterModel;
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

export interface SemesterModel {
    id: number;
    name: string;
    full_name: string;
    created_at: string;
    updated_at: string;
}

export interface StudentModel {
    id: number;
    name: string;
    firstname: string;
    gender: string;
    birth: string;
    registration_token: string;
    grades: GradeModel[];
    actual_level: ActualLevelModel;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface ActualLevelModel {
    id: number;
    level_id: number;
    year_id: number;
    student_id: number;
    student: StudentModel;
    year: YearModel;
    level: LevelModel;
    historic_level: HistoricLevelModel[];
    created_at: string;
    created_at: string;
    updated_at: string;
}

export interface HistoricLevelModel {
    id: number;
    level_id: number;
    year_id: number;
    student_id: number;
    student: StudentModel;
    year: YearModel;
    level: LevelModel;
    created_at: string;
    created_at: string;
    updated_at: string;
}

export interface GradeModel {
    id: number;
    score: number;
    level_id: number;
    year_id: number;
    student_id: number;
    course_id: number;
    student: StudentModel;
    year: YearModel;
    level: LevelModel;
    course: CourseModel;
    created_at: string;
    created_at: string;
    updated_at: string;
}

export interface DeliberationModel {
    id: number;
    description: string | null;
    level_id: number;
    year_id: number;
    semester_id: number;
    year: YearModel;
    level: LevelModel;
    semester: SemesterModel;
    created_at: string;
    created_at: string;
    updated_at: string;
}
