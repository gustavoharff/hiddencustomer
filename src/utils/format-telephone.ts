export function formatTelephone(value: string): string {
  const noAlphabetic = value.replace(/\D/g, '');

  const withParentheses = noAlphabetic.replace(/^(\d{2})(\d)/g, '($1) $2');

  const withHyphen = withParentheses.replace(/(\d)(\d{4})$/, '$1-$2');

  return withHyphen;
}

export function cleanTelephone(value: string): string {
  const noParentheses = value.replace('(', '');

  const noParentheses2 = noParentheses.replace(')', '');

  const noHyphen = noParentheses2.replace('-', '');

  const noSpace = noHyphen.replace(' ', '');

  return noSpace;
}
