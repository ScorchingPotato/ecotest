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
        let totalscore = 0;
        const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
        radioButtons.forEach((radioButton) => {
            totalscore += Number(radioButton.value);
        });
        const checkButtons = document.querySelectorAll('input[type="checkbox"]:checked');
        checkButtons.forEach((checkButton) => {
            totalscore += Number(checkButton.value);
        });
        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach((slider) => {
            totalscore += Number(slider.value)*Number(slider.dataset.mult);
        });
    
        let response = "";
        let response_color = "000000";
        console.log(totalscore,"tons")
    
        if (totalscore < 1500) {
            response = "Tikras klimato aktyvistas!";
            response_color = "#14b373";
        } else if (totalscore < 4600) {
            response = "Šaunuolis, tavo Co2 emisija yra mažesnė už vidutinio žmogaus";
            response_color = "#4cb314";
        } else if (totalscore < 5000) {
            response = "Tavo Co2 emisija yra tokia pat kaip vidutinio žmogaus";
            response_color = "#b0b017";
        } else {
            response = "Tavo Co2 emisija yra labai didelė lyginant su vidutiniu žmogumi";
            response_color = "#a83116";
        }
    
        const modal = document.getElementById('resultsModal');
        const sourcesDiv = document.getElementById('sourcediv');
        const resultheading = document.getElementById("resultheading");
        const resulttext = document.getElementById('results');
        const footprinttext = document.getElementById('footprint');
        resultheading.innerHTML = "Rezultatai"
        resulttext.innerHTML = response;
        footprinttext.innerHTML = `~${totalscore} tonų anglies dioksido`
        resulttext.style.color = response_color;
        footprinttext.style.color = response_color;
        modal.style.display = "block";
        const closeButton = document.getElementsByClassName("closeButton")[0];

        while(sourcesDiv.firstChild) { 
            sourcesDiv.removeChild(sourcesDiv.firstChild); 
        } 

        closeButton.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                totalscore=0;
            }
        }
    }
    

    // Attach event listeners to all "Next" buttons
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`nextButton${i}`).addEventListener('click', nextQuestion);
    }

    // Show the first question initially
    showQuestion(currentQuestion);

    let sourceopen = false;
    function showSources() {
        const resultheading = document.getElementById("resultheading");
        const resulttext = document.getElementById('results');
        const footprinttext = document.getElementById('footprint');
        const sourceDiv = document.getElementById('sourcediv');
        resultheading.innerHTML = "Šaltiniai"
        resulttext.innerHTML = ''
        footprinttext.innerHTML = ''
        var link1 = document.createElement("a");
        link1.href = "https://www.carbonfootprint.com/energyconsumption.html"; link1.innerHTML = "Namų prietaisų Co2 pėdsako lentelė <br>"
        var link2 = document.createElement("a");
        link2.href = "https://skoot.eco/articles/carbon-footprint-of-everyday-things"; link2.innerHTML = "Kasdienybės Co2 pėdskas, straipsnis <br>"
        var link3 = document.createElement("a");
        link3.href = "https://createfashionbrand.com/carbon-footprint/"; link3.innerHTML = "Tekstilės Co2 pėdskas, straipsnis <br>"
        var link4 = document.createElement("a");
        link4.href = "https://www.worldometers.info/co2-emissions/co2-emissions-by-country/"; link4.innerHTML = "Planetos Co2 emisijų statistika <br>"
        sourceDiv.appendChild(link1);
        sourceDiv.appendChild(link2);
        sourceDiv.appendChild(link3);
        sourceDiv.appendChild(link4);
    };

    const sourcesbutton = document.getElementById('sources')
    sourcesbutton.addEventListener('click', () => {
        if (!sourceopen){
            showSources();
            sourceopen = true;
        } else{
            showResults();
            sourceopen = false;
        }
        
    })
});

function updateSliderValue(slider, slidervalue) {
    slider.addEventListener('input', function() {
        slidervalue.innerHTML = slider.value;
    });
}
const slider7 = document.getElementById("q7-slider");
const slidervalue7 = document.getElementById("rangeIndicator7");
updateSliderValue(slider7, slidervalue7);

const slider1 = document.getElementById("q1-slider");
const slidervalue1 = document.getElementById("rangeIndicator1");
updateSliderValue(slider1, slidervalue1);
