/** @type {import('prettier').Config} */
export default {
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	printWidth: 115, // Approx 120 (tabs are counted as 1, but rendered as 2/3/4)
	semi: false,
	singleQuote: true,
	trailingComma: 'es5',
	useTabs: true,

	// Format SVG
	overrides: [{ files: '*.svg', options: { parser: 'html' } }],
}
