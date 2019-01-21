"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "angular-service" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.insertService', () => {
        // The code you place here will be executed every time your command is executed
        insertService();
        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');
    });
    let disposable2 = vscode.commands.registerCommand('extension.insertServiceWithconstructor', () => {
        // The code you place here will be executed every time your command is executed
        insertService(true);
        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function insertService(withConstructor = false) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    editor.edit(builder => {
        editor.selections.forEach(selection => {
            //const text = editor.document.getText(selection);
            const position = selection.start;
            // loop back to find the ':'
            let foundColon = 0;
            for (let index = position.character; index >= 0; index--) {
                const range = new vscode.Range(position.line, index, position.line, index + 1);
                console.log(editor.document.getText(range));
                if (editor.document.getText(range) === ':') {
                    foundColon = index;
                    break;
                }
            }
            const servicerange = new vscode.Range(position.line, foundColon + 1, position.line, position.character);
            let service = editor.document.getText(servicerange);
            //service = service.toLocaleLowerCase();
            service = service.charAt(0).toLowerCase() + service.slice(1);
            console.log(service);
            let newposition;
            if (withConstructor) {
                // at the end , add ") {}"
                newposition = new vscode.Position(position.line, position.character);
                builder.insert(newposition, ') {}');
            }
            newposition = new vscode.Position(position.line, foundColon + 1);
            builder.insert(newposition, ' '); // space after semicolon
            newposition = new vscode.Position(position.line, foundColon);
            if (withConstructor) {
                builder.insert(newposition, 'constructor (private ' + service);
            }
            else {
                builder.insert(newposition, 'private ' + service);
            }
        });
    });
}
//# sourceMappingURL=extension.js.map