const dishes=[
{name:'Charred Chili Paneer',cat:'small',price:'₹285',desc:'Smoked paneer, green chilli, sesame, lime.',tag:'Bestseller',image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=88'},
{name:'Old Delhi Butter Chicken',cat:'mains',price:'₹395',desc:'Tandoori chicken, tomato, fenugreek, butter.',tag:'House classic',image:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=88'},
{name:'Tandoori Corn Ribs',cat:'small',price:'₹245',desc:'Charred corn, chaat masala, coriander.',tag:'New',image:'https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=900&q=88'},
{name:'Masala Lamb Kebab',cat:'mains',price:'₹460',desc:'Minced lamb, ginger, black cardamom, mint.',image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=88'},
{name:'Chilli Garlic Naan',cat:'small',price:'₹160',desc:'Clay-oven naan, garlic, green chilli, butter.',image:'https://images.unsplash.com/photo-1725483990094-e95226a16db7?auto=format&fit=crop&w=900&q=88'},
{name:'Mango Chili Kulfi',cat:'sweet',price:'₹190',desc:'Alphonso mango, chilli salt, pistachio.',image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=88'},
{name:'Filter Coffee Tiramisu',cat:'sweet',price:'₹220',desc:'South Indian coffee, mascarpone, cocoa.',image:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=88'},
{name:'Gur & Sea Salt Brownie',cat:'sweet',price:'₹210',desc:'Jaggery caramel, dark chocolate, flaky salt.',image:'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=900&q=88'},
{name:'Black Pepper Mutton Curry',cat:'mains',price:'₹520',desc:'Slow-cooked mutton, black pepper, fried onion, whole spices.',tag:'Chef’s pick',image:'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=88'}
];
const grid=document.querySelector('#dishGrid');
let favourites=JSON.parse(localStorage.getItem('kadhai-favourites')||'[]');
let currentFilter='all';
function render(filter=currentFilter){currentFilter=filter;grid.innerHTML='';const visible=dishes.filter(d=>filter==='all'||d.cat===filter);visible.forEach(d=>{const i=dishes.indexOf(d);const el=document.createElement('article');el.className='dish';el.dataset.index=i;el.innerHTML=`<div class="dish-img" style="background-image:url('${d.image}')"></div>${d.tag?`<span class="dish-tag">${d.tag}</span>`:''}<button class="heart ${favourites.includes(i)?'liked':''}" data-heart="${i}" aria-label="Favourite ${d.name}">${favourites.includes(i)?'♥':'♡'}</button><div class="dish-meta"><h3>${d.name}</h3><span class="dish-price">${d.price}</span></div><p>${d.desc}</p>`;grid.appendChild(el)});}
render();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');render(btn.dataset.filter)}));
grid.addEventListener('click',e=>{const heart=e.target.closest('[data-heart]');if(heart){e.stopPropagation();const i=Number(heart.dataset.heart);favourites=favourites.includes(i)?favourites.filter(x=>x!==i):[...favourites,i];localStorage.setItem('kadhai-favourites',JSON.stringify(favourites));render();return}const card=e.target.closest('.dish');if(card)openDish(Number(card.dataset.index));});
const booking=document.querySelector('#booking'),bookingForm=document.querySelector('#bookingForm'),success=document.querySelector('#bookingSuccess');
function openBooking(){document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));booking.classList.add('open');booking.setAttribute('aria-hidden','false');bookingForm.style.display='grid';success.style.display='none';setTimeout(()=>document.querySelector('#date').focus(),50)}
function closeBooking(){booking.classList.remove('open');booking.setAttribute('aria-hidden','true')}
document.querySelectorAll('[data-open-booking]').forEach(b=>b.addEventListener('click',openBooking));document.querySelectorAll('[data-close-booking]').forEach(b=>b.addEventListener('click',closeBooking));booking.addEventListener('click',e=>{if(e.target===booking)closeBooking()});
bookingForm.addEventListener('submit',e=>{e.preventDefault();bookingForm.style.display='none';success.style.display='block'});
const dishModal=document.querySelector('#dishModal');
function openDish(i){const d=dishes[i];document.querySelector('#dishModalTitle').textContent=d.name;document.querySelector('#dishModalPrice').textContent=d.price;document.querySelector('#dishModalDesc').textContent=d.desc;document.querySelector('#dishModalImage').style.backgroundImage=`url('${imageFor(i)}')`;dishModal.classList.add('open');dishModal.setAttribute('aria-hidden','false')}
function imageFor(i){return dishes[i].image}
function closeDish(){dishModal.classList.remove('open');dishModal.setAttribute('aria-hidden','true')}
document.querySelector('[data-close-dish]').addEventListener('click',closeDish);dishModal.addEventListener('click',e=>{if(e.target===dishModal)closeDish()});
document.querySelector('[data-open-special]').addEventListener('click',()=>openDish(8));
const hamburger=document.querySelector('.hamburger'),nav=document.querySelector('#navLinks');hamburger.addEventListener('click',()=>{const open=nav.classList.toggle('mobile');hamburger.setAttribute('aria-expanded',open)});document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('mobile');hamburger.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeBooking();closeDish()}});
const date=document.querySelector('#date');date.min=new Date().toISOString().split('T')[0];
