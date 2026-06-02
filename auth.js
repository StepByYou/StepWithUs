// StepWithUs demo auth - registrazione/login locale per provare la demo senza server
// Nota: per vendite reali lo sostituiremo con Firebase/Stripe sicuri.
const STORAGE_USERS = 'stepwithus_demo_users';
const STORAGE_SESSION = 'stepwithus_user';

function getUsers(){
  try { return JSON.parse(localStorage.getItem(STORAGE_USERS)) || []; } catch { return []; }
}
function saveUsers(users){ localStorage.setItem(STORAGE_USERS, JSON.stringify(users)); }
function setSession(user){
  localStorage.setItem(STORAGE_SESSION, JSON.stringify({ id:user.id, name:user.name, email:user.email }));
  localStorage.setItem('user', JSON.stringify({ uid:user.id, name:user.name, email:user.email }));
}
function getSession(){
  try { return JSON.parse(localStorage.getItem(STORAGE_SESSION)) || JSON.parse(localStorage.getItem('user')); } catch { return null; }
}
function showMessage(id, message){
  const el = document.getElementById(id);
  if(!el) return;
  el.textContent = message;
  el.style.display = 'block';
  setTimeout(()=>{ el.style.display='none'; }, 4500);
}
function showError(message){ showMessage('error-message', message); }
function showSuccess(message){ showMessage('success-message', message); }
function showLoading(show){ const el=document.getElementById('loading'); if(el) el.style.display = show ? 'block':'none'; }
function activateTab(target){
  const isSignup = target === 'signup';
  document.getElementById('login-form')?.classList.toggle('hidden-form', isSignup);
  document.getElementById('signup-form')?.classList.toggle('hidden-form', !isSignup);
  document.querySelectorAll('.auth-tab').forEach(btn=>btn.classList.toggle('active', btn.dataset.authTab === target));
  history.replaceState(null, '', isSignup ? 'login.html?mode=signup' : 'login.html');
}
function toggleForm(){
  const signupHidden = document.getElementById('signup-form')?.classList.contains('hidden-form');
  activateTab(signupHidden ? 'signup' : 'login');
}
async function handleSignup(event){
  event.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-password-confirm').value;
  if(name.length < 2) return showError('Inserisci il tuo nome.');
  if(password.length < 6) return showError('La password deve avere almeno 6 caratteri.');
  if(password !== confirm) return showError('Le password non corrispondono.');
  showLoading(true);
  setTimeout(()=>{
    const users = getUsers();
    if(users.some(u=>u.email === email)) { showLoading(false); return showError('Questa email è già registrata. Accedi oppure usa una nuova email.'); }
    const user = { id:'demo_' + Date.now(), name, email, password, createdAt:new Date().toISOString(), purchases:[] };
    users.push(user); saveUsers(users); setSession(user);
    showLoading(false); showSuccess('Registrazione completata! Benvenuto ' + name + '.');
    setTimeout(()=>{ window.location.href='my-ebooks.html'; }, 900);
  }, 500);
}
async function handleLogin(event){
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  showLoading(true);
  setTimeout(()=>{
    const user = getUsers().find(u=>u.email === email && u.password === password);
    showLoading(false);
    if(!user) return showError('Email o password non corretti. Se non hai un account, clicca su Registrati.');
    setSession(user); showSuccess('Bentornato ' + user.name + '!');
    setTimeout(()=>{ window.location.href='my-ebooks.html'; }, 700);
  }, 450);
}
function handleLogout(){
  localStorage.removeItem(STORAGE_SESSION); localStorage.removeItem('user');
  window.location.href='index.html';
}
function updateAuthHeader(){
  const user = getSession();
  const authLink = document.getElementById('auth-link');
  const welcome = document.getElementById('welcome-user');
  if(authLink){ authLink.innerHTML = user ? `<a href="#" onclick="handleLogout();return false;">👤 ${user.name} · Logout</a>` : '<a href="login.html">🔐 Login</a>'; }
  if(welcome && user) welcome.textContent = `Bentornato, ${user.name}`;
}
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
window.toggleForm = toggleForm;
window.activateTab = activateTab;

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.auth-tab').forEach(btn=>btn.addEventListener('click',()=>activateTab(btn.dataset.authTab)));
  const params = new URLSearchParams(location.search);
  activateTab(params.get('mode') === 'signup' ? 'signup' : 'login');
  updateAuthHeader();
});
