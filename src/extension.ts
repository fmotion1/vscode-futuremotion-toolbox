import * as vscode from 'vscode';
import { renamePowershellVariable } from './renamePowershellVariable';
import { removeLinebreaks } from './removeLinebreaks';
import { compactCSS } from './compactCSS';
import { expandCSS } from './expandCSS';
import { renameCSSVariable } from './renameCSSVariable';
// import { showCSSVariableReferences } from './showCSSVariableReferences';

export function activate(context: vscode.ExtensionContext) {

    let renamePwshVariableCommand = vscode.commands.registerCommand('fm-toolbox.renamePowershellVariable', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor!");
            return;
        }
        renamePowershellVariable(editor);
    });

    let removeLinebreaksCommand = vscode.commands.registerCommand('fm-toolbox.removeLineBreaks', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor!");
            return;
        }
        removeLinebreaks(editor);
    });

    let compactCSSCommand = vscode.commands.registerCommand('fm-toolbox.compactCSS', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor!");
            return;
        }
        compactCSS(editor);
    });

    let expandCSSCommand = vscode.commands.registerCommand('fm-toolbox.expandCSS', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor!");
            return;
        }
        expandCSS(editor);
    });

    let renameCSSVariableCommand = vscode.commands.registerCommand('fm-toolbox.renameCSSVariable', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor!");
            return;
        }
        renameCSSVariable(editor);
    });

    // let showCSSVariableReferencesCommand = vscode.commands.registerCommand('fm-toolbox.showCSSVariableReferences', () => {
    //     const editor = vscode.window.activeTextEditor;
    //     if (!editor) {
    //         vscode.window.showErrorMessage("No active editor!");
    //         return;
    //     }
    //     showCSSVariableReferences(editor);
    // });

    context.subscriptions.push(renamePwshVariableCommand);
    context.subscriptions.push(removeLinebreaksCommand);
    context.subscriptions.push(compactCSSCommand);
    context.subscriptions.push(expandCSSCommand);
    context.subscriptions.push(renameCSSVariableCommand);
    //context.subscriptions.push(showCSSVariableReferencesCommand);

    // Add event listeners
    // vscode.window.onDidChangeActiveTextEditor(updateDecorations);

    // vscode.workspace.onDidOpenTextDocument((document) => {
    //     if (document.languageId === 'css') {
    //         updateDecorations(vscode.window.activeTextEditor);
    //     }
    // });

    // Initial call to update decorations
    // updateDecorations(vscode.window.activeTextEditor);

}

// function updateDecorations(activeEditor: vscode.TextEditor | undefined) {
//     if (activeEditor && activeEditor.document.languageId === 'css') {
//         console.log('updateDecorations called.');
//         showCSSVariableReferences(activeEditor);
//     }
// }

export function deactivate() {}
