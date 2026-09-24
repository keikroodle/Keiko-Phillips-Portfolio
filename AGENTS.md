# Translation CMS & Content Management

This project uses a custom Firebase-backed Translation Manager as the source of truth for UI text content. 
Supported languages: English (`en`), Japanese (`jp`), German (`de`), and Russian (`ru`).

## Rules for Modifying Text
- **Existing Text:** Do not hardcode text edits into the UI components (e.g., `App.tsx`). The user will edit text content themselves via the hidden `[Admin]` CMS button on the live site.
- **Adding New Text Blocks:** When the user requests a completely new body of text or a new section on the website, you MUST follow these three steps:
  1. **Update State:** Add the new text key and default placeholder text to all language objects inside `DEFAULT_TRANSLATIONS` in `src/hooks/useTranslations.ts`.
  2. **Update CMS UI:** Add corresponding input fields/textareas for the new key in `src/components/TranslationManager.tsx` so the user can edit it.
  3. **Update Main UI:** Wire up the new text key to the layout in `src/App.tsx` (e.g., `{translations[currentLangKey]?.newKey}`).
