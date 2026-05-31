// Import Firebase functions
import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    setDoc,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ========== UTILITY FUNCTIONS ==========

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = show ? 'block' : 'none';
    }
}

function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm && signupForm) {
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
    }
}

// ========== AUTHENTICATION FUNCTIONS ==========

async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-password-confirm').value;

    // Validation
    if (password.length < 6) {
        showError('La password deve avere almeno 6 caratteri');
        return;
    }

    if (password !== confirmPassword) {
        showError('Le password non corrispondono');
        return;
    }

    showLoading(true);

    try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            createdAt: new Date(),
            cart: []
        });

        showSuccess('Registrazione completata! Benvenuto ' + name + '!');
        
        // Clear form
        document.getElementById('signup-form').reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error('Signup error:', error);
        
        if (error.code === 'auth/email-already-in-use') {
            showError('Questa email è già registrata');
        } else if (error.code === 'auth/weak-password') {
            showError('La password è troppo debole');
        } else {
            showError('Errore nella registrazione: ' + error.message);
        }
    } finally {
        showLoading(false);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    showLoading(true);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        showSuccess('Benvenuto ' + userData.name + '!');
        
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: userData.name
        }));

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error('Login error:', error);
        
        if (error.code === 'auth/user-not-found') {
            showError('Account non trovato');
        } else if (error.code === 'auth/wrong-password') {
            showError('Password errata');
        } else {
            showError('Errore nel login: ' + error.message);
        }
    } finally {
        showLoading(false);
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        showError('Errore nel logout');
    }
}

// ========== AUTH STATE MONITORING ==========

onAuthStateChanged(auth, (user) => {
    const authLink = document.getElementById('auth-link');
    
    if (authLink) {
        if (user) {
            // User is logged in
            const userData = JSON.parse(localStorage.getItem('user'));
            authLink.innerHTML = `<a href="#" onclick="handleLogout(); return false;">👤 ${userData?.name || user.email} (Logout)</a>`;
        } else {
            // User is not logged in
            authLink.innerHTML = '<a href="login.html">🔐 Login</a>';
        }
    }
});

// ========== EXPORT FUNCTIONS FOR HTML ==========

window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
window.toggleForm = toggleForm;