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
    }
]


export const GET: RequestHandler = () => {
    return json(questions);
}

export const POST: RequestHandler = async ({ request }) => {
    const question = await request.json();

    if (questions.some(x => x.id == question.id)) {
        questions.filter(x => x.id == question.id).forEach(q => {
            q.answered = question.answered;
            q.correct = question.correct;
        });
        return json(questions);
    }
    questions.push(question);
    return json(questions);
}

