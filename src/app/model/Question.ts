import { TestTemplate } from './TestTemplate';

export class Question{
    id: number;
    questionText: string;
    testTemplate: TestTemplate;
    isMarkedForCheck: boolean = false;
}