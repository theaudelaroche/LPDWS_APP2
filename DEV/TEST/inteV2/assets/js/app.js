// JSON MUST LOOK LIKE THIS
var quizData = {
  "questions": [{
      "text": "./assets/images/montserrat.svg",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Montserrat"
    },
    {
      "text": "./assets/images/merriweather.svg",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Merryweather"
    },
    {
      "text": "./assets/images/roboto.svg",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Roboto"
    },
    {
      "text": "./assets/images/oswald.svg",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Oswald"
    }
  ]
}

//INITIALISE QUESTIONS COMPONENT
Vue.component('question', {
  template: `
  <div class="main">
    <header>
      <span class="question-number">{{questionNumber}}/{{allQuestions}}</span>
    </header>
    <div class="game-screen">
      <div class="progress-bar" id="bar"></div>
      <div class="question">
      <img :src="question.text" alt="guess the font">
      </div>
      <div class="answers">
        <div v-for="(mcanswer,index) in question.answers">
          <div class="answer">
            <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" :value="mcanswer">
            <label :for="'answer'+index">{{mcanswer}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <a href="#" v-on:click="submitAnswer">
        <span>NEXT</span>
        <span class="arrow-container">
          <img src="assets/images/arrow.png" alt="arrow">
        </span>
      </a>
    </div>
  </div>
    `,
  data() {
    return {
      answer: ''
    }
  },
  // ALL DATAS NEEDED BY THE COMPONENT
  props: ['question', 'question-number', 'all-questions', 'percent'],
  //FUNCTIONS OF THE COMPONENT (CALLED BY V-ON:CLICK)
  methods: {
    submitAnswer: function() {
      this.$emit('answer', {
        answer: this.answer
      });
      this.answer = null;
    }
  }
});

//INITIALISE APP
var app = new Vue({
  el: '#app',
  data() {
    return {
      home: false,
      quiz: false,
      score: false,
      questions: [],
      currentQuestion: 0,
      allQuestions: 0,
      answers: [],
      correct: 0,
      message: '',
      head : '',
      percent : 0,
      show : true
    }
  },
  //LOAD JSON
  created() {
    var res = quizData;
    this.questions = res.questions;
    this.allQuestions = res.questions.length;
    this.home = true;
  },
  //ALL FUNCTIONS USED BY THE APP
  methods: {
    startQuiz() {
      this.home = false;
      this.quiz = true;
    },
    //CLICK NEXT
    handleAnswer(e) {
      //PUSH ANSWER
      this.answers[this.currentQuestion] = e.answer;
      //WHEN LAST QUESTIO
      if ((this.currentQuestion + 1) === this.questions.length) {
        document.getElementById('bar').style.width = "100%";
        // WAIT FOR THE PROGRESS BAR TO FILL CONTAINER TO CHANGE APP PAGE
        setTimeout(function(){
          app.handleResults();
          app.quiz = false;
          app.score = true;
        }, 500);
      } else {
        this.currentQuestion++;
        this.percent = (100 * this.currentQuestion+1)/this.questions.length;
        document.getElementById('bar').style.width = this.percent + "%";
      }
    },
    //CALCULATE SCORE
    handleResults() {
      this.questions.forEach((a, index) => {
        if (this.answers[index] === a.answer) this.correct++;
      });
      //CHANGE FINAL MESSAGE
      switch (this.correct) {
        case 0:
          this.head = "It Sucks";
          this.message = "You'd better leave design forever";
          break;
        case 1:
          this.head = "Eww";
          this.message = "INCREDIBLE ! Go back to work you dumb";
          break;
        case 2:
          this.head = "Not impressed";
          this.message = "Nice for a young designer. Otherwise it sucks";
          break;
        case 3:
          this.head = "Not bad";
          this.message = "Argh ! You were so close !";
          break;
        case 4:
          this.head = "Perfect";
          this.message = "WOW ! That would be excellent if you hadn't done the test 35 times...";
          break;
      }
    },
    //RELOAD QUIZ
    reload() {
      this.score = false;
      this.home = true;
      this.currentQuestion = 0;
      this.correct = 0;
    }
  }
})
