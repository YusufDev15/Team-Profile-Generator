const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "Output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { userInfo } = require("os");

const teamMembers = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const promptManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the manager's name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: "What is the manager's employee ID?",
        validate: (employeeId) => {
          if (employeeId) {
            return true;
          } else {
            console.log("Please enter the manager's employee ID!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email address?",
        validate: (email) => {
          if (email) {
            return true;
          } else {
            console.log("Please enter the manager's email address!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        validate: (officeNumber) => {
          if (officeNumber) {
            return true;
          } else {
            console.log("Please enter the manager's office number!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const manager = new Manager(
        answers.name,
        answers.employeeId,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      promptMenu();
    });
};

const promptMenu = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Please select which option you would like to continue with:",
        choices: [
          "add an engineer",
          "add an intern",
          "finish building my team",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.menu) {
        case "add an engineer":
          promptEngineer();
          break;
        case "add an intern":
          promptIntern();
          break;
        default:
          buildTeam();
      }
    });
};

const promptEngineer = () => {
  console.log(`
    ------------------
    Add a New Engineer
    ------------------
    `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the engineer?",
        validate: (engineerName) => {
          if (engineerName) {
            return true;
          } else {
            console.log("Please enter the name of the engineer!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: "What is your engineer's employee ID",
        validate: (employeeId) => {
          if (employeeId) {
            return true;
          } else {
            console.log("Please enter your engineer's employee ID!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's email address?",
        validate: (email) => {
          if (email) {
            return true;
          } else {
            console.log("Please enter your engineer's email address!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "githubUsername",
        message: "What is your engineer's Github username?",
        validate: (githubUsername) => {
          if (githubUsername) {
            return true;
          } else {
            console.log("Please enter your engineer's Github username!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const engineer = new Engineer(
        answers.name,
        answers.employeeId,
        answers.email,
        answers.githubUsername
      );
      teamMembers.push(engineer);
      promptMenu();
    });
};

const promptIntern = () => {
  console.log(`
      ------------------
      Add a New Intern
      ------------------
      `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the intern?",
        validate: (internName) => {
          if (internName) {
            return true;
          } else {
            console.log("Please enter the name of the intern!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: "What is your intern's employee ID?",
        validate: (employeeId) => {
          if (employeeId) {
            return true;
          } else {
            console.log("Please enter your intern's employee ID!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email address?",
        validate: (email) => {
          if (email) {
            return true;
          } else {
            console.log("Please enter your intern's email address!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "What is your intern's school name?",
        validate: (school) => {
          if (school) {
            return true;
          } else {
            console.log("Please enter your intern's school name!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const intern = new Intern(
        answers.name,
        answers.employeeId,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      promptMenu();
    });
};

const buildTeam = () => {
  console.log(`
    ------------------
    Finished building my team!
    ------------------
    `);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  console.log('HTML file created')
};
promptManager();
