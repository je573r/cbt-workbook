document.addEventListener('DOMContentLoaded', () => {
    const signinbutton = document.getElementById("signinbutton");
    signinbutton.addEventListener('click', async () => {
        const usernameinput = document.getElementById("usernameinput");
        const passwordinput = document.getElementById("passwordinput");
        await fetch('/auth/bsignin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: usernameinput.value,
                password: passwordinput.value
            })
        }).then((data) => {
            alert("recieved response");
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
})