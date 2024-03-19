import * as vscode from 'vscode';

export async function renameCSSVariable(editor: vscode.TextEditor) {
    const document = editor.document;
    const selection = editor.selection;
    let variableName: string;

    // If there's a selection, use it directly; otherwise, find the variable name around the cursor.
    if (!selection.isEmpty) {
        variableName = document.getText(selection);
    } else {
        const wordRange = document.getWordRangeAtPosition(selection.start, /--[\w-]+/);
        if (!wordRange) {
            vscode.window.showErrorMessage("No CSS variable selected or cursor not within a variable name!");
            return;
        }
        variableName = document.getText(wordRange);
    }

    // Ensure the variable name starts with two dashes
    if (!variableName.startsWith('--')) {
        vscode.window.showErrorMessage("Selected text is not a valid CSS variable!");
        return;
    }

    // Prompt for the new variable name
    const newVariableName = await vscode.window.showInputBox({
        prompt: `Enter new name for the CSS variable ${variableName}`,
        value: variableName, // Suggest the current name as a starting point
    });

    // Exit if no new name is provided
    if (!newVariableName || newVariableName === variableName) {
        return;
    }

    // Replace all occurrences in the document
    const text = document.getText();
    const newText = text.replace(new RegExp(variableName, 'g'), newVariableName);

    await editor.edit(editBuilder => {
        const entireRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );
        editBuilder.replace(entireRange, newText);
    });
}
