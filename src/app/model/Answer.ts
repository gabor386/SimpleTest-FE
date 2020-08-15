import { Question } from './Question';
import { Test } from './Test';

export class Answer {

    constructor (question: Question,test: Test) {
        this.question = question;
        this.test = test;
        this.answerText = '';
        this.score = 0;
    }

    id: number;
    question: Question;
    answerText: string;
    score: number;
    test: Test;
}