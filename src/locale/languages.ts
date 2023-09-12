export const supportedLanguages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'no', title: 'Norwegian'},
]

export const baseLanguage = supportedLanguages.find((l) => l.isDefault)
