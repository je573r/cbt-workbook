
document.addEventListener('DOMContentLoaded', () => {
    const signupbutton = document.getElementById("signupbutton");
    signupbutton.addEventListener('click', () => {
        const upusername = document.getElementById("upusername");
        const upemail = document.getElementById("upemail");
        const uppass = document.getElementById("uppass");
        fetch('/auth/bsignup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: upusername.value,
                email: upemail.value,
                password: uppass.value
            })
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
})