document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll('.question');
    const totalQuestions = questions.length;
    let currentQuestion = 0;

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
        // Placeholder content for results
        const resultsContent = `
            <p>Čia bus jūsų rezultatai...</p>
        `;
    
        // Display results in the modal
        const modal = document.getElementById('resultsModal');
        const resultsDiv = document.getElementById('resultsContent');
        resultsDiv.innerHTML = resultsContent;
        modal.style.display = "block";
    
        // Close the modal when the close button is clicked
        const closeButton = document.getElementsByClassName("closeButton")[0];
        closeButton.onclick = function() {
            modal.style.display = "none";
        }
    
        // Close the modal when clicking outside of it
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
