// Função para observar a visibilidade da div .texto-advocacia-minimalista
function observarTextoAdvocaciaMinimalista() {
  const elemento = document.querySelector('.texto-advocacia-minimalista');
  if (!elemento) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          elemento.classList.add('visivel');
        } else {
          elemento.classList.remove('visivel');
        }
      });
    },
    {
      threshold: 0.1 // Considera visível se pelo menos 10% estiver na tela
    }
  );

  observer.observe(elemento);
}

document.addEventListener('DOMContentLoaded', observarTextoAdvocaciaMinimalista);
