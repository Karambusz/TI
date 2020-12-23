window.addEventListener("DOMContentLoaded", () => {

    let bars = [];
    const canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        resBlock = document.querySelector(".res_block");
    let swapInterval = null;
    let generateClick = true;
    let calcClick = true;
    let resStr = "";
    let counter = 0;


    function clearArray(array) {
        while (array.length) {
            array.pop();
        }
    }

    function checkTextInputs(selector) {
        const txtInputs = document.querySelectorAll(selector);
        txtInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.match(/[a-z_]/ig) || input.value.match(/\W/ig)) {
                    input.value = '';
                }
            });
        });
    }

    function tab(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);


        function hideTabContent() {
            tabsContent.forEach(item => {
                item.style.display = "none";
            });

            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].style.display = "block";
            tabs[i].classList.add(activeClass);
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (e) => {
            if (e.target && e.target.matches("div.tab-item")) {
                tabs.forEach((item, i) => {
                    if (e.target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }

    function generateBars() {
        let barsLength, X, barWidth, dx, barsHeight;

        if (generateClick) {
            document.querySelector(".generate_text").innerHTML = "Podaj ilość elementów (5 - 20)";
            clearArray(bars);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            resStr = "";
            resBlock.innerHTML = resStr;

            barsLength = +document.querySelector("#generate").value;

            if (barsLength < 5 || barsLength > 20) {
                document.querySelector(".generate_text").style.color = "red";
            } else {
                document.querySelector(".generate_text").style.color = "#20bf55";
                generateClick = false;
                ctx.fillStyle = "#01BAEF";
                ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

                let delay = 0,
                    speed = 1.5;
                let tmp = canvas.width / (barsLength * 2 + 1);
                X = barWidth = dx = tmp;


                for (let i = 0; i < barsLength; i++) {
                    barsHeight = Math.floor(Math.random() * 36) + 1;
                    bars.push({
                        value: barsHeight,
                        width: barWidth,
                        height: barsHeight * 10,
                        x: X,
                        y: canvas.height - 20,
                        color: "rgb(255,215,0)"
                    });
                    for (let l = 0; l < bars[i].height; l++) {
                        ctx.strokeStyle = "black";
                        ctx.fillStyle = "rgb(255,215,0)"
                        setTimeout(ctx.strokeRect.bind(ctx, X, canvas.height - 20, barWidth, -l), (i == 0 ? 0 : delay) + l * speed);
                        setTimeout(ctx.stroke.bind(ctx), (i == 0 ? 0 : delay) + l * speed);
                        setTimeout(ctx.fillRect.bind(ctx, X, canvas.height - 20, barWidth, -l), (i == 0 ? 0 : delay) + l * speed);
                        ctx.font = "20px Times New Roman";
                        ctx.textAlign = "center";
                        ctx.fillText(bars[i].value, bars[i].x + bars[i].width / 2, bars[i].y + 16);
                    }
                    X += (2 * dx);
                    delay += bars[i].height * speed;
                }
            }
        } else {
            document.querySelector(".generate_text").innerHTML = "Posortuj, zatem zgeneruj ponownie";
            document.querySelector(".generate_text").style.color = "red";

        }
    }

    function swapBars(barA, barB, sortSpeed) {
        let xA, xB, xTmpA, xTmpB, colorA, colorB;

        if (!swapInterval) {
            counter++;
            xA = barA.x;
            xB = barB.x;
            xTmpA = barA.x;
            xTmpB = barB.x;
            colorA = barA.color;
            colorB = barB.color;
            if (barA.value > barB.value) {
                barA.color = "brown";
                barB.color = "brown";
                resStr += `<p>${counter}) ${barA.value} &gt; ${barB.value}, zamieniamy mejscamy</p><br>`
            } else {
                barA.color = "indigo";
                barB.color = "indigo";
                if (barA.value == barB.value) {
                    resStr += `<p>${counter}) ${barA.value} &lt;= ${barB.value}, nie zamieniamy mejscamy</p><br>`
                } else {
                    resStr += `<p>${counter}) ${barA.value} &lt; ${barB.value}, nie zamieniamy mejscamy</p><br>`
                }

            }
            resBlock.innerHTML = resStr;
            swapInterval = setInterval(swapAnimation, 4);
        } else {
            setTimeout(swapBars.bind(null, barA, barB, sortSpeed), 3000 - (sortSpeed * 270));
        }

        function swapAnimation() {

            if ((barA.x >= xB || barB.x <= xA) || (xTmpA >= xB || xTmpB <= xA)) {
                clearInterval(swapInterval);
                barA.color = colorA;
                barB.color = colorB;
                swapInterval = null;
            } else {
                if (barA.value > barB.value) {
                    barA.x++;
                    barB.x--;
                }
                xTmpA++;
                xTmpB--;
            }
            drawSwap();
        }
    }


    function drawSwap() {
        ctx.fillStyle = "#01BAEF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bars.length; i++) {
            let bar = bars[i];
            ctx.strokeStyle = "black";
            ctx.fillStyle = bar.color;
            ctx.strokeRect(bar.x, bar.y, bar.width, -bar.height);
            ctx.stroke();
            ctx.fillRect(bar.x, bar.y, bar.width, -bar.height);
            ctx.font = "20px Times New Roman";
            ctx.textAlign = "center";
            ctx.fillStyle = bar.color;
            ctx.fillText(bar.value, bar.x + bar.width / 2, bar.y + 16);
        }
    }

    function bubbleSortCanvas(arr) {
        counter = 0;
        let sortSpeed = +document.querySelector("#sortSpeed").value;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                swapBars(arr[j], arr[j + 1], sortSpeed);
                if (arr[j].value > arr[j + 1].value) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
            setTimeout(() => {
                generateClick = true;
            }, 7000);
        }
    }

    function bubbleSortCalc(size) {
        if (calcClick) {
            const time = document.querySelector(".time_block"),
                compare = document.querySelector(".compare_block"),
                copy = document.querySelector(".copies_block");
            let comparisons = 0;
            let copies = 0;
            calcClick = false;
            let tmpArr = [];
            for (let i = 0; i < size; i++) {
                tmpArr.push(Math.floor(Math.random() * (size - 1)) + 1);
            }
            let t0 = performance.now();
            for (let i = 0; i < tmpArr.length - 1; i++) {
                for (let j = 0; j < tmpArr.length - 1 - i; j++) {
                    if (tmpArr[j] > tmpArr[j + 1]) {
                        comparisons += 1;
                        let temp = tmpArr[j];
                        tmpArr[j] = tmpArr[j + 1];
                        tmpArr[j + 1] = temp;
                        copies += 3;
                    }
                }
            }
            calcClick = true;
            let t1 = performance.now();
            let res;
            compare.innerHTML = `Ilość porównań: ${comparisons} `;
            copy.innerHTML = `Ilość kopii: ${copies} `;
            if ((t1 - t0) > 1000) {
                res = ((t1 - t0) / 1000).toFixed(4);
                time.innerHTML = `Czas wykonania: ${res} sekundy`;
            } else {
                res = ((t1 - t0)).toFixed(4);
                time.innerHTML = `Czas wykonania: ${res} milisekundy`;
            }
        }
    }

    function scrolling(upSelector) {
        const upElem = document.querySelector(upSelector);

        window.addEventListener("scroll", (upSelector) => {
            if (document.documentElement.scrollTop > 1150) {
                upElem.classList.add("animated", "fadeIn");
                upElem.classList.remove("fadeOut");
            } else {
                upElem.classList.add("fadeOut");
                upElem.classList.remove("fadeIn");
            }
        });


        let links = document.querySelectorAll('[href^="#"]'),
            speed = 0.2;

        links.forEach(link => {
            if (link.getAttribute('href') != '#') {
                link.addEventListener('click', function (event) {
                    event.preventDefault();

                    let widthTop = document.documentElement.scrollTop,
                        hash = this.hash,
                        toBlock = document.querySelector(hash).getBoundingClientRect().top,
                        start = null;
                    requestAnimationFrame(step);

                    function step(time) {
                        if (start === null) {
                            start = time;
                        }

                        let progress = time - start,
                            r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

                        document.documentElement.scrollTo(0, r);

                        if (r != widthTop + toBlock) {
                            requestAnimationFrame(step);
                        } else {
                            location.hash = hash;
                        }
                    }
                });
            }
        });
    }


    tab(".tab-item", ".tab-content", ".tab-panel", "tab-item--active");

    const sortBtn = document.querySelector("#btn_sort");

    sortBtn.addEventListener("click", () => {
        bubbleSortCanvas(bars);
    });

    const generateBtn = document.querySelector("#btn_generate");

    generateBtn.addEventListener("click", () => {
        generateBars();
    });

    document.querySelector("#sortSpeed").addEventListener("input", function () {
        let value = (this.value - this.min) / (this.max - this.min) * 100
        this.style.background = 'linear-gradient(to right, #20bf55 0%, #20bf55 ' + value + '%, #fff ' + value + '%, white 100%)'
    });



    checkTextInputs("#generate");
    checkTextInputs("#arraySize");


    const calcBtn = document.querySelector("#btn_calc");

    calcBtn.addEventListener("click", () => {
        let size = document.querySelector("#arraySize");
        if (+size.value < 2 || +size.value > 120000) {
            document.querySelector(".calc_text").style.color = "red";
        } else {
            document.querySelector(".calc_text").style.color = "#20bf55";
            bubbleSortCalc(+size.value);
        }
    });

    scrolling(".pageup");

});