import { derived, writable } from "svelte/store";
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId();
export const generateRandomInt = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

export const getRandomInArray = (range: any[]) => {
    return range[generateRandomInt(0, range.length)];
}


export const smallQuestions = writable([{
    id: uid(),
    question: 'What year did MODO win SM-guld',
    answer: '2007',
    answered: false,
    correct: undefined
}]);

export const addNew = (question: string, answer: any) => {
    smallQuestions.update(x => {
        return [...x, {
            question, answer, answered: false, correct: undefined, id: uid()
        }]
    })
}

export const currentQuestion = derived(
    smallQuestions,
    $smallQuestions => {
        const y = $smallQuestions.filter(x => !x.answered);
        return y.length > 0 ? getRandomInArray(y) : getRandomInArray($smallQuestions)
    })
