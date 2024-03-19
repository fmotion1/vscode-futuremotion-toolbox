import * as vscode from 'vscode';

export async function removeLinebreaks(editor: vscode.TextEditor) {
    const document = editor.document;
    const selection = editor.selection;

    // Check if there's a selection. If not, there's nothing to compact.
    if (selection.isEmpty) {
        vscode.window.showErrorMessage("No text selected!");
        return;
    }

    const selectedText = document.getText(selection);

    // This pattern matches any newline character followed by any amount of whitespace
    // and replaces it with a single space, effectively removing newlines and trailing whitespace.
    const nolinebreaksText = selectedText.replace(/(\r\n|\n|\r)[ \t]*/gm, " ");

    await editor.edit(editBuilder => {
        editBuilder.replace(selection, nolinebreaksText);
    });
}
