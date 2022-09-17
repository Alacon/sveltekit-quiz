import { json, type RequestHandler } from "@sveltejs/kit";
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId();

const questions = [
    {
        id: uid(),
        question: 'What year did MODO win SM-guld',
        answer: '2007',
        answered: false,
        correct: undefined
    },
    {
        id: uid(),
        question: 'How many points did Foppa have 2002/2003',
        answer: 106,
        answered: false,
        correct: undefined
    },
    {
        id: uid(),
        question: 'How many points did Näslund have 2002/2003',
        answer: 104,
        answered: false,
        correct: undefined
    }
]


export const GET: RequestHandler = () => {
    return json(questions);
}

export const POST: RequestHandler = async ({ request }) => {
    
    const question = await request.json();
    questions.push(question);
    return json(questions);
}
