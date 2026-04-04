// --- LOGIKA SIDEBAR MENU ---
function toggleSidebar() {
    const sidebar = document.getElementById("sidebarMenu");
    sidebar.classList.toggle("active");
    
    const spans = document.querySelectorAll('.hamburger span');
    if(sidebar.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// --- SCRIPT MATERI YANG DIPERBAIKI ---
function openTab(evt, tabName) {
    let i, x, btns;
    x = document.getElementsByClassName("tab-content");
    btns = document.getElementsByClassName("tab-btn");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        x[i].classList.remove("active");
        btns[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    setTimeout(() => document.getElementById(tabName).classList.add("active"), 10);
    
    if(evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

// --- SCRIPT KUIS (10 SOAL PER LEVEL) ---
const soalKuis = {
    mudah: [
        { q: "Berapa hasil dari 3x = 12?", options: ["x = 3", "x = 4", "x = 5"], answer: 1 },
        { q: "Bangun datar yang memiliki 3 sisi adalah?", options: ["Persegi", "Lingkaran", "Segitiga"], answer: 2 },
        { q: "Nilai dari 5 + 3x, jika x = 2 adalah?", options: ["10", "11", "16"], answer: 1 },
        { q: "Berapa besar sudut siku-siku?", options: ["45°", "90°", "180°"], answer: 1 },
        { q: "Rumus keliling persegi dengan sisi 's' adalah?", options: ["s²", "4s", "2s"], answer: 1 },
        { q: "Jika 2x + 4 = 10, berapakah nilai x?", options: ["2", "3", "4"], answer: 1 },
        { q: "Segitiga yang ketiga sisinya sama panjang disebut?", options: ["Sama kaki", "Siku-siku", "Sama sisi"], answer: 2 },
        { q: "Berapakah hasil dari 7² (Tujuh pangkat dua)?", options: ["14", "49", "21"], answer: 1 },
        { q: "Pada segitiga siku-siku, sisi terpanjang disebut?", options: ["Alas", "Tinggi", "Hipotenusa"], answer: 2 },
        { q: "Jika y - 5 = 15, maka nilai y adalah?", options: ["10", "20", "25"], answer: 1 }
    ],
    sedang: [
        { q: "Luas segitiga dengan alas 10 cm dan tinggi 5 cm adalah?", options: ["25 cm²", "50 cm²", "15 cm²"], answer: 0 },
        { q: "Nilai Sin 30° adalah?", options: ["1/2", "1", "0"], answer: 0 },
        { q: "Jika 3(x - 2) = 15, nilai x adalah?", options: ["5", "7", "9"], answer: 1 },
        { q: "Berapa luas lingkaran dengan jari-jari 7 cm? (π = 22/7)", options: ["44 cm²", "154 cm²", "49 cm²"], answer: 1 },
        { q: "Nilai Cos 90° adalah?", options: ["1", "1/2", "0"], answer: 2 },
        { q: "Sebuah persegi panjang memiliki panjang 8 cm dan lebar 5 cm. Kelilingnya adalah?", options: ["26 cm", "40 cm", "13 cm"], answer: 0 },
        { q: "Hasil pemfaktoran dari x² + 5x + 6 adalah?", options: ["(x+1)(x+6)", "(x+2)(x+3)", "(x-2)(x-3)"], answer: 1 },
        { q: "Nilai Tan 45° adalah?", options: ["0", "1", "Tak terhingga"], answer: 1 },
        { q: "Panjang diagonal ruang pada kubus dengan rusuk 'a' adalah?", options: ["a√2", "a√3", "2a"], answer: 1 },
        { q: "Penyelesaian dari 2x + y = 5 dan x - y = 1 adalah?", options: ["x=1, y=2", "x=2, y=1", "x=3, y=-1"], answer: 1 }
    ],
    sulit: [
        { q: "Jika x² - 5x + 6 = 0, maka akar-akarnya adalah?", options: ["-2 dan -3", "2 dan 3", "1 dan 6"], answer: 1 },
        { q: "Nilai dari Cos 60° + Sin 30° adalah?", options: ["1", "1/2", "2"], answer: 0 },
        { q: "Sebuah segitiga memiliki sisi 5, 12, dan 13. Apakah jenis segitiga tersebut?", options: ["Lancip", "Tumpul", "Siku-siku"], answer: 2 },
        { q: "Nilai dari (Sin 45°)² + (Cos 45°)² adalah?", options: ["0", "1", "2"], answer: 1 },
        { q: "Tentukan nilai x dari persamaan kuadrat 2x² - 8x + 8 = 0!", options: ["2", "-2", "4"], answer: 0 },
        { q: "Jika panjang bayangan tiang 4 m adalah 3 m, berapa tinggi pohon yang bayangannya 15 m pada saat yang sama?", options: ["12 m", "15 m", "20 m"], answer: 2 },
        { q: "Diketahui barisan aritmatika 2, 5, 8, 11... Suku ke-10 adalah?", options: ["27", "29", "31"], answer: 1 },
        { q: "Nilai maksimum dari fungsi kuadrat y = -x² + 4x - 3 adalah?", options: ["1", "3", "5"], answer: 0 },
        { q: "Identitas Sin²x + Cos²x = 1 didasarkan pada teorema?", options: ["Thales", "Pythagoras", "Stewart"], answer: 1 },
        { q: "Sebuah kubus memiliki volume 343 cm³. Berapa luas permukaannya?", options: ["294 cm²", "196 cm²", "256 cm²"], answer: 0 }
    ]
};

let soalSaatIni = []; let indexSoal = 0; let skor = 0;

function loadQuiz(evt, level) {
    document.getElementById('score-board').style.display = "none";
    let btns = document.getElementsByClassName("level-btn");
    for (let i = 0; i < btns.length; i++) btns[i].classList.remove("active");
    
    if(evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    } else {
        btns[0].classList.add("active"); 
    }

    soalSaatIni = soalKuis[level]; indexSoal = 0; skor = 0;
    renderSoal();
}

function renderSoal() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = ""; 
    if (indexSoal < soalSaatIni.length) {
        let s = soalSaatIni[indexSoal];
        let box = document.createElement('div');
        box.className = 'question-box';
        box.style.display = 'block';
        let qHtml = `<h3>Soal ${indexSoal + 1} dari ${soalSaatIni.length}</h3><p style="margin-bottom: 10px;">${s.q}</p><div class="options">`;
        s.options.forEach((opt, idx) => {
            qHtml += `<button class="option-btn" onclick="cekJawaban(${idx})">${opt}</button>`;
        });
        qHtml += `</div>`;
        box.innerHTML = qHtml;
        container.appendChild(box);
    } else { tampilkanSkor(); }
}

function cekJawaban(idxDipilih) {
    if (idxDipilih === soalSaatIni[indexSoal].answer) skor += (100 / soalSaatIni.length);
    indexSoal++; renderSoal();
}

function tampilkanSkor() {
    document.getElementById('score-board').style.display = "block";
    document.getElementById('final-score').innerText = Math.round(skor);
}

// Inisialisasi awal
window.onload = () => { 
    soalSaatIni = soalKuis['mudah']; 
    renderSoal(); 
};