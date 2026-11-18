// Logik für spezielle Minispiele & Interaktionen
function startQuest(dayNumber) {
    const quest = questsData[dayNumber];
    if(!quest) return;

    if(quest.warning) {
        alert("⚠️ WARNUNG: " + quest.warning);
    }

    if(quest.type === 'personal_quiz') {
        renderPersonalQuiz();
    } else if(quest.type === 'joker') {
        alert(quest.text);
        gameState.aura += 1;
        document.getElementById('hud-aura').innerText = gameState.aura;
    } else {
        openModal(`<h3>${quest.title}</h3><p>${quest.desc || 'Minispiel läuft...'}</p><button onclick="completeTask(true)">Aufgabe schaffen (+Aura)</button><button onclick="completeTask(false)" style="background:#ef4444;">Abbrechen (-Aura)</button>`);
    }
}

function renderPersonalQuiz() {
    let html = `
        <h3>🎄 Tag 24: Das persönliche Quiz 🎄</h3>
        <p>1. Geburtstag: <input type="text" id="q1" placeholder="TT.MM.JJJJ"></p>
        <p>2. Lieblingsfach damals: <select id="q2"><option value="deutsch">Deutsch</option><option value="kunst">Kunst</option></select></p>
        <p>3. Lehrer, bei dem wir beide zustimmen: <select id="q3"><option value="arend">Arend</option><option value="brueggemann">Brüggemann</option></select></p>
        <p>4. Bin ich adoptiert?: <select id="q4"><option value="ja">Ja</option><option value="nein">Nein</option></select></p>
        <button onclick="checkPersonalQuiz()">Antworten absenden</button>
        <div id="quiz-feedback" style="margin-top: 15px; font-weight: bold; text-align: center; font-size: 24px;"></div>
    `;
    openModal(html);
}

function checkPersonalQuiz() {
    const d = document.getElementById('q1').value;
    const f = document.getElementById('q2').value;
    const l = document.getElementById('q3').value;
    const a = document.getElementById('q4').value;

    // Bedingungen aus deiner Beschreibung: 05.07.2005, Kunst (richtig), Brüggemann (richtig), Nein (richtig)
    const passed = (d === "05.07.2005" && f === "kunst" && l === "brueggemann" && a === "nein");

    if(passed) {
        document.getElementById('quiz-feedback').innerHTML = "Richtig! Türchen 24 geöffnet! 🎉";
        completeTask(true);
    } else {
        // Bei falscher Antwort: "HS" Pop-up, danach 2 Sek. Jump-Scare
        document.getElementById('quiz-feedback').innerHTML = "HS";
        setTimeout(() => {
            document.getElementById('modal-body').innerHTML = `
                <div style="background:red; width:100%; height:300px; display:flex; align-items:center; justify-content:center; font-size:40px;">
                    😱 JUMP SCARE! 😱
                </div>
                <p style="text-align:center; margin-top:10px;">Falsch beantwortet! -Aura.</p>
            `;
            completeTask(false);
        }, 2000);
    }
}

function completeTask(success) {
    if(success) {
        gameState.aura += 1;
        alert("Glückwunsch! Aufgabe geschafft (+1 Aura). Türchen offen!");
    } else {
        gameState.aura -= 1;
        alert("Schade! Aufgabe nicht geschafft (-1 Aura). Das Türchen öffnet sich trotzdem.");
    }
    document.getElementById('hud-aura').innerText = gameState.aura;
    closeModal();
}
