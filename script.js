// Mobile nav + year
const $ = (s, el=document)=>el.querySelector(s);
const toggle = $('.nav__toggle');
const nav = $('#nav-list');
toggle?.addEventListener('click', ()=>{
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});
const y = new Date().getFullYear();
$('#year')?.append(y);