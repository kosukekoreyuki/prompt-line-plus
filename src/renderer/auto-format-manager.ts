import type { DomManager } from './dom-manager';

const INDENT_UNIT = '  ';
const BULLET_LINE_PATTERN = /^( *)- /;

export class AutoFormatManager {
  constructor(private readonly domManager: DomManager) {}

  /**
   * Handle Enter key for bullet list continuation.
   * Returns true if handled (caller should preventDefault).
   */
  public handleEnterKey(): boolean {
    const textarea = this.domManager.textarea;
    if (!textarea) return false;
    // Only handle single cursor (no selection)
    if (textarea.selectionStart !== textarea.selectionEnd) return false;

    const cursorPos = textarea.selectionStart;
    const { lineText, lineStart } = this.getLineInfo(textarea, cursorPos);

    // Heading line (# ...) → start a bullet on the next line
    if (/^# .+/.test(lineText)) {
      this.domManager.replaceRangeWithUndo(cursorPos, cursorPos, '\n- ');
      return true;
    }

    const parsed = this.parseBulletLine(lineText);
    if (!parsed) return false;

    const { indent, content } = parsed;

    if (content !== '') {
      // Has content → insert new bullet with same indent at cursor
      this.domManager.replaceRangeWithUndo(cursorPos, cursorPos, '\n' + indent + '- ');
    } else if (indent.length >= INDENT_UNIT.length) {
      // Empty bullet with indent → de-indent one level (no new line)
      const newIndent = indent.slice(INDENT_UNIT.length);
      const prefixEnd = lineStart + indent.length + 2; // e.g. "  - " = 4 chars
      this.domManager.replaceRangeWithUndo(lineStart, prefixEnd, newIndent + '- ');
    } else {
      // Empty top-level bullet → exit list (remove "- ")
      this.domManager.replaceRangeWithUndo(lineStart, lineStart + 2, '');
    }
    return true;
  }

  /**
   * Handle Tab / Shift+Tab for bullet list indentation.
   * Returns true if handled (caller should preventDefault).
   */
  public handleTabKey(shiftKey: boolean): boolean {
    const textarea = this.domManager.textarea;
    if (!textarea) return false;

    const cursorPos = textarea.selectionStart;
    const { lineText, lineStart } = this.getLineInfo(textarea, cursorPos);

    if (!BULLET_LINE_PATTERN.test(lineText)) return false;

    if (!shiftKey) {
      // Tab: indent → insert INDENT_UNIT at line start
      this.domManager.replaceRangeWithUndo(lineStart, lineStart, INDENT_UNIT);
      // replaceRangeWithUndo moves cursor to lineStart+2; correct to original+2
      this.domManager.setCursorPosition(cursorPos + INDENT_UNIT.length);
    } else if (lineText.startsWith(INDENT_UNIT)) {
      // Shift+Tab: de-indent → remove INDENT_UNIT from line start
      this.domManager.replaceRangeWithUndo(lineStart, lineStart + INDENT_UNIT.length, '');
      // replaceRangeWithUndo moves cursor to lineStart; correct to original-2
      this.domManager.setCursorPosition(Math.max(lineStart, cursorPos - INDENT_UNIT.length));
    }
    // Shift+Tab on level-0 bullet: do nothing (return true prevents outdentAtCursor)
    return true;
  }

  private getLineInfo(
    textarea: HTMLTextAreaElement,
    pos: number
  ): { lineText: string; lineStart: number } {
    const value = textarea.value;
    const lineStart = value.lastIndexOf('\n', pos - 1) + 1;
    const lineEnd = value.indexOf('\n', pos);
    const lineText = value.slice(lineStart, lineEnd === -1 ? value.length : lineEnd);
    return { lineText, lineStart };
  }

  private parseBulletLine(text: string): { indent: string; content: string } | null {
    const match = text.match(/^( *)- (.*)$/s);
    if (!match || match[1] === undefined || match[2] === undefined) return null;
    const indent = match[1];
    // Only handle indents that are exact multiples of INDENT_UNIT
    if (indent.length % INDENT_UNIT.length !== 0) return null;
    return { indent, content: match[2] };
  }
}
