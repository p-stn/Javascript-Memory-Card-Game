const ly = document.querySelector(".ly")
const T = document.querySelector(".T")
const S = document.querySelector(".S")
const M = document.querySelector(".M")
const win = document.querySelector(".win")
const playag = document.querySelector(".playag")
let randNum = []
let ceckCards = 0
let val1 = null
let val2 = null
let isStopwatchStarted = false
let stp = false
let clr = false
let rot
let rot2

const cards = [
    { url: "url(img/img-1.jpg)", val: "card_1" },
    { url: "url(img/img-1.jpg)", val: "card_1" },
    { url: "url(img/img-2.jpg)", val: "card_2" },
    { url: "url(img/img-2.jpg)", val: "card_2" },
    { url: "url(img/img-3.jpg)", val: "card_3" },
    { url: "url(img/img-3.jpg)", val: "card_3" },
    { url: "url(img/img-4.jpg)", val: "card_4" },
    { url: "url(img/img-4.jpg)", val: "card_4" },
    { url: "url(img/img-5.jpg)", val: "card_5" },
    { url: "url(img/img-5.jpg)", val: "card_5" },
    { url: "url(img/img-6.jpg)", val: "card_6" },
    { url: "url(img/img-6.jpg)", val: "card_6" },
    { url: "url(img/img-7.jpg)", val: "card_7" },
    { url: "url(img/img-7.jpg)", val: "card_7" },
    { url: "url(img/img-8.jpg)", val: "card_8" },
    { url: "url(img/img-8.jpg)", val: "card_8" },
]
// Particle.js library
particlesJS.load('particle', 'js/particlesjs-config.json');

// Generate random numbers
const raNum = (() => {
    var nums = [];
    for (let i = 0; i < cards.length; i++) {
        nums.push(i)
    }
    var gen_nums = [];
    function in_array(array, el) {
        for (var i = 0; i < array.length; i++)
            if (array[i] == el) return true;
        return false;
    }

    function get_rand(array) {
        // random number to includs to nums
        var rand = array[Math.floor(Math.random() * array.length)];
        // 
        if (!in_array(gen_nums, rand)) {
            gen_nums.push(rand);
            return rand;
        }
        return get_rand(array);
    }
    for (let i = 0; i < nums.length; i++) {
        randNum.push(get_rand(nums))
    }
})
raNum()
const size = {
    // Not work
    backCards : 'bg-blue-800',
    mts: 'w-[70px] h-[100px] lg:w-[100px] lg:h-[150px] xl:w-[150px] xl:h-[200px] lst'
}
let tst = []
const create_card = () => {
    let {backCards,mts}= size
    for (let i = 0; i < cards.length; i++) {
        let tg = document.createElement('li')
        let spn = document.createElement('div')
        let num_card = randNum[i]
        tg.classList.add('ts3d')
        spn.classList = mts
        tg.style.backgroundImage = "url('img/img-00.jpg')";
        tg.style.backgroundSize = '100% 100%'
        tg.style.margin = 3 + 'px'
        tg.style.cursor = 'pointer'
        tg.setAttribute('data-roll', cards[num_card].val)
        spn.style.backgroundSize = 'cover'
        spn.style.backgroundImage = cards[num_card].url
        tg.appendChild(spn)
        tst[i] = tg
        ly.appendChild(tst[i])
    }

}
create_card()

const stopWatch = (() => {
    if (!isStopwatchStarted) {
        console.log("Yesss");
        let p = 0
        let s = 0
        let m = 0
        const settime = setInterval(() => {
            p += 1
            if (p > 59) {
                p = 0
                s += 1
                if (s > 59) {
                    s = 0
                    m += 1
                }
            }
            if (stp) {
                clearInterval(settime)
                
            }
            if (clr) {
                clearInterval(settime)
                p = 0
                s = 0
                m = 0
            }
            T.innerText = `: ${p.toString().padStart(2, "0")}`
            S.innerText = s.toString().padStart(2, "0")
            M.innerText = `${m.toString().padStart(2, "0")} :`
        }, 10);
    }
    clr = false
    isStopwatchStarted = true
    stp = false
})
const cardli = document.querySelectorAll("li")
const playcard = (() => {
    tst.forEach((index) => {
        index.addEventListener("mousedown", (e) => {
            stopWatch()
            let dataRoll = e.target.getAttribute('data-roll')
            if (!val1) {
                val1 = dataRoll
                rot = e.target
                rot.style.pointerEvents = "none"
                rot.style.transition = "0.7s";
                rot.style.transform = "perspective(800px)rotateY(180deg)";
            } else if (!val2) {
                rot2 = e.target
                val2 = dataRoll
                rot2.style.pointerEvents = "none"
                e.target.style.transition = "0.7s";
                e.target.style.transform = "perspective(800px)rotateY(180deg)";
                if (val1 == val2) {
                    val1 = null
                    val2 = null
                    ceckCards += 1
                    if (ceckCards == cards.length / 2) {
                        win.style.display = "flex"
                        console.log("Fuck");
                        stp = true
                    }
                }
                else {
                    e.target.style.transition = "0.7s";
                    rot.style.pointerEvents = ""
                    rot2.style.pointerEvents = ""
                    setTimeout(() => {
                        rot.style.transform = "perspective(800px)rotateY(0deg)";
                        rot2.style.transform = "perspective(800px)rotateY(0deg)";
                        val1 = null
                        val2 = null
                    }, 700);
                }
            }
        })
    })
})
playcard()
playag.addEventListener("mousedown", (() => {
    randNum = []
    raNum()
    tst = []
    ly.innerHTML = ''
    create_card()
    // not necessary but it might be needed later
    val1 = null
    val2 = null
    // rot = null
    // rot2 = null
    ceckCards = 0
    playcard()
    clr = true
    isStopwatchStarted = false
    win.style.display = "none";
}))