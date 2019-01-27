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
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function insertService() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    editor.edit(builder => {
        const position = editor.selection.start;
        let foundColon = 0;
        const lineUntilCursor = editor.document.getText(new vscode.Range(position.line, 0, position.line, position.character));
        // loop back to find the ':'
        foundColon = lineUntilCursor.lastIndexOf(':');
        if (foundColon < 0) {
            return;
        }
        //get the injected service name
        const originalServiceName = editor.document.getText(new vscode.Range(position.line, foundColon + 1, position.line, position.character));
        // change the first letter to lowercase
        const service = originalServiceName.charAt(0).toLowerCase() + originalServiceName.slice(1);
        // search if 'constructor' exist in our code
        const firstLine = editor.document.lineAt(0);
        const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        const textRange = new vscode.Range(0, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
        let replacementText = '';
        if (editor.document.getText(textRange).indexOf('constructor') < 0) {
            replacementText = 'constructor(private ' + service + ': ' + originalServiceName + ') {}';
        }
        else {
            replacementText = 'private ' + service + ': ' + originalServiceName;
        }
        builder.replace(new vscode.Range(position.line, position.character - originalServiceName.length - 1, position.line, position.character), replacementText);
    })
        .then(success => {
        // change the selection: start postion and end portion of the new selection is same, so it is not to select replaced text;
        var postion = editor.selection.end;
        editor.selection = new vscode.Selection(postion, postion);
    });
}
//# sourceMappingURL=extension.js.map