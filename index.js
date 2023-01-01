#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { titleTimer } from "./src/_AppTitle.js";
import { titlevalidate } from "./src/_PromptValidator.js";
class _Todo {
    _selected_menu;
    _add_todo;
    _view_todo_title;
    constructor() {
        this._selected_menu = "";
        this._add_todo = [
            {
                item: "",
                todo: [],
                mark: "unmark",
            },
        ];
        this._view_todo_title = "";
    }
    async Run() {
        await this.AppTitle();
        // main method
        await this.Home();
    }
    // autor watermark on app at the begening
    async AppTitle() {
        const title = chalkAnimation.neon(`______________________Welcome to M.B Todo List App______________________`);
        await titleTimer();
        title.stop();
        console.log(chalk.bgRed.italic(`                                                             Autor:"M.B"`));
        return;
    }
    // main menu
    async Home() {
        const home = await inquirer.prompt([
            {
                type: "list",
                name: "selected_menu",
                message: "Please chosse to proceed",
                choices: ["ADD Todo", "View", "Exit"],
            },
        ]);
        this._selected_menu = home.selected_menu;
        // checks the user choice
        const check = this._selected_menu;
        switch (check) {
            case "ADD Todo":
                this.Add();
                break;
            case "View":
                this.View();
                break;
            case "Exit":
                this.Quit();
                break;
        }
    }
    async Add() {
        let addtodo;
        let confirm;
        let todo_array = [];
        // title of todo list
        const add = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter a Title for Todo List",
                validate: titlevalidate,
            },
        ]);
        //adding multiple todo's for the title above
        do {
            const todo = await inquirer.prompt([
                {
                    type: "input",
                    name: "list",
                    message: "Enter your Todo List",
                    validate: titlevalidate,
                },
                {
                    type: "confirm",
                    name: "decision",
                    message: "Do you want to add more to todo list",
                },
            ]);
            todo_array.push(todo.list);
            confirm = todo.decision;
        } while (confirm === true);
        // type todo list variable to store added todo to it
        addtodo = {
            item: add.title,
            todo: todo_array,
            mark: "unmark",
        };
        // pushing added todo list and displaying sucess message
        this._add_todo.push(addtodo);
        console.log(addtodo);
        console.log(chalk.greenBright(`________________________________added Succesfully`));
        // back to main option after entering todo list
        if (true) {
            this.Back_to_home();
        }
    }
    async View() {
        let view = this._add_todo;
        // condition to show todo if todo list is not empty
        if (view !== undefined && view.length !== 1) {
            const all_titles = view.map(key => key.item);
            // prompt to show titles of all todo's
            const titles_list = await inquirer.prompt([{
                    type: "list",
                    name: "titleChosse",
                    message: "Pick one title to View todo's",
                    choices: all_titles,
                }]);
            const titleChossed = titles_list.titleChosse;
            this._view_todo_title = titleChossed;
            // finding all values against the title choosed and displaying it 
            const view_todo = view.find(key => key.item === titleChossed);
            console.log(chalk.blue(` title :   "${view_todo?.item}"`));
            console.log(chalk.cyan(` Todo's ${view_todo?.todo}`));
            console.log(chalk.green(` Status : ${(view_todo?.mark)}`));
            // giving choice to mrak/unmark or back to main option
            const markORback = await inquirer.prompt([{
                    type: "list",
                    name: "option",
                    choices: ["Mark/UnMark", "Main"]
                }]);
            if (markORback.option === "Mark/UnMark") {
                this.MarkUnMark();
            }
            else {
                this.Back_to_home();
            }
        }
        // message if try to view todo list when todo list is empty
        else {
            console.log(chalk.blue("No list added yet!"));
            // back to main menu or exit
            const back = await inquirer.prompt([{
                    type: "list",
                    name: "backoption",
                    choices: ['back to main']
                }]);
            if (back.backoption === "back to main") {
                // back to home
                this.Back_to_home();
            }
        }
        // end of view todo list
    }
    // marking and unmarking a todo list
    async MarkUnMark() {
        let view = this._add_todo;
        const markOption = await inquirer.prompt([{
                type: "checkbox",
                name: "check",
                choices: ["mark", "unmark"],
                validate: (check) => {
                    if (check.length === 0) {
                        return "please check one to Continue";
                    }
                    return true;
                }
            }]);
        const mark = markOption.check;
        // passing mark 
        if (mark == "mark") {
            // finding the index of the todo whose title is choosed
            const index = view.findIndex(key => key.item === this._view_todo_title);
            let check = 'mark';
            // passing mark in key"mark" in object of index=index
            this._add_todo[index]["mark"] = check;
            if (true) {
                this.Back_to_home();
            }
        }
        else if (mark == "unmark") {
            // finding the index of the todo whose title is choosed
            const index = view.findIndex(key => key.item === this._view_todo_title);
            let check = 'unmark';
            // passing unmark in key"mark" in object of index=index
            this._add_todo[index]["mark"] = check;
            if (true) {
                this.Back_to_home();
            }
        }
        // end of mark unmark or back to home
    }
    async Quit() {
        console.log(chalk.green("Thanks for Using Todo App By M.B"));
        return;
    }
    async Back_to_home() {
        this.Home();
    }
}
let runApp = new _Todo();
runApp.Run();
