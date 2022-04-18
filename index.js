#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Do you know compiler design? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(chalk.green(`Thank you for playing the terminal quiz`));
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'What is LL(1)?\n',
    choices: ['Predictive Parsing', 'SLR', 'CLR', 'LALR'],
  });

  return handleAnswer(answers.question_1 === 'Predictive Parsing');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'What is the full form of SLR?\n',
    choices: ['Simple LR', 'Syntax LR', 'Super LR', 'Syndicate LR'],
  });
  return handleAnswer(answers.question_2 === 'Simple LR');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `What is the first phase of compiler?\n`,
    choices: ['Lexical', 'Syntax', 'Semantic', 'NOTA'],
  });

  return handleAnswer(answers.question_3 === 'Lexical');
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'Types of translator are:\n',
    choices: [
      'Compiler',
      'Interpretor',
      'Assemby lang',
      'All of the above', // Correct
    ],
  });
  return handleAnswer(answers.question_4 === 'All of the above');
}

// async function question5() {
//   const answers = await inquirer.prompt({
//     name: 'question_5',
//     type: 'list',
//     message:
//       'JS is a high-level single-threaded, garbage-collected,\n' +
//       'interpreted(or just-in-time compiled), prototype-based,\n' +
//       'multi-paradigm, dynamic language with a ____ event loop\n',
//     choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
//   });

//   return handleAnswer(answers.question_5 === 'non-blocking');
// }

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
// await question5();
winner();
