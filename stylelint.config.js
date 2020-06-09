module.exports = {
  rules: {
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'declaration-colon-space-after': 'always',
    'font-family-no-duplicate-names': true,
    indentation: [
      2,
      {
        except: ['value'],
        severity: 'warning',
        'once-at-root-twice-in-block': true,
      },
    ],
    'media-feature-name-no-unknown': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'selector-type-no-unknown': true,
  },
}
