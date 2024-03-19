import * as vscode from 'vscode';

export async function renamePowershellVariable(editor: vscode.TextEditor) {
    const document = editor.document;
    const selection = editor.selection;
    let range: vscode.Range;

    if (selection.isEmpty) {
        const word = document.getWordRangeAtPosition(selection.start, /(\$[a-zA-Z_]\w*)/);
        if (!word) {
            vscode.window.showErrorMessage("No PowerShell variable selected!");
            return;
        }
        range = word;
    } else {
        const text = document.getText(selection);
        if (!/^\$[a-zA-Z_]\w*$/.test(text)) {
            const word = document.getWordRangeAtPosition(selection.start, /(\$[a-zA-Z_]\w*)/);
            if (!word || !word.contains(selection)) {
                vscode.window.showErrorMessage("Selection is not a valid PowerShell variable!");
                return;
            }
            range = word;
        } else {
            range = new vscode.Range(selection.start, selection.end);
        }
    }

    const variableName = document.getText(range).substring(1); // Remove the '$'
    const newVariableNameInput = await vscode.window.showInputBox({ prompt: `Enter new name for ${variableName}` });

    if (!newVariableNameInput) {
        return;
    }

    // Check if the new variable name starts with a dollar sign and remove it if present
    const newVariableName = newVariableNameInput.startsWith('$') ? newVariableNameInput.substring(1) : newVariableNameInput;

    editor.edit((editBuilder) => {
        const regexStandard = new RegExp(`\\$${variableName}\\b`, 'g');
        const regexUsing = new RegExp(`\\$using:${variableName}\\b`, 'gi');

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);

            // Replace standard variable occurrences
            let match;
            while ((match = regexStandard.exec(line.text)) !== null) {
                const matchRange = new vscode.Range(i, match.index, i, match.index + match[0].length);
                editBuilder.replace(matchRange, `$${newVariableName}`);
            }

            // Reset the regex index for the next search
            regexStandard.lastIndex = 0;

            // Replace $using: variable occurrences
            while ((match = regexUsing.exec(line.text)) !== null) {
                const matchRange = new vscode.Range(i, match.index, i, match.index + match[0].length);
                // Use the matched prefix directly from the document to handle case variations correctly
                const prefix = document.getText(matchRange).substring(0, 7); // Extract '$using:' including the case as is
                editBuilder.replace(matchRange, `${prefix}${newVariableName}`);
            }

            // Reset the regex index for the next search
            regexUsing.lastIndex = 0;
        }
    });
}
