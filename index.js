#!/usr/bin/env node


import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
// import chalk from 'chalk';

let totalCorrect = 0;

// Function to ask a question
async function askQuestion(question, answers, correctAnswerIndex) {
    const options = answers.map(answer => ({ value: answer, label: answer }));

    const answer = await p.select({
        message: question,
        initialValue: '1',
        options,
    });

    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();

    if (answer === answers[correctAnswerIndex]) {
        totalCorrect++;
    }
}

// Question class
class Question {
    constructor(question, answersArray, correctAnswerIndex) {
        this.question = question;
        this.answersArray = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

// Main function
async function main() {
    console.clear();
    await setTimeout(1000);

    p.intro(`${(color.cyanBright(` Let's Put Your Programming Skills to Test :: `))}`);

    const allQuestions = [
        new Question(
            `1) Which command is used to list all files (including hidden files) in a Linux terminal?`,
            ["ls", "list", "show", "ls -al"],
            3
        ),
        new Question(
            "2) What is the difference between == and === in JavaScript?",
            [
                "== compares values and types, === compares only values.",
                "== compares only values, === compares values and types",
                "Both do the same thing.",
                "== is used for comparing objects, === for primitive types.",
            ],
            1
        ),
        new Question(
            `3) a = [1, 2, 3]\n|     b = a \n|     b[0] = 10 \n|     print(a)`,
            ["[1,2,3]", "[10,10,3]", "[10,2,3]", "error"],
            2
        ),
        new Question(
            "4) What happens if I run:\n|  echo a && echo b || echo c ; echo d",
            ["abcd", "abd", "ab", "ab\n|    d"],
            3
        ),
        new Question(
            "5) SELECT DISTINCT column_name FROM table_name;",
            [
                "Returns all rows in the table",
                "Returns rows with unique values from column_name",
                "Returns only the first row from column_name",
                "Returns rows with NULL values from column_name.",
            ],
            1
        ),
        new Question(
            "6) dev.txt does not exist.\n|  What happens on: echo 'Hello World' >> dev.txt?\n",
            ["No file found error", "dev.txt would be created and populated with 'Hello World'"],
            1
        ),
        new Question(
            "7) After running the above command, what is in dev.txt if I ran:\n|  'the name is bond' >> dev.txt && 'James Bond' > dev.txt ?",
            [
                "Hello Worldthe name is bondJames Bond",
                "the name is bondJames Bond",
                "James Bond",
                "Hello World\n|    the name is bond\n|    James Bond",
            ],
            2
        ),
        new Question(
            "8) Which command does NOT show `echo`'s help?",
            ["/bin/echo --help", "help echo", "echo --help", "man echo"],
            1
        ),
        new Question(
            "9) Which command will rename a file 'hello' to 'gello'?",
            ["rm hello gello", "mv hello gello", "cp hello gello", "cd hello gello"],
            1
        ),
        new Question(
            "10) Last one. How to force quit Vim?",
            ["Destroying Your Computer", "wq!", "run for your life", "q!"],
            3
        ),
    ];

    const readyToPlay = await p.select({
        message: "Good luck. 10 questions. Results at the end. Ready to play?",
        initialValue: "Yes",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
        ],
    });

    if (readyToPlay === "Yes") {
        for (const question of allQuestions) {
            await askQuestion(question.question, question.answersArray, question.correctAnswerIndex);
        }

        p.outro(`${color.yellowBright(`You got ${totalCorrect} questions correct!! 🥳`)}`);

        if (totalCorrect === 10) {
            const s = p.spinner();
            s.start("Unlocking secret message");
            await setTimeout(5000);
            s.stop();
            p.outro(`${color.cyanBright(`You did it ?! 10/10 ? Here's Your REWARD:  https://tinyurl.com/2pxn86s9`)}`);
        } else {
            const s = p.spinner();
            s.start();
            await setTimeout(3000);
            s.stop();
            p.outro(`${color.bgBlue(color.whiteBright(`You need 10/10 correct to unlock the secret message. Try again.`))}`);
        }
    } else {
        p.outro(`${color.yellow(`Ok. Bye! 🤧`)}`);
    }
}

main().catch(console.error);
