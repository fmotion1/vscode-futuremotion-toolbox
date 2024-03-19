import * as vscode from 'vscode';

export async function removeUnusedCSSVariables(editor: vscode.TextEditor) {
    const document = editor.document;
    const selection = editor.selection;

    // Check if there's a selection. If not, there's nothing to compact.
    if (selection.isEmpty) {
        vscode.window.showErrorMessage("No text selected!");
        return;
    }
}