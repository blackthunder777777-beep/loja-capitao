document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('a[href^="#"]');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const targetId = button.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const photoLinks = [...document.querySelectorAll('.photo-image-link')];
  const lightbox = document.querySelector('.image-lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxCounter = document.querySelector('.lightbox-counter');
  const closeButton = document.querySelector('.lightbox-close');
  const previousButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');
  let currentSlide = 0;

  const showSlide = (slideIndex) => {
    currentSlide = (slideIndex + photoLinks.length) % photoLinks.length;
    const link = photoLinks[currentSlide];
    const image = link.querySelector('img');

    lightboxImage.src = link.href;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    lightboxCounter.textContent = `${currentSlide + 1} / ${photoLinks.length}`;
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
  };

  photoLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showSlide(Number(link.dataset.slide));
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => showSlide(currentSlide - 1));
  nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
    if (event.key === 'ArrowRight') showSlide(currentSlide + 1);
  });

  const buyTriggers = [...document.querySelectorAll('.buy-product-trigger')];
  const purchaseLightbox = document.querySelector('.purchase-lightbox');
  const purchaseImage = document.querySelector('.purchase-image');
  const purchaseTitle = document.querySelector('.purchase-title');
  const purchaseDescription = document.querySelector('.purchase-description');
  const purchaseShirtOptions = document.querySelector('.purchase-shirt-options');
  const purchaseCheckout = document.querySelector('.purchase-checkout');
  const shirtSizeSelect = document.querySelector('[name="purchase-camiseta-tamanho"]');
  const shirtModelSelect = document.querySelector('[name="purchase-camiseta-modelo"]');
  const purchaseCounter = document.querySelector('.purchase-counter');
  const purchaseClose = document.querySelector('.purchase-close');
  const purchasePrevious = document.querySelector('.purchase-prev');
  const purchaseNext = document.querySelector('.purchase-next');
  const products = [
    {
      image: '/assets/PROOF-8.png',
      title: 'Camiseta do Mito',
      description: 'Tecido premium, modelagem confortável e mensagem forte para usar no dia a dia.',
      checkout: 'https://pagseguropix.org/c/avental-copy-copy',
    },
    {
      image: '/assets/proof-6.png',
      title: 'Boné do Mito',
      description: 'Boné estruturado, ajuste confortável e acabamento feito para acompanhar sua rotina.',
      checkout: 'https://pagseguropix.org/c/avental-copy',
    },
    {
      image: '/assets/proof-7.png',
      title: 'Copo térmico do Mito',
      description: 'Design resistente para levar sua bebida ao trabalho, no carro ou no churrasco.',
      checkout: 'https://pagseguropix.org/c/avental-copy-copy-copy',
    },
    {
      image: '/assets/proof-5.png',
      title: 'Avental Patriota',
      description: 'Avental preto com acabamento resistente, bolso frontal e presença para o churrasco.',
      checkout: 'https://pagseguropix.org/c/avental',
    },
  ];
  let currentProduct = 0;

  const showPurchase = (productIndex) => {
    currentProduct = (productIndex + products.length) % products.length;
    const product = products[currentProduct];
    purchaseImage.src = product.image;
    purchaseImage.alt = product.title;
    purchaseTitle.textContent = product.title;
    purchaseDescription.textContent = product.description;
    purchaseShirtOptions.hidden = currentProduct !== 0;
    updatePurchaseCheckout();
    purchaseCounter.textContent = `${currentProduct + 1} / ${products.length}`;
  };

  const updatePurchaseCheckout = () => {
    const product = products[currentProduct];
    if (currentProduct !== 0) {
      purchaseCheckout.href = product.checkout;
      return;
    }

    const query = new URLSearchParams({
      tamanho: shirtSizeSelect.value,
      modelo: shirtModelSelect.value,
    });
    purchaseCheckout.href = `${product.checkout}?${query.toString()}`;
  };

  const closePurchase = () => {
    purchaseLightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
  };

  buyTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      showPurchase(Number(trigger.dataset.buySlide));
      purchaseLightbox.hidden = false;
      document.body.classList.add('lightbox-open');
    });
  });

  purchaseClose.addEventListener('click', closePurchase);
  purchasePrevious.addEventListener('click', () => showPurchase(currentProduct - 1));
  purchaseNext.addEventListener('click', () => showPurchase(currentProduct + 1));
  shirtSizeSelect.addEventListener('change', updatePurchaseCheckout);
  shirtModelSelect.addEventListener('change', updatePurchaseCheckout);

  purchaseLightbox.addEventListener('click', (event) => {
    if (event.target === purchaseLightbox) closePurchase();
  });

  document.addEventListener('keydown', (event) => {
    if (purchaseLightbox.hidden) return;
    if (event.key === 'Escape') closePurchase();
    if (event.key === 'ArrowLeft') showPurchase(currentProduct - 1);
    if (event.key === 'ArrowRight') showPurchase(currentProduct + 1);
  });
});
