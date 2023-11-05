export function formatCEP(cep: string) {
    // Adiciona zeros à esquerda se o CEP não tiver 8 dígitos
    while (cep.length < 8) {
      cep = '0' + cep;
    }
  
    // Aplica a formatação
    const formattedCep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
    return formattedCep;
}