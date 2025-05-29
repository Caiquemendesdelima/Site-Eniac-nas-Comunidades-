document.addEventListener('DOMContentLoaded', () => {
  // MENU TOGGLE
  const toggleButton = document.getElementById('menu-toggle');
  const menuContainer = document.querySelector('.menu-container');
  const menuLinks = document.querySelectorAll('.menu a');

  if (toggleButton && menuContainer) {
    toggleButton.addEventListener('click', () => {
      menuContainer.classList.toggle('active');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuContainer.classList.remove('active');
      });
    });
  }

  // FORM FEEDBACK (form-feedback com mensagem)
  const formFeedback = document.getElementById('form-feedback');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');

  if (formFeedback && mensagemSucesso) {
    formFeedback.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !email || !mensagem) {
        mensagemSucesso.style.color = '#ff4d4d';
        mensagemSucesso.textContent = 'Por favor, preencha todos os campos.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mensagemSucesso.style.color = '#ff4d4d';
        mensagemSucesso.textContent = 'Por favor, insira um e-mail válido.';
        return;
      }

      mensagemSucesso.style.color = '#00ffbb';
      mensagemSucesso.textContent = 'Obrigado pelo seu feedback!';
      this.reset();
    });
  }

  // CARROSSEL MOBILE - PROJETOS-MOBILE (Automático + Comentário)
  const slides = document.querySelectorAll("#projetos-mobile .carrossel-imagens .slide");
  const setaEsquerda = document.querySelector("#projetos-mobile .seta-esquerda");
  const setaDireita = document.querySelector("#projetos-mobile .seta-direita");

  if (slides.length && setaEsquerda && setaDireita) {
    let slideAtual = 0;
    let intervalo;

    function atualizarCarrossel() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideAtual);
      });
    }

    function proximoSlide() {
      slideAtual = (slideAtual + 1) % slides.length;
      atualizarCarrossel();
    }

    function slideAnterior() {
      slideAtual = (slideAtual - 1 + slides.length) % slides.length;
      atualizarCarrossel();
    }

    function iniciarAutoPlay() {
      intervalo = setInterval(proximoSlide, 5000); // troca a cada 5 segundos
    }

    function pararAutoPlay() {
      clearInterval(intervalo);
    }

    setaDireita.addEventListener("click", () => {
      proximoSlide();
      pararAutoPlay();
      iniciarAutoPlay();
    });

    setaEsquerda.addEventListener("click", () => {
      slideAnterior();
      pararAutoPlay();
      iniciarAutoPlay();
    });

    atualizarCarrossel();
    iniciarAutoPlay();
  }

  // FEEDBACK FORM (com localStorage)
  const form = document.getElementById('formFeedback');
  const feedbackList = document.getElementById('feedbackList');

  if (form && feedbackList) {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.forEach(feedback => {
      renderFeedback(feedback.nome, feedback.comentario);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const comentario = document.getElementById('comentario').value.trim();

      if (nome && comentario) {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.unshift({ nome, comentario });
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        renderFeedback(nome, comentario);
        form.reset();
      }
    });
  }

  function renderFeedback(nome, comentario) {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.innerHTML = `<strong>${nome}</strong><p>${comentario}</p>`;
    feedbackList.prepend(div);
  }
});
