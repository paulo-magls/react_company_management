export function formatCNPJ(cnpj: string) {
    // Adiciona zeros à esquerda se o CNPJ não tiver 14 dígitos
    while (cnpj.length < 14) {
        cnpj = '0' + cnpj;
    }

    // Aplica a formatação
    const formattedCnpj = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  
    return formattedCnpj;
}
