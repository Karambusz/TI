window.addEventListener("DOMContentLoaded", ()=> {
    
    if(checkCookie().length > 0) {
        document.querySelector(".menu-wrapper").innerHTML = 
        `
        <div><button class="btn btn-questionnaire">Ankieta</button></div>
        <div><button class="btn">Pokaż wyniki</button></div>
        <div><button class="btn btn-logout" onclick="userLogout()">Wyloguj się</button></div>
        `;   
    } else {
        document.querySelector(".menu-wrapper").innerHTML = 
        `
         <div><button class="btn btn-questionnaire">Ankieta</button></div>
         <div><button class="btn">Dane offline</button></div>
         <div><button class="btn btn-registration">Rejestracja</button></div>
         <div><button class="btn btn-login">Logowanie</button></div>
        `;
    }

    document.querySelector(".main-content").innerHTML = getQuestionnaire();

    
});

window.onload = function() {
    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-questionnaire")) {
            document.querySelector(".main-content").innerHTML = getQuestionnaire();  
            console.log("click ankieta");
        }            
    });
    
    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-login")) {
            document.querySelector(".main-content").innerHTML = getLogin();  
            console.log("click login");
        }      
    });

    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-registration")) {
            document.querySelector(".main-content").innerHTML = getRegistration();  
            console.log("click register");
        }      
    });

    document.querySelector(".main-content").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-send")) {
            let check = validateRadioButtons();
            if(check && navigator.onLine == true && checkCookie().length > 0) {
                console.log("Online send");
            }
            if(check && navigator.onLine == false) {
                console.log("Offline send");
            }
            if(check && checkCookie()== "") {
                console.log("Offline send");
            }    
        }      
    });
}


function checkCookie() {
    if(document.cookie === undefined) {
        return "";
    }
    if(document.cookie.includes("sessionID") === false) {
        return "";
    }
    let arr = document.cookie.split(";");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("sessionID")) {
            let session = arr[i].split("=");
               if(session[1].length > 0) {
                    return session[1];
                } else {
                    return "";
                }
        }
    }
}



function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}

function validateRadioGroup(arr, pred) {
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].checked) {
            pred = true;
        }    
    }    
    return pred;
}

function uncheckedButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].checked = false;
    }
}

function getQuestionnaire() {
    return `
    <div class="questionnaire">
        <form method="POST">
            <div class="questionnaire-wrapper">
                <p>1. Przoszę podać płeć</p>
                <div class="wrapper-item">
                    <input type="radio" id="woman" name="gender" value="kobieta">
                    <label for="woman">Kobieta</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="man" name="gender" value="mężczyzna">
                    <label for="man">Mężczyzna</label>
                </div>

                <p>2. Jaki tytuł Pan/i uzyskał/a?</p>
                <div class="wrapper-item">
                    <input type="radio" id="licentiate" name="degree" value="lic">
                    <label for="licentiate">Licencjat</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="engineer" name="degree" value="inż">
                    <label for="engineer">Inżynier</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="master" name="degree" value="mgr">
                    <label for="master">Magister</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="doctor" name="degree" value="dr">
                    <label for="doctor">Doktor</label>
                </div>

                <p>3. Czy uczelnia jest pomocna w rozwoju Waszej kariery zawodowej?</p>
                <div class="wrapper-item">
                    <input type="radio" id="help_yes" name="help" value="tak">
                    <label for="help_yes">Tak</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="help_no" name="help" value="nie">
                    <label for="engineer">Nie</label>
                </div>

                <p>4. Proszę określić stopień zadowolenia ze studiów wyższych</p>
                <div class="wrapper-item">
                    <input type="radio" id="vhappy" name="satisfaction" value="Bardzo zadowolony/a">
                    <label for="vhappy">Bardzo zadowolony/a</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="happy" name="satisfaction" value="Zadowolony/a">
                    <label for="happy">Zadowolony/a</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="dissatisfied" name="satisfaction" value="Niezadowolony/a">
                    <label for="dissatisfied">Niezadowolony/a</label>
                </div>
                <div class="wrapper-item">
                    <input type="radio" id="vdissatisfied" name="satisfaction" value="Bardzo niezadowolony/a">
                    <label for="vdissatisfied">Bardzo niezadowolony/a</label>
                </div>
                <div class="wrapper-item">
                    <input class="btn btn-send" type='button' value='Wyślij' style="display: block; margin:0 auto;">
                </div> 
            </div>
            <p class="error"></p>     
        </form> 
    </div> 
    `;
}

function validateRadioButtons() {
    const genders = document.querySelectorAll("[name = 'gender']"), 
            academicTitles =  document.querySelectorAll("[name = 'degree']"),
            helpful = document.querySelectorAll("[name = 'help']"),
            satisfaction = document.querySelectorAll("[name = 'satisfaction']");

            console.log(genders);

    let gen = false,
        ac = false;
        help = false;
        sat = false;

        gen = validateRadioGroup(genders, gen);
        ac = validateRadioGroup(academicTitles, ac);
        help = validateRadioGroup(helpful, help);
        sat = validateRadioGroup(satisfaction, sat);

    if (gen && ac && help && sat) {
        document.querySelector("p.error").innerHTML="All checked";
        uncheckedButtons(genders);
        uncheckedButtons(academicTitles);
        uncheckedButtons(helpful);
        uncheckedButtons(satisfaction);
        return true; 
    } else {
        document.querySelector("p.error").innerHTML="Proszę odpowiedzieć na wszystkie pytania!";
        return false;
    }
}

function getLogin() {
    return `
    <div class="login">
        <p>Logowanie</p>
        <form method="POST">
            <label for="logemail">E-mail</label>
            <input type="text" id="logemail" placeholder="Wpisz e-mail" name="logemail" required>
    
            <label for="logpsw">Hasło</label>
            <input type="password" id="logpsw" placeholder="Podaj hasło" name="logpsw" required>
            <div class="btn-input">
                <input class="btn" type='button' value='Zaloguj' onclick="userLogin()">
            </div>
        </form>
        <p class="error"></p>   
    </div>
    `;
}

function getRegistration() {
    return `
    <div class="login">
        <p>Rejestracja</p>
        <form class="registration-form" method="POST">
            <label for="regemail">E-mail</label>
            <input type="text" id="regemail" placeholder="Wpisz e-mail" name="regemail" required>
    
            <label for="regpsw">Hasło</label>
            <input type="password" id="regpsw" placeholder="Podaj hasło" name="regpsw" required>
            <div class="btn-input">
                <input class="btn" type='button' value='Zarejestruj' onclick="userRegister()">
            </div>
        </form>
        <p class="error"></p>   
    </div>
    `;
}



function getRequestObject()      {
    if ( window.ActiveXObject)  {
       return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
    } else if (window.XMLHttpRequest)  {
       return (new XMLHttpRequest())  ;
    } else {
       return (null) ;
    }
 }



 function userRegister() {
    console.log("User register");
    const mail = document.querySelector("[name = 'regemail']"), 
          pass =  document.querySelector("[name = 'regpsw']");

    let textError = document.querySelector(".error");
    if (mail.value == "" || pass.value == "") {
        textError.innerHTML = "Pola są puste. Wypełnij je i spróbuj ponownie";
    } else if(validateEmail(mail.value)==false){
        textError.innerHTML = "Sprawdź poprawność email  i spróbuj ponownie";
    } else if(pass.value.length<5) {
        textError.innerHTML = "Hasło musi mieć przynajmniej 5 znaków";
    } else {
        let user = {};
        user.email = mail.value;
        user.pass = pass.value;
        let txt = JSON.stringify(user);
        let req = getRequestObject();
        if(navigator.onLine) {
            req.open("POST", "http://localhost:81/~8semkovych/projekt2/rest/register", true);
            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status == 200) {
                    console.log(req.responseText);
                    objJSON = JSON.parse(req.response);
                    if (objJSON['status'] == 'OK') {
                        textError.innerHTML = "Konto utworzone. Mozesz zalogować się, wypełnić ankietę i zobaczyć wykresy";
                        document.querySelector(".registration-form").reset();
                    } else {
                        textError.innerHTML = "Użytkownik z takim email już istnieje, podaj inny email"; 
                    }
                } else {
                    textError.innerHTML = "Server error";  
                }
            }
            req.send(txt);
        } else {
            textError.innerHTML = "Jesteś w trybie offline."; 
        }
    }
} 


function userLogin() {
    console.log("User login");
    const mail = document.querySelector("[name = 'logemail']"),
          pass =  document.querySelector("[name = 'logpsw']");
          
    let textError = document.querySelector(".error");

	if (mail.value == "" || pass.value == "") {
        textError.innerHTML = "Pola są puste. Wypełnij je i spróbuj ponownie";
	} else {
        let user = {};
        user.mail = mail.value;
        user.password = pass.value;
        let txt = JSON.stringify(user);
        let req = getRequestObject();
        		//http://pascal.fis.agh.edu.pl/~8semkovych/projekt2/rest/login
		//"http://localhost:81/~8semkovych/projekt2/rest/login"
        if(navigator.onLine) {
            req.open("POST", "http://localhost:81/~8semkovych/projekt2/rest/login", true);
            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status == 200) {
                    console.log(req.responseText);
                    objJSON = JSON.parse(req.response);
                    
                    if (objJSON['status'] == 'OK') {
                        document.cookie = "sessionID=" + objJSON['sessionID'] + "; path=/";
                        textError.innerHTML = "Jesteś zalogowany. Mozesz wypełnić ankietę i zobaczyć wykresy";
                        document.querySelector(".menu-wrapper").innerHTML = 
                        `
                        <div><button class="btn btn-questionnaire">Ankieta</button></div>
                        <div><button class="btn">Pokaż wyniki</button></div>
                        <div><button class="btn btn-logout" onclick="userLogout()">Wyloguj się</button></div>
                        `;
                        document.querySelector(".main-content").innerHTML = getQuestionnaire();
                        setTimeout(()=> {
                            textError.style.display = "none";
                        }, 3000);
                    }
                    else
                    textError.innerHTML = "Podałeś zły login lub  hasło, sprawdź swoje dane i sprobuj ponownie!";
                    } else {
                        textError.innerHTML = "Server error";  
                    }
                    
            }
            req.send(txt);
        } else {
            textError.innerHTML = "Jesteś w trybie offline."; 
        }
    }
}

function userLogout() {
    let cookies = {};
    cookies.cookie =  document.cookie.split("=")[1];
    let txt = JSON.stringify(cookies);
    let req = getRequestObject();
    if(navigator.onLine) {
        req.open("POST", "http://localhost:81/~8semkovych/projekt2/rest/logout", true);
        req.onreadystatechange = function() {
            if(req.readyState == 4 && req.status == 200) {
                objJSON = JSON.parse(req.response);
                if (objJSON['status'] == 'OK'){
                    document.cookie = "sessionID=" + "" + "; path=/";
                    document.querySelector(".menu-wrapper").innerHTML = 
                    `
                    <div><button class="btn btn-questionnaire">Ankieta</button></div>
                    <div><button class="btn">Dane offline</button></div>
                    <div><button class="btn btn-registration">Rejestracja</button></div>
                    <div><button class="btn btn-login">Logowanie</button></div>
                    `;    
                }
            }
        }
        req.send(txt);
    } else {
        alert("Jesteś w trybie online");
    }
}









