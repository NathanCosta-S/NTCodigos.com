// src/js/index.js

// ==========================================================
// 1. Funcionalidade do Slider (se houver)
//    Verifique se você ainda tem um slider com as classes/IDs correspondentes
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.getElementById('slides');

    if (slides.length > 0 && slidesContainer) {
        let slideIndex = 0;
        const totalSlides = slides.length;

        function showNextSlide() {
            slideIndex++;

            if (slideIndex >= totalSlides) {
                slideIndex = 0;
            }

            // Garante que o slideWidth seja calculado no momento certo
            // Para sliders responsivos, pode ser melhor usar scrollLeft ou transformar com base em percentual/vw
            const slideWidth = slides[0].clientWidth;
            slidesContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
        }

        // Inicia o slider apenas se houver slides
        setInterval(showNextSlide, 3000);

        // Opcional: Adicionar listeners para botões de navegação se houver
        // Ex: document.getElementById('nextBtn').addEventListener('click', showNextSlide);
    }
});


// ==========================================================
// 2. Animação de Seções na Rolagem (Scroll Reveal)
// ==========================================================
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");

    function checkSectionsVisibility() {
        // Define o ponto de gatilho para a visibilidade (100% da altura da janela)
        const triggerBottom = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            // Adiciona a classe 'visible' se o topo da seção estiver visível na tela
            // ou remove se sair da tela (opcional, dependendo do efeito desejado)
            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            } else {
                // Se você quer que a animação "reapareça" ao rolar de volta, mantenha o else
                // Se a animação deve acontecer apenas uma vez, remova o else
                section.classList.remove("visible");
            }
        });
    }

    // Adiciona o listener para o evento de rolagem
    window.addEventListener("scroll", checkSectionsVisibility);

    // Chama a função uma vez ao carregar a página para verificar seções já visíveis
    checkSectionsVisibility();
});

// ==========================================================
// 3. Toggle do Menu Hamburguer (para navegação responsiva)
// ==========================================================
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav.nav-links'); // Seletor mais específico

    if (menuToggle && navLinks) { // Garante que os elementos existam
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuToggle.classList.toggle('active'); // Para mudar o ícone do hamburguer
        });

        // Opcional: Fechar o menu ao clicar em um link (para navegações de uma página)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }
});

// ==========================================================
// 4. Lógica de Envio de Mensagem para WhatsApp
//    Este é o script que você já tinha ajustado para o formulário de contato via WhatsApp.
//    Foi movido para dentro do DOMContentLoaded para garantir que o formulário exista.
// ==========================================================
document.addEventListener('DOMContentLoaded', function () {
    const whatsappForm = document.getElementById('whatsappForm');

    // Verifica se o formulário do WhatsApp existe antes de adicionar o listener
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nomeCompleto = document.getElementById('nomeCompletoWsp').value;
            const nomeEmpresa = document.getElementById('nomeEmpresaWsp').value;
            const emailContato = document.getElementById('emailContatoWsp').value;
            const telefoneWhatsapp = document.getElementById('telefoneWhatsappWsp').value;
            const siteAtual = document.getElementById('siteAtualWsp').value;
            const redesSociais = document.getElementById('redesSociaisWsp').value;
            const objetivoProjeto = document.getElementById('objetivoProjetoWsp').value;
            const informacoesAdicionais = document.getElementById('informacoesAdicionaisWsp').value;

            // Coleta os serviços selecionados
            const servicosSelecionados = [];
            document.querySelectorAll('input[name="servicoWsp"]:checked').forEach(checkbox => {
                if (checkbox.value === "Outro") {
                    const servicoOutro = document.querySelector('input[name="servicoOutroWsp"]').value;
                    if (servicoOutro) {
                        servicosSelecionados.push(`Outro: ${servicoOutro}`);
                    }
                } else {
                    servicosSelecionados.push(checkbox.value);
                }
            });

            // Constrói a mensagem do WhatsApp
            let message = `Olá, gostaria de solicitar um orçamento para um projeto!\n\n`;
            message += `*Informações de Contato e Empresa:*\n`;
            message += `Nome Completo: ${nomeCompleto}\n`;
            message += `Nome da Empresa/Negócio: ${nomeEmpresa || 'Não informado'}\n`;
            message += `E-mail: ${emailContato}\n`;
            message += `Telefone/WhatsApp: ${telefoneWhatsapp}\n`;
            message += `Site atual (se tiver): ${siteAtual || 'Não informado'}\n`;
            message += `Redes sociais (se tiver): ${redesSociais || 'Não informado'}\n\n`;

            message += `*Serviços Buscados:*\n`;
            if (servicosSelecionados.length > 0) {
                servicosSelecionados.forEach(servico => {
                    message += `- ${servico}\n`;
                });
            } else {
                message += `Nenhum serviço específico marcado.\n`;
            }
            message += `\n`;

            message += `*Principal Objetivo do Projeto:*\n`;
            message += `${objetivoProjeto || 'Não informado'}\n\n`;

            message += `*Informações Adicionais:*\n`;
            message += `${informacoesAdicionais || 'Não informado'}`;

            // Codifica a mensagem para URL
            const encodedMessage = encodeURIComponent(message);

            // Número de telefone do WhatsApp (formato internacional: 55 + DDD + número)
            const whatsappNumber = "5514996450887"; // Seu número WhatsApp

            // Abre o WhatsApp (a API do WhatsApp lida com mobile vs. web automaticamente)
            window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`, '_blank');
        });
    }
});

// ==========================================================
// Remover o listener duplicado para o link do WhatsApp
// O código abaixo foi removido/comentado pois a lógica de WhatsApp já está no formulário.
// document.addEventListener('DOMContentLoaded', function () {
//     var whatsappLink = document.getElementById('whatsapp'); // Certifique-se de que este ID existe no seu HTML

//     if (whatsappLink) { // Verifica se o elemento existe
//         whatsappLink.addEventListener('click', function (event) {
//             event.preventDefault(); // Impede a ação padrão do link
//             const larguraJanela = window.innerWidth;

//             // A API oficial do WhatsApp (api.whatsapp.com/send) já lida com isso.
//             // Não é mais necessário testar largura da janela.
//             window.open('https://api.whatsapp.com/send?phone=5514996450887', '_blank');
//         });
//     }
// });