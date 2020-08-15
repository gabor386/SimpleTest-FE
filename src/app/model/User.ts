import {Role} from './Role';
import {Test} from './Test';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    tests: Array<Test>;
    passwordChanged: boolean;
}