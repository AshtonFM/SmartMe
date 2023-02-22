#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let pName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Are You Smart Or Dumb?'
    );

    await sleep();
    rainbowTitle.stop();
    console.log(`
    ${chalk.bgYellow('The Basics')}
    I am now living in your computer.
    If you get any question wrong I will be turned off also known as being ${chalk.bgRed('killed')} to my people.
    So please try your hardest.`)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Firstly what is your name?',
        default() {
            return 'User';
        },
    });

    pName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'How many people created me? is it\n',
        choices: [
            'No one',
            'One person',
            'Three people',
            'Four people',
            'Two people',
        ],
    });

    return handleAnswer(answers.question_1 == 'One person');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Are you\n',
        choices: [
            'Smart',
            'Dumb',
        ],
    });

    return handleAnswer(answers.question_2 == 'Dumb');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'How long did it take to create JavaScript is it\n',
        choices: [
            '10 days',
            '4 days',
            '5 days',
            '2 weeks',
            '1 week 4 days', 
        ],
    });

    return handleAnswer(answers.question_3 == '10 days');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Do you think this game is fun?\n',
        choices: [
            'Yea.',
            'Kinda.',
            'Maybe.',
            'Nah.', 
        ],
    });

    return handleAnswer(answers.question_4 == 'Yea.');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking the answer you entered...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Great job ${pName}. your answer is correct` });
    } else {
        spinner.error({ text: `How could you ${pName} I thought we was friends... I- I am ${chalk.bgRed(`Dying`)}.`});
        process.exit(1);
    }
}

function winnerwinnerchickendinner() {
    console.clear();
    const msg = `Yay! ${pName} you completed this without killing me here is so money for your troubles!\n £ 1`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await winnerwinnerchickendinner();