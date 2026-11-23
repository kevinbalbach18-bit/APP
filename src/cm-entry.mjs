import { EditorView, keymap, lineNumbers, drawSelection, highlightActiveLine, placeholder } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { indentOnInput, bracketMatching, syntaxHighlighting, HighlightStyle, indentUnit } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { php } from '@codemirror/lang-php';
import { tags as t } from '@lezer/highlight';

const hl = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.definitionKeyword, t.moduleKeyword, t.operatorKeyword, t.modifier], color: '#F4B740' },
  { tag: [t.variableName, t.special(t.variableName)], color: '#B4BCFF' },
  { tag: [t.string, t.special(t.string)], color: '#8EE3B5' },
  { tag: [t.number, t.bool, t.null, t.atom], color: '#FF9E8A' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: '#8F8AB8', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: '#FFFFFF', fontWeight: '600' },
  { tag: [t.className, t.typeName], color: '#FFD98A' },
  { tag: [t.propertyName, t.attributeName], color: '#D7DBFF' },
  { tag: [t.processingInstruction, t.meta], color: '#8892BF', fontWeight: '600' },
  { tag: [t.tagName, t.angleBracket], color: '#9FA6D6' },
  { tag: [t.operator, t.punctuation, t.bracket, t.separator], color: '#CFCBEA' },
]);

const theme = EditorView.theme({
  '&': { color: '#ECEAFB', backgroundColor: 'transparent', fontSize: '15px' },
  '.cm-content': { fontFamily: 'var(--mono)', padding: '14px 0', caretColor: '#F4B740', lineHeight: '1.6' },
  '.cm-scroller': { fontFamily: 'var(--mono)', overflow: 'auto' },
  '.cm-gutters': { backgroundColor: 'transparent', color: '#6E6A99', border: 'none', paddingLeft: '6px' },
  '.cm-lineNumbers .cm-gutterElement': { padding: '0 10px 0 4px', minWidth: '22px' },
  '.cm-activeLine': { backgroundColor: 'rgba(136,146,191,.12)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: '#B4BCFF' },
  '&.cm-focused .cm-cursor': { borderLeftColor: '#F4B740', borderLeftWidth: '2px' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: 'rgba(244,183,64,.28) !important' },
  '.cm-matchingBracket': { backgroundColor: 'rgba(244,183,64,.25)', outline: 'none' },
  '&.cm-focused': { outline: 'none' },
  '.cm-placeholder': { color: '#6E6A99' },
}, { dark: true });

export function createEditor(parent, doc, { onChange, onRun, onFocus, onBlur, hint, readOnly = false } = {}) {
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc,
      extensions: [
        readOnly ? [EditorState.readOnly.of(true), EditorView.editable.of(false)] : [lineNumbers(), highlightActiveLine()],
        history(), drawSelection(),
        indentOnInput(), bracketMatching(), closeBrackets(), indentUnit.of('    '),
        EditorState.tabSize.of(4),
        php(), syntaxHighlighting(hl), theme, EditorView.lineWrapping,
        hint ? placeholder(hint) : [],
        EditorView.contentAttributes.of({ autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', 'aria-label': 'PHP-Code' }),
        keymap.of([
          { key: 'Mod-Enter', run: () => { onRun && onRun(); return true; } },
          ...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, indentWithTab,
        ]),
        EditorView.updateListener.of((u) => {
          if (u.docChanged && onChange) onChange(u.state.doc.toString());
          if (u.focusChanged) (u.view.hasFocus ? onFocus : onBlur)?.(view);
        }),
      ],
    }),
  });
  return view;
}

export function insertAtCursor(view, text, cursorOffset = text.length) {
  const { from, to } = view.state.selection.main;
  view.dispatch({ changes: { from, to, insert: text }, selection: { anchor: from + cursorOffset }, scrollIntoView: true });
  view.focus();
}

export function setDoc(view, doc) {
  // Cursor ans Ende, damit man direkt weiterschreiben kann
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: doc }, selection: { anchor: doc.length } });
}
