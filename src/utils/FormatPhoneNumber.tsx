export function formatPhoneNumber(telephone: string) {
    // Separando o número em partes
    const codigoPais = telephone.slice(0, 2);
    const ddd = telephone.slice(2, 4);
    const parte1 = telephone.slice(4, 9);
    const parte2 = telephone.slice(9, 13);
  
    const formattedTelephone = `+${codigoPais} (${ddd})${parte1}-${parte2}`;
    return formattedTelephone;
}