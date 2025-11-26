// js/script.js
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');

mobileMenu.addEventListener('click', () => navLinks.classList.toggle('active'));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    if(navLinks.classList.contains('active')) navLinks.classList.remove('active');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(sec => observer.observe(sec));

const newsContainer = document.getElementById('newsContainer');
const defaultNews = [
  {title:"Victory at Math Olympiad 2025", date:"2025-11-15", text:"Our students won 1st and 3rd places!"},
  {title:"New Computer Lab", date:"2025-10-20", text:"40 new PCs installed thanks to sponsors."},
  {title:"English Week 2025", date:"2025-09-28", text:"Amazing performances and debates."}
];

function renderNews() {
    let news = JSON.parse(localStorage.getItem('school190news')) || defaultNews;
    newsContainer.innerHTML = '';
  
    // Массив с 12 красивыми школьными фото (будут по кругу)
    const newsImages = [
      "https://storage.kun.uz/source/9/JE_YNM47a3ZLWrd2nSCWXEHdRojdDpmJ.jpg",
      "https://storage.kun.uz/source/9/HA53duiWyVshIqkJHOaAGXGUYHhhzCzK.jpg",
      "https://storage.kun.uz/source/9/Fg7u_NVONu7gp70C_oTlKi0UkSFhUk1S.jpg",
      "https://storage.kun.uz/source/9/HA53duiWyVshIqkJHOaAGXGUYHhhzCzK.jpg",
      "https://storage.kun.uz/source/9/HA53duiWyVshIqkJHOaAGXGUYHhhzCzK.jpg",
      "https://storage.kun.uz/source/9/HA53duiWyVshIqkJHOaAGXGUYHhhzCzK.jpg",
      "https://storage.kun.uz/source/9/HA53duiWyVshIqkJHOaAGXGUYHhhzCzK.jpg",

    ];
  
    news.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'news-card';
  
      // Выбираем фото по индексу (по кругу)
      const imgUrl = newsImages[index % newsImages.length];
  
      card.innerHTML = `
        <div class="news-img">
          <img src="${imgUrl}" alt="${item.title}" loading="lazy">
        </div>
        <div class="news-content">
          <div class="news-date">${item.date}</div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      `;
  
      newsContainer.appendChild(card);
    });
  }

function addNews() {
  const title = document.getElementById('newsTitle').value.trim();
  const text = document.getElementById('newsText').value.trim();
  if(!title || !text) return alert('Fill all fields');
  let news = JSON.parse(localStorage.getItem('school190news')) || defaultNews;
  const today = new Date().toISOString().slice(0,10);
  news.unshift({title, date:today, text});
  localStorage.setItem('school190news', JSON.stringify(news));
  document.getElementById('newsTitle').value = '';
  document.getElementById('newsText').value = '';
  renderNews();
}

renderNews();
Fancybox.bind("[data-fancybox]", {});