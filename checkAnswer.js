// <div><code id="typeans"><span class="typeGood">Juliet</span></code></div>
// <div><code id="typeans"><span class="typeBad">-</span><span class="typeBad">Rom</span><span class="typeGood">e</span><span class="typeBad">o</span><br>↓<br><span class="typeMissed">Juli</span><span class="typeGood">e</span><span class="typeMissed">t</span></code></div>
// <div><code id="typeans"><span class="typeBad">----</span><span class="typeGood">e</span><br>↓<br><span class="typeMissed">Juli</span><span class="typeGood">e</span><span class="typeMissed">t</span></code></div>
// <div><code id="typeans"><span class="typeBad">j</span><span class="typeGood">uli</span><span class="typeBad">a</span><span class="typeGood">t</span><br>↓<br><span class="typeMissed">J</span><span class="typeGood">uli</span><span class="typeMissed">e</span><span class="typeGood">t</span></code></div>

function checkAnswer() {
    let typeAns = document.getElementById('typeans');

    // Remove all dashes Anki inserted when calculating the diff.
    // TODO: Doing this means that legitimate dashes will be dropped from the inserted HTML.
    let userAns = typeAns.innerText.split('↓')[0].replace(/\-/g, '');

    let correctAnswers = document.getElementById('correct-ans').innerText.split(',').map(standardize);

    if (userAns !== "" && correctAnswers.indexOf(standardize(userAns)) > -1) {
        typeAns.outerHTML = "<div id='correct' class='checked-ans'>" + userAns + "</div>";
    }
    else {
        typeAns.outerHTML = "<div id='incorrect' class='checked-ans'>" + userAns + "</div>";
    }
}

function standardize(str) {
    return str.trim().toUpperCase().replace(/\-/g, '');
}

checkAnswer();