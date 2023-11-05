export function validateCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cnpjLimpo = cnpj.replace(/\D/g, '');

  // Verifica se o CNPJ possui 14 dígitos
  if (cnpjLimpo.length !== 14) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpjLimpo.charAt(i)) * (i < 4 ? 5 - i : 13 - i);
  }
  const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  // Verifica o primeiro dígito verificador
  if (parseInt(cnpjLimpo.charAt(12)) !== digito1) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpjLimpo.charAt(i)) * (i < 5 ? 6 - i : 14 - i);
  }
  const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  // Verifica o segundo dígito verificador
  if (parseInt(cnpjLimpo.charAt(13)) !== digito2) {
    return false;
  }

  return true;
}