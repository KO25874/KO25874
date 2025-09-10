const workItems = document.querySelectorAll('.work-item');
const modal = document.getElementById('workModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDesc = document.getElementById('modalDesc');
const closeBtn = document.querySelector('.close');

workItems.forEach(item => {
  item.addEventListener('click', () => {
    modalTitle.textContent = item.dataset.title;
    modalImage.src = item.dataset.img;
    modalDesc.textContent = item.dataset.desc;
    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});