export function validateEmail(email: string): boolean {
    // Verifica se o email contém o caractere "@"
    if (!email.includes("@")) {
      return false;
    }
  
    // Verifica se o email contém a extensão ".com"
    if (!email.endsWith(".com")) {
      return false;
    }
  
    return true;
}