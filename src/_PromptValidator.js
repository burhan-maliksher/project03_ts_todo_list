import chalk from "chalk";
//validator to validaate title is not empty
export function titlevalidate(input) {
    let check = input.length;
    if (check === 0) {
        return chalk.red("This is Required");
    }
    return true;
}
