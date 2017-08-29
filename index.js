let quizKey = {
  questions: [
    {
    image: "https://farm5.staticflickr.com/4344/35658597913_41e31c27cd_q.jpg",
    answer: [
      "Abutilon theophrasti",
      "Tradescantia ohiensis", 
      "Liatris aspera", 
      "Penstemon digitalis"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4346/36298577712_c0cd477f87_q.jpg",
    answer: [
      "Cercis canadensis",
      "Salix nigra", 
      "Nyssa sylvatica", 
      "Larix laricina"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4399/36298577122_2575c3d1c2_q.jpg",
    answer: [
      "Echinacea purpurea",
      "Solidago speciosa", 
      "Rudbeckia hirta", 
      "Penstemon digitalis"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4332/35658597663_5ab8d02daa_q.jpg",
    answer: [
      "Hibiscus moscheutos",
      "Silphium perfoliatum", 
      "Liquidambar styraciflua", 
      "Penstemon digitalis"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4378/36466642235_8d4942527b_q.jpg",
    answer: [
      "Humulus lupulus",
      "Apios americana", 
      "Parthenocissus quinquefolia", 
      "Smilax glauca"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4410/35658596593_fc625119de_q.jpg",
    answer: [
      "Liriodendron tulipifera",
      "Liquidambar styraciflua", 
      "Thuja occidentalis", 
      "Platanus occidentalis"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4392/36466640675_ddd8e74c32_q.jpg",
    answer: [
      "Rudbeckia hirta",
      "Silphium perfoliatum", 
      "Solidago speciosa", 
      "Echinacea purpurea"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4357/35658594813_aaa764c942_q.jpg",
    answer: [
      "Silphium perfoliatum",
      "Symphyotrichum novae", 
      "Tradescantia ohiensis", 
      "Itea virginica"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4407/36466640125_3d99ff6a9f_q.jpg",
    answer: [
      "Solidago speciosa",
      "Tradescantia ohiensis", 
      "Echinacea purpurea", 
      "Celtis laevigata"
    ],
    correctChoiceIndex: 0,
  },
  {
    image: "https://farm5.staticflickr.com/4343/35658594233_6f75253c6c_q.jpg",
    answer: [
      "Vernonia gigantea",
      "Tradescantia ohiensis", 
      "Larix laricina", 
      "Asarum canadense"
    ],
    correctChoiceIndex: 0,
  }
  ],
  indexPos: 0,
  correctCount: 0
};

function resetQuiz() {
  quizKey.correctCount = 0;
  quizKey.indexPos = 0;
}

function startQuiz () {
  $('#start-button').click(function () {
    $('#quiz').removeClass('hidden');
    $('#start').addClass('hidden');
  });
}

function render (currentQuestionIndex) {
  let template = `<div class="question">
          <p class="text">Identify the plant based on the image.</p>
        </div>
        <div class="answers" id="js-answers">
          <label class="answer">
            <input type="radio" name="choice" class="choice" value="0">
            <span>${quizKey.questions[currentQuestionIndex].answer[0]}</span>
          </label>
          <label class="answer">
            <input type="radio" name="choice" class="choice" value="1">
            <span>${quizKey.questions[currentQuestionIndex].answer[1]}</span>
          </label>
          <label class="answer">
            <input type="radio" name="choice" class="choice" value="2">
            <span>${quizKey.questions[currentQuestionIndex].answer[2]}</span>
          </label>
          <label class="answer">
            <input type="radio" name="choice" class="choice" value="3">
            <span>${quizKey.questions[currentQuestionIndex].answer[3]}</span>
          </label>
        </div>
        
        <div class="right">
          <img class= "image" src="${quizKey.questions[currentQuestionIndex].image}" width="150" height="160" alt="Humulus lupulus"><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
        </div>
        <div class="status-question">
            <p class="question">Current Question: ${quizKey.indexPos + 1}/${quizKey.questions.length}</p>
          </div>
          <div class="status-score">
            <p class="score">Current Score: ${quizKey.correctCount}/${quizKey.questions.length}</p>
        </div>`;
  $('.question-container').html(template);
}

function answerSubmit () {
  $('#button').click(function (e) {
    e.preventDefault();
    var userChoice = $('input:checked').val();
    answerCheck(userChoice);
    if (quizKey.indexPos === quizKey.questions.length) {
      renderResults();
    }
  });
}

function answerCheck (userChoice) {
  var correctChoice = quizKey.questions[quizKey.indexPos].correctChoiceIndex;
  if(typeof userChoice !== 'undefined' && parseInt(userChoice) === correctChoice){
    quizKey.correctCount++;
    renderFeedback(true);
    quizKey.indexPos++;}
  else if (typeof userChoice !== 'undefined') {
    renderFeedback(false);
    quizKey.indexPos++;
  } 
  else {
    renderFeedback('unanswered');
  }
  if (quizKey.indexPos === quizKey.questions.length) {
    renderResults();
  }
  else {
    render(quizKey.indexPos);
  }
}

function renderFeedback (isValid) {
  var feedback = $('.popup-inner');
  if (isValid == 'unanswered') {
    feedback.find('h2').text('Please make a selection to continue.'); 
  }
  else if (isValid){
    feedback.find('h2').text('Correct!');
  } 
  else if (!isValid) {
    feedback.find('h2').text('Sorry, that wasn\'t correct.');
  } 
}

function renderResults () {
    $('#results').removeClass('hidden');
    $('#quiz').addClass('hidden');
    template2 = `<div class="pass-fail-message text">
        <h4>${endStatement()}</h4>
      </div>
      <div class="percent-correct">
        <p>You got ${quizKey.correctCount} out of ${quizKey.questions.length} correct.</p>
      </div>
      <div class="next">
        <input type="button" value="Restart" id="restart">
      </div>`;
  $('#results').html(template2);
  quizRestart();
}

function endStatement () {
  if (quizKey.correctCount >= 7) {
    return "Congrats! You have a phenomenal score!";
  }
  else {
    return "I'm really disappointed in you...";
  }
}

function quizRestart() {
  $('#restart').on('click', function () {
    $('#quiz').removeClass('hidden');
    $('#results').addClass('hidden');
    resetQuiz();
    render(quizKey.indexPos);
  });
}

function handleQuizFxn() {
  startQuiz();
  render(quizKey.indexPos);
  answerSubmit();
  answerCheck();
}

$(handleQuizFxn);