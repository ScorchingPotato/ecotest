document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll('.question');
    const totalQuestions = questions.length;
    let currentQuestion = 0;
    let totalscore = 0;

    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.style.display = "block";
            } else {
                question.style.display = "none";
            }
        });
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    }

    function showResults() {
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radioButton) => {
            if (radioButton.checked) {
                let selectedValue = radioButton.value;
                totalscore+=Number(selectedValue);
        };});
        let response = "";
        let response_color=0;
        if (totalscore < 3) {
            response = "Tikras klimato aktyvistas!"
            response_color="#38ff66";
        } else if (totalscore < 7) {
            response = "Šaunuolis, tavo Co2 emisija yra mažesnės už vidutinio žmogaus"
            response_color="#51f0d0"
        } else if (totalscore < 8) {
            response = "Tavo Co2 emisja yra tokia pat kaip vidutinio žmogaus"
            response_color="#d5ff61"
        } else {
            response = "Tavo Co2 emisija yra labai didelė lyginant su vidutiniu žmogumi"
            response_color="#ff5338"
        }
    
        const modal = document.getElementById('resultsModal');
        const resultsDiv = document.getElementById('resultsContent');
        const resulttext= document.getElementById('results');
        resulttext.innerHTML = response;
        resulttext.style.color=response_color;
        modal.style.display = "block";
        const closeButton = document.getElementsByClassName("closeButton")[0];
        closeButton.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    

    // Attach event listeners to all "Next" buttons
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`nextButton${i}`).addEventListener('click', nextQuestion);
    }

    // Show the first question initially
    showQuestion(currentQuestion);
});
