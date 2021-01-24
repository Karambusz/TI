window.addEventListener("DOMContentLoaded", ()=> {
    
    if(checkCookie().length > 0) {
        document.querySelector(".menu-wrapper").innerHTML = 
        `
        <div><button class="btn btn-questionnaire">Ankieta</button></div>
        <div><button class="btn btn-online">Pokaż wyniki</button></div>
        <div><button class="btn btn-logout" onclick="userLogout()">Wyloguj się</button></div>
        `;   
    } else {
        document.querySelector(".menu-wrapper").innerHTML = 
        `
         <div><button class="btn btn-questionnaire">Ankieta</button></div>
         <div><button class="btn btn-offline">Dane offline</button></div>
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

    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-offline")) {  
            showOffline();
            console.log("click dane offline");
        }      
    });

    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-online")) {  
            showOnline();
            console.log("click dane online");
        }      
    });
}

let localDbIndex = 0;

function getQuestionnaire() {
    let res = `
    <div class="questionnaire">
    <form class="questionnaire-form" method="POST">
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
            <div class="wrapper-item">`
            if (checkCookie() == "" || navigator.onLine == false) {
                res+=`<input class="btn btn-send" type='button' value='Wyślij' style="display: block; margin:0 auto;" onclick="sendOffline()">`;
            } else {
                res+=`<input class="btn btn-send" type='button' value='Wyślij' style="display: block; margin:0 auto;" onclick="sendOnline()">`; 
            }
                
            res+=`</div> 
                </div>
                <p class="error"></p>     
            </form> 
        </div> `;
    return res;
    
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

function getTable() {
    return `
    <div class="table-wrapper" style="width: 600px; margin: 0 auto; margin-top: 20px;">
        <table>
            <thead>
                <tr class="row__cyan">
                    <th>Lp.</th>
                    <th>Płeć</th>
                    <th>Tytuł naukowy</th>
                    <th>Uczelnia jest pomocna</th>
                    <th>Stopień zadowolenia</th>
                </tr>
            </thead>
            <tbody>                          
            </tbody>
        </table>
    </div>
    `;
}

function getCanvas() {
    return `
    <div class="first-canvas">
        <div id="first">

        </div>
    </div>
    <div class="second-canvas">
        <div id="second">

        </div>
    </div>
    <div class="third-canvas">
        <div id="third">

        </div>
    </div>
    `;
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
        return true; 
    } else {
        document.querySelector("p.error").innerHTML="Proszę odpowiedzieć na wszystkie pytania!";
        return false;
    }
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


function addRow(row) {
    let tmp = `<tr class="row__green">`;
    for (let prop in row ) {
        tmp += "<td>" + row[prop]+" </td>";      
    }
    tmp += "</tr>";
    return tmp;
}

function showOffline() {
    document.querySelector(".main-content").innerHTML = getTable();

    const connection = window.indexedDB.open("AnkietaAbsolwentow", 4);
    connection.onupgradeneeded = function (event) {
        event.target.transaction.abort();
        console.log(event);
    };
    connection.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['results'], "readonly");
        const objectStore = transaction.objectStore('results');
        const objectRequest = objectStore.getAll();
        objectRequest.onerror = function (event) {
            console.log("error");
            console.log(event);
        };
 
        objectRequest.onsuccess = function (event) {
            let rows = "";
            objectRequest.result.forEach(element => {
                rows += addRow(element);
            });
            document.querySelector(".main-content table tbody").innerHTML = rows;
        };
    }

}

const getResource = async (url) => { // async code
    const res = await fetch(url);

    if (!res.ok) {
        throw prompt(new Error(`Could not fetch ${url}, status: ${res.status}`));
    }

    return await res.json(); // parses JSON response into native JavaScript objects
};

function showOnline() {
    let womanEn = 0,
        manEn = 0,
        womanLic = 0,
        manLic = 0,
        womanMas = 0,
        manMas = 0,
        womanDr = 0,
        manDr = 0,
        helpfulYes = 0,
        helpfulNo = 0,
        vHappy = 0,
        happy = 0,
        vDis = 0,
        dis = 0;
    document.querySelector(".main-content").innerHTML = getCanvas();
    console.log(document.getElementById("first-canvas"));     


    getResource('http://pascal.fis.agh.edu.pl/~8semkovych/projekt2/rest/list')
        .then(data => {
            let objJSON = data;
            womanEn = objJSON.filter(woman => woman.gender === "kobieta" && woman.ac_title === "inż").length;
            manEn = objJSON.filter(man => man.gender === "mężczyzna" && man.ac_title === "inż").length;
            womanLic = objJSON.filter(woman => woman.gender === "kobieta" && woman.ac_title === "lic").length;
            manLic = objJSON.filter(man => man.gender === "mężczyzna" && man.ac_title === "lic").length;
            womanMas = objJSON.filter(woman => woman.gender === "kobieta" && woman.ac_title === "mgr").length;
            manMas = objJSON.filter(man => man.gender === "mężczyzna" && man.ac_title === "mgr").length;
            womanDr = objJSON.filter(woman => woman.gender === "kobieta" && woman.ac_title === "dr").length;
            manDr = objJSON.filter(man => man.gender === "mężczyzna" && man.ac_title === "dr").length;
            helpfulYes = objJSON.filter(help => help.is_helpful === "tak").length;
            helpfulNo = objJSON.filter(help => help.is_helpful === "nie").length;
            vHappy = objJSON.filter(sat => sat.satisfaction === "Bardzo zadowolony/a").length;
            happy = objJSON.filter(sat => sat.satisfaction === "Zadowolony/a").length;
            dis = objJSON.filter(sat => sat.satisfaction === "Niezadowolony/a").length;
            vDis = objJSON.filter(sat => sat.satisfaction === "Bardzo niezadowolony/a").length;
            
            let sum = vHappy + happy + dis + vDis;

            let chart1 = new CanvasJS.Chart("first");

            chart1.options.title = { text: "Tytuł/płeć" };
        
            let series1 = { 
                type: "column",
                name: "Mężczyźni",
                showInLegend: true
            };
        
            let series2 = { 
                type: "column",
                name: "Kobiety",
                showInLegend: true
            };
        
            chart1.options.data = [];
            chart1.options.data.push(series1);
            chart1.options.data.push(series2);
        
        
            series1.dataPoints = [
                    { label: "Licencjat", y:  manLic},
                    { label: "Inżynier", y:  manEn},
                    { label: "Magister", y:  manMas},
                    { label: "Doktor", y: manDr }
            ];
        
            series2.dataPoints = [
                { label: "Licencjat", y:  womanLic},
                { label: "Inżynier", y:  womanEn},
                { label: "Magister", y: womanMas },
                { label: "Doktor", y:  womanDr}
            ];
        
            chart1.render();


            let chart2 = new CanvasJS.Chart("second", {
                theme: "light2",
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: "Stopień zadowolenia ze studiów wyższych",
                    horizontalAlign: "center"
                },
                data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: [
                        { y: (vHappy*100)/sum, label: "Bardzo zadowolony/a" },
                        { y: (happy*100)/sum, label: " Zadowolony/a" },
                        { y: (dis*100)/sum, label: "Niezadowolony/a" },
                        { y: (vDis*100)/sum, label: "Bardzo niezadowolony/a" }
                    ]
                }]
            });
            chart2.render();

            let chart3 = new CanvasJS.Chart("third", {
                title:{
                    text: "Czy uczelnia jest pomocna w rozwoju kariery zawodowej",
                    horizontalAlign: "center"

                },
                data: [              
                {
                    type: "column",
                    dataPoints: [
                        { label: "Tak",  y: helpfulYes  },
                        { label: "Nie", y: helpfulNo  }

                    ]
                }
                ]
            });
            chart3.render();
        });



}


function sendOffline() {
    let check = validateRadioButtons();
    if( (check && checkCookie()== "") || (check && navigator.onLine == false)) {
        let queForm = document.querySelector(".questionnaire-form");
        let answer = {};
        answer.id = ++localDbIndex;
        answer.gender = queForm.elements.gender.value;
        answer.ac_title = queForm.elements.degree.value;
        answer.is_helpful = queForm.elements.help.value;
        answer.satisfaction = queForm.elements.satisfaction.value;

    
        const connection = window.indexedDB.open("AnkietaAbsolwentow", 4);
        connection.onupgradeneeded = function (event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('results', {autoIncrement: true});
            console.log(objectStore);
        };
        connection.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('results', 'readwrite');
            const objectStore = transaction.objectStore('results');
            const objectRequest = objectStore.put(answer);
            objectRequest.onerror = function (event) {
                console.log("error");
                console.log(event);
         };
    
        objectRequest.onsuccess = function (event) {
            console.log("success");
        };
        uncheckedButtons(document.querySelectorAll("[name = 'gender']"));
        uncheckedButtons(document.querySelectorAll("[name = 'degree']"));
        uncheckedButtons(document.querySelectorAll("[name = 'help']"));
        uncheckedButtons(document.querySelectorAll("[name = 'satisfaction']"));
        document.querySelector("p.error").innerHTML = "Dane zostały dodane do lokalnej bazy danych. Aby zobaczyć wykresy utwórz konto i zaloguj się";
        }
    }
}

function sendOnline() {
    let check = validateRadioButtons();
    if(check && navigator.onLine == true && checkCookie().length > 0) {
        let queForm = document.querySelector(".questionnaire-form");
        let answer = {};
        answer.email = checkCookie();
        answer.gender = queForm.elements.gender.value;
        answer.ac_title = queForm.elements.degree.value;
        answer.is_helpful = queForm.elements.help.value;
        answer.satisfaction = queForm.elements.satisfaction.value;
        let txt = JSON.stringify(answer);
        let req = getRequestObject(); 
        console.log(txt);
        if (navigator.onLine) {
            req.open("POST", "http://pascal.fis.agh.edu.pl/~8semkovych/projekt2/rest/save", true);
            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status == 200) {
                    objJSON = JSON.parse(req.response);
                    if (objJSON['status'] == 'OK') {
                        document.querySelector("p.error").innerHTML = "Dane zostały dodane do bazy"
                        uncheckedButtons(document.querySelectorAll("[name = 'gender']"));
                        uncheckedButtons(document.querySelectorAll("[name = 'degree']"));
                        uncheckedButtons(document.querySelectorAll("[name = 'help']"));
                        uncheckedButtons(document.querySelectorAll("[name = 'satisfaction']"));                   
                    } else {
                        document.querySelector("p.error").innerHTML = "Już dodałeś swoje odpowiedzi do bazy"; 
                    }                    
                }    
            }
            req.send(txt);
        } else {
            document.querySelector("p.error").innerHTML = "Jesteś w trybie offline."; 
        }
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
            req.open("POST", "http://pascal.fis.agh.edu.pl/~8semkovych/projekt2/rest/register", true);
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
        if(navigator.onLine) {
            req.open("POST", "http://pascal.fis.agh.edu.pl/~8semkovych/projekt2/rest/login", true);
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
                        <div><button class="btn btn-online">Pokaż wyniki</button></div>
                        <div><button class="btn btn-logout" onclick="userLogout()">Wyloguj się</button></div>
                        `;
                        document.querySelector(".main-content").innerHTML = getQuestionnaire();
                        setTimeout(()=> {
                            textError.style.display = "none";
                        }, 3000);
                        indexedDB.deleteDatabase("AnkietaAbsolwentow");
                        localDbIndex = 0;
                    }
                    else
                    textError.innerHTML = "Podałeś zły login lub hasło, sprawdź swoje dane i sprobuj ponownie!";
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
        req.open("POST", "http://pascal.fis.agh.edu.pl/~8semkovych/projekt2/rest/logout", true);
        req.onreadystatechange = function() {
            if(req.readyState == 4 && req.status == 200) {
                objJSON = JSON.parse(req.response);
                if (objJSON['status'] == 'OK'){
                    document.cookie = "sessionID=" + "" + "; path=/";
                    document.querySelector(".menu-wrapper").innerHTML = 
                    `
                    <div><button class="btn btn-questionnaire">Ankieta</button></div>
                    <div><button class="btn btn-offline">Dane offline</button></div>
                    <div><button class="btn btn-registration">Rejestracja</button></div>
                    <div><button class="btn btn-login">Logowanie</button></div>
                    `; 
                    document.querySelector(".main-content").innerHTML = getQuestionnaire();   
                }
            }
        }
        req.send(txt);
    } else {
        alert("Jesteś w trybie online");
    }
}