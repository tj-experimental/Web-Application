//Create questions

var questions = [
new Question("What is your most price pocession", ['learning','giving'] ,"learning"),
new Question("When is your birthday", ['June 8','June 20'] ,"June 8"),
new Question("What year did you get your citzenship",[2013, 2015], 2015),
new Question("What is your favourite animal",["dog","cat"], "dog"),
new Question("What college did you attend", ["Fleming College", "Senneca College"],"Fleming College")
]

var quiz = new Quiz(questions);

//
QuizUI.displayNext();
