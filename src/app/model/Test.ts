import { User } from './User';
import {Candidate} from './Candidate';
import {TestTemplate} from './TestTemplate';
import { Answer } from './Answer';

export class Test {
    id: number;
    candidate: Candidate;
    interviewer: User;
    testTemplate: TestTemplate;
    status: String;
    answers: Array<Answer>;
}