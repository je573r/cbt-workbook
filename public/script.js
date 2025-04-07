import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAEhxiHruKtqcSaJtxKWrsuqqHo7N_LMBQ",
    authDomain: "cbt-workbook-97b46.firebaseapp.com",
    projectId: "cbt-workbook-97b46",
    storageBucket: "cbt-workbook-97b46.firebasestorage.app",
    messagingSenderId: "539683689068",
    appId: "1:539683689068:web:c97906aa41b27982243e49",
    measurementId: "G-XN7VK788GS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const oauth = document.getElementById("oauth");
const provider = new GoogleAuthProvider();
oauth.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in: ", error);
    }
});

onAuthStateChanged(auth, (currentUser) => {
    fetch('/auth/oauth',
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    photo_url: currentUser.photoURL
                }
            )
        }
    )
})

const signinbutton = document.getElementById("signinbutton");
signinbutton.addEventListener('click', () => {
    const usernameinput = document.getElementById("usernameinput");
    const passwordinput = document.getElementById("passwordinput");
    fetch('/auth/bsignin', {
        method: "POST",
        body: {
            username: usernameinput,
            password: passwordinput
        }
    }).then((data) => {
        return data.json();
    }).then((data) => {
        if (data.status === 200) {
            window.alert('Logged In Successfully');
        }
        else {
            window.alert('Invalid Credentials');
        }
    })
})

const signupbutton = document.getElementById("signupbutton");
signupbutton.addEventListener('click', () => {
    const upusername = document.getElementById("upusername");
    const upemail = document.getElementById("upemail");
    const uppass = document.getElementById("uppass");
    fetch('/auth/bsignup', {
        method: "POST",
        body: {
            username: upusername,
            email: upemail,
            password: uppass
        }
    }).then((data) => {
        return data.json();
    }).then((data) => {
        if (data.status === 200) {
            window.alert('Signed Up Successfully');
        }
        else {
            if (data.err_code == 23505) {
                window.alert('Email already exists');
            }
        }
    })
})