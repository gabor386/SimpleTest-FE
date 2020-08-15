import { Test } from './Test';
import {TestGroup} from './TestGroup';
import {Question} from './Question';

export class TestTemplate{
    id: number;
    testTemplateName: string;
    testGroup: TestGroup;
    timer:number;
    question: Array<Question>;
    tests: Array<Test>;
}