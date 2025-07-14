import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { StudentModel } from './model';

export interface Auth {
    user: UserModel;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: FlashMessage;
    [key: string]: unknown;
}

export interface FlashMessage {
    success: string | null;
    danger: string | null;
    warning: string | null;
    danger: string | null;
}

export interface UserModel {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role: string;
    student: StudentModel;
    created_at: string;
    updated_at: string;
    is_admin: boolean;
    is_student: boolean;
    [key: string]: unknown; // This allows for additional properties...
}
