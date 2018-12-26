var quizData = {
  "questions": [{
      "text": "Montserrat",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Montserrat"
    },
    {
      "text": "Merryweather",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Merryweather"
    },
    {
      "text": "Roboto",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Roboto"
    },
    {
      "text": "Oswald",
      "type": "mc",
      "answers": ["Montserrat", "Merryweather", "Roboto", "Oswald"],
      "answer": "Oswald"
    }
  ]
}

Vue.component('question', {
  template: `
  <div class="main">
    <header>
      <span class="question-number">{{questionNumber}}/{{allQuestions}}</span>
    </header>
    <div class="game-screen">
      <div class="progress-bar"></div>
      <div class="question">
        <p>{{ question.text }} </p>
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
        <span class="arrow-container"></span>
      </a>
    </div>
  </div>
    `,
  data() {
    return {
      answer: ''
    }
  },
  props: ['question', 'question-number', 'all-questions'],
  methods: {
    submitAnswer: function() {
      this.$emit('answer', {
        answer: this.answer
      });
      this.answer = null;
    }
  }
});

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
    }
  },
  created() {
    var res = quizData;
    this.questions = res.questions;
    this.allQuestions = res.questions.length;
    this.home = true;
  },
  methods: {
    startQuiz() {
      this.home = false;
      this.quiz = true;
    },
    handleAnswer(e) {
      this.answers[this.currentQuestion] = e.answer;
      if ((this.currentQuestion + 1) === this.questions.length) {
        this.handleResults();
        this.quiz = false;
        this.score = true;
      } else {
        this.currentQuestion++;
      }
    },
    handleResults() {
      this.questions.forEach((a, index) => {
        if (this.answers[index] === a.answer) this.correct++;
      });
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
    reload() {
      this.score = false;
      this.home = true;
      this.currentQuestion = 0;
      this.correct = 0;
    }
  }
})
