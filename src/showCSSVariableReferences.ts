import * as vscode from 'vscode';

let decorationType = vscode.window.createTextEditorDecorationType({
    after: {
        margin: '0 0 0 25px',
        color: '#c1c1c1',
    },
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
});

export async function showCSSVariableReferences(editor: vscode.TextEditor) {
    const document = editor.document;
    const text = document.getText();
    const currentLine = editor.selection.active.line;
    const lineText = document.lineAt(currentLine).text.trim();
    // Clear previous decorations
    editor.setDecorations(decorationType, []);
    // Check if the current line is within the :root selector
    if (isWithinRootSelector(text, currentLine)) {
        const variableMatch = lineText.match(/--[\w-]+(?=:)/);
        if (variableMatch) {
            const variableName = variableMatch[0];
            const variableReferences = countVariableReferences(text, variableName);
            const variablePosition = editor.document.lineAt(currentLine).range.end;
            // Create decoration with the number of references
            const decoration: vscode.DecorationOptions = {
                range: new vscode.Range(variablePosition, variablePosition),
                renderOptions: {
                    after: {
                        contentText: `${variableReferences} references in this document.`,
                    },
                },
            };
            editor.setDecorations(decorationType, [decoration]);
        }
    }
}

function isWithinRootSelector(text: string, currentLine: number): boolean {
    const lines = text.split('\n');
    let withinRoot = false;
    for (let i = 0; i <= currentLine; i++) {
        const line = lines[i].trim();
        if (line.startsWith(':root')) {
            withinRoot = true;
        } else if (line.startsWith('}')) {
            withinRoot = false;
        }
    }
    return withinRoot;
}

function countVariableReferences(text: string, variableName: string): number {
    const regex = new RegExp(`var\\(${variableName}\\)`, 'g');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}