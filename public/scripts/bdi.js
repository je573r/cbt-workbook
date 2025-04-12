const questions = [
    { text: "Do I feel sad?", options: ["Not at all.", "I do feel sad.", "I am sad all the time and I can't snap out of it.",
                                     "I am so sad and unhappy that I can't stand it."], answer: null },
    { text: "Do I feel hopeless about the future?", options: ["Not at all.", "I do feel discouraged about the future.", 
                                                           "I feel I have nothing to look forward to.", 
                                                           "I feel the future is hopeless and that things cannot improve."], answer: null },
    { text: "Do I feel like a failure?", options: ["Not at all.", "I feel I have failed more than the average person.",
                                                "As I look back on my life, all I can see is a lot of failures.",
                                                "I feel I am a complete failure as a person."], answer: null },
    { text: "Do I feel satisfied?", options: ["I get as much satisfaction out of things as I used to.", 
                                             "I don't enjoy the things the way I used to.", 
                                             "I don't get real satisfaction out of anything anymore.", 
                                             "I am dissatisfied or bored with everything."], answer: null },
    { text: "Do I feel guilty?", options: ["I don't feel particularly guilty", 
                                           "I feel guilty a good part of the time.", 
                                           "I feel quite guilty most of the time.", 
                                           "I feel guilty all of the time."], answer: null },
    { text: "Am I being punished or do I deserve to be?", options: ["I don't feel I am being punished.", 
                                              "I feel I may be punished.", 
                                              "I expect to be punished.", 
                                              "I feel I am being punished."], answer: null },
    { text: "Do I feel disappointed or disguisted?", options: ["I don't feel disappointed in myself.", 
                                                "I am disappointed in myself.", 
                                                "I am disgusted with myself.", 
                                                "I hate myself."], answer: null },
    { text: "Do I loathe myself?", options: ["I don't feel I am any worse than anybody else.",
                                            "I am critical of myself for my weaknesses or mistakes.", 
                                            "I blame myself all the time for my faults.", 
                                            "I blame myself for everything bad that happens."], answer: null },
    { text: "How often do I think about not wanting to live?", options: ["I don't have any thoughts of killing myself.", 
                                            "I have thoughts of killing myself, but I would not carry them out.", 
                                            "I would like to kill myself. ", 
                                            "I would kill myself if I had the chance."], answer: null },
    { text: "How often do I cry?", options: ["I don't cry any more than usual.", 
                                            "I cry more now than I used to.", 
                                            "I cry all the time now. ", 
                                            "I used to be able to cry, but now I can't cry even though I want to."], answer: null },
    { text: "How is my level of frustration?", options: ["I am no more irritated by things than I ever was. ", 
                                            "I am slightly more irritated now than usual. ", 
                                            "I am quite annoyed or irritated a good deal of the time. ", 
                                            "I feel irritated all the time. "], answer: null },
    { text: "Am I interested in social activities as I used to be?", options: ["I have not lost interest in other people. ", 
                                            "I am less interested in other people than I used to be. ", 
                                            "I have lost most of my interest in other people. ", 
                                            "I have lost all of my interest in other people. "], answer: null },
    { text: "Is it hard for me to make decisions?", options: ["I make decisions about as well as I ever could. ", 
                                            "I put off making decisions more than I used to. ", 
                                            "I have greater difficulty in making decisions more than I used to. ", 
                                            "I can't make decisions at all anymore. "], answer: null },
    { text: "How do I feel about my appearance?", options: ["I don't feel that I look any worse than I used to.", 
                                            "I am worried that I am looking old or unattractive. ", 
                                            "I feel there are permanent changes in my appearance that make me look unattractive.", 
                                            "I believe that I look ugly."], answer: null },
    { text: "Am I as efficient as I used to be?", options: ["I can work about as well as before. ", 
                                            "It takes an extra effort to get started at doing something.", 
                                            "I have to push myself very hard to do anything. ", 
                                            "I can't do any work at all."], answer: null },
    { text: "Any changes in my sleep patterns?", options: ["I can sleep as well as usual.", 
                                            "I don't sleep as well as I used to. ", 
                                            "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep. ", 
                                            "I wake up several hours earlier than I used to and cannot get back to sleep. "], answer: null },
    { text: "How much energy do I have?", options: ["I don't get more tired than usual. ", 
                                            "I get tired more easily than I used to. ", 
                                            "I get tired from doing almost anything.", 
                                            "I am too tired to do anything."], answer: null },
    { text: "Any changes in my appetite?", options: ["My appetite is no worse than usual. ", 
                                            "My appetite is not as good as it used to be. ", 
                                            "My appetite is much worse now. ", 
                                            "I have no appetite at all anymore. "], answer: null },
    { text: "Any changes in my weight?", options: ["I haven't lost much weight, if any, lately. ", 
                                            "I have lost more than five pounds. ", 
                                            "I have lost more than ten pounds.", 
                                            "I have lost more than fifteen pounds."], answer: null },
    { text: "Have I become too health conscious?", options: ["I am no more worried about my health than usual. ", 
                                            "I am worried about physical problems like aches, pains, upset stomach, or constipation.", 
                                            "I am very worried about physical problems and it's hard to think of much else. ", 
                                            "I am so worried about my physical problems that I cannot think of anything else."], answer: null },
    { text: "What about my libido?", options: ["I have not noticed any recent change in my interest in sex.", 
                                            "I am less interested in sex than I used to be.", 
                                            "I have almost no interest in sex.", 
                                            "I have lost interest in sex completely."], answer: null },
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = question.text;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        optionsContainer.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${index}" ${question.answer === index ? 'checked' : ''} onclick="markAnswer(${currentQuestionIndex}, ${index})">
                ${option}
            </label>
        `;
    });
    document.getElementById("progress-bar").style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    updateQuestionStatus();
    updateNavigationButtons();
}

function markAnswer(qIndex, optionIndex) {
    questions[qIndex].answer = optionIndex;
    updateQuestionStatus();
}

function updateQuestionStatus() {
    const statusContainer = document.getElementById("question-status");
    statusContainer.innerHTML = "";
    
    for (let i = 0; i < questions.length; i++) {
        let className = "default";
        if (i === currentQuestionIndex) className = "current";
        else if (questions[i].answer !== null) className = "answered";
        
        statusContainer.innerHTML += `
            <button onclick="jumpToQuestion(${i})" class="px-4 py-2 rounded-lg ${className} transition">
                ${i + 1}
            </button>
        `;
    }
}

function updateNavigationButtons() {
    document.getElementById("prev-btn").style.display = currentQuestionIndex === 0 ? "none" : "block";
    document.getElementById("next-btn").innerText = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}

function jumpToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
}

document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

loadQuestion();