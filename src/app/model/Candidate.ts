import { User } from './User';
import { Test } from './Test';
import { FileCV } from './FileCV';

export class Candidate {
    id: number;
    status: string; 
    lastStatusUpdate: Date;
    testsData: Array<Test>;
    user: User;
    files: Array<FileCV>;
}