import * as vscode from 'vscode';
import { exec, ExecException } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
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
        exec(`Linh "${filePath}"`, { shell: 'powershell.exe' }, 
            (error: ExecException | null, stdout: string, stderr: string) => {
                if (error) {
                    outputChannel.appendLine(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    outputChannel.appendLine(`Error: ${stderr}`);
                    return;
                }
                outputChannel.appendLine(stdout);
            }
        );
    });

    context.subscriptions.push(runCommand);
}

export function deactivate() {}
