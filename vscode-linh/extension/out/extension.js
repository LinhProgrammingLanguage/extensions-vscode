"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
function activate(context) {
    console.log('Linh extension is now active!');
    let runCommand = vscode.commands.registerCommand('vscode-linh.runCode', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor!');
            return;
        }
        const document = editor.document;
        if (document.languageId !== 'linh') {
            vscode.window.showErrorMessage('Not a Linh file!');
            return;
        }
        const filePath = document.fileName;
        // Create output channel
        const outputChannel = vscode.window.createOutputChannel('Linh Output');
        outputChannel.show();
        // Updated command to match PowerShell syntax
        (0, child_process_1.exec)(`Linh "${filePath}"`, { shell: 'powershell.exe' }, (error, stdout, stderr) => {
            if (error) {
                outputChannel.appendLine(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                outputChannel.appendLine(`Error: ${stderr}`);
                return;
            }
            outputChannel.appendLine(stdout);
        });
    });
    context.subscriptions.push(runCommand);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map