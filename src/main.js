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
  const purchasePriceOriginal = document.querySelector('.purchase-price-original');
  const purchasePriceCurrent = document.querySelector('.purchase-price-current');
  const purchaseShirtOptions = document.querySelector('.purchase-shirt-options');
  const purchasePalmeirasOptions = document.querySelector('.purchase-palmeiras-options');
  const purchaseCheckout = document.querySelector('.purchase-checkout');
  const shirtSizeSelect = document.querySelector('[name="purchase-camiseta-tamanho"]');
  const shirtModelSelect = document.querySelector('[name="purchase-camiseta-modelo"]');
  const palmeirasSizeSelect = document.querySelector('[name="purchase-palmeiras-tamanho"]');
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
      price: 59.90,
      originalPrice: 99.83,
    },
    {
      image: '/assets/proof-6.png',
      title: 'Boné do Mito',
      description: 'Boné estruturado, ajuste confortável e acabamento feito para acompanhar sua rotina.',
      checkout: 'https://pagseguropix.org/c/avental-copy',
      price: 59.90,
      originalPrice: 99.83,
    },
    {
      image: '/assets/proof-7.png',
      title: 'Copo térmico do Mito',
      description: 'Design resistente para levar sua bebida ao trabalho, no carro ou no churrasco.',
      checkout: 'https://pagseguropix.org/c/avental-copy-copy-copy',
      price: 29.90,
      originalPrice: 49.83,
    },
    {
      image: '/assets/proof-5.png',
      title: 'Avental Patriota',
      description: 'Avental preto com acabamento resistente, bolso frontal e presença para o churrasco.',
      checkout: 'https://pagseguropix.org/c/avental',
      price: 39.90,
      originalPrice: 66.50,
    },
    {
      image: '/assets/camisa-manga-longa-palmeiras-transparent.png',
      title: 'Camisa Manga Longa Palmeiras',
      description: 'Camisa branca com gola de meio-zíper, detalhes do Palmeiras e estampa Sou Patriota.',
      checkout: 'https://pagseguropix.org/c/avental-copy-copy-copy-copy',
      price: 69.90,
      originalPrice: 116.50,
    },
  ];
  const formatPrice = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  let currentProduct = 0;

  const showPurchase = (productIndex) => {
    currentProduct = (productIndex + products.length) % products.length;
    const product = products[currentProduct];
    purchaseImage.src = product.image;
    purchaseImage.alt = product.title;
    purchaseTitle.textContent = product.title;
    purchaseDescription.textContent = product.description;
    purchasePriceOriginal.textContent = formatPrice(product.originalPrice);
    purchasePriceCurrent.textContent = formatPrice(product.price);
    purchaseShirtOptions.hidden = currentProduct !== 0;
    purchasePalmeirasOptions.hidden = currentProduct !== 4;
    updatePurchaseCheckout();
    purchaseCounter.textContent = `${currentProduct + 1} / ${products.length}`;
  };

  const updatePurchaseCheckout = () => {
    const product = products[currentProduct];
    if (currentProduct === 4) {
      const query = new URLSearchParams({ tamanho: palmeirasSizeSelect.value });
      purchaseCheckout.href = `${product.checkout}?${query.toString()}`;
      return;
    }

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
  palmeirasSizeSelect.addEventListener('change', updatePurchaseCheckout);

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
