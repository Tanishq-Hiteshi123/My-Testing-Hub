import mongoose from 'mongoose';

export const generateRandomQuestionsForMCQ = (
  questionBank: mongoose.Types.ObjectId[],
  noOfQuestions: number
) => {
  let tempQuestions = [...questionBank];
  let selectedQuestions = [];

  for (let i = 0; i < noOfQuestions; i++) {
    let randomIndex = Math.floor(Math.random() * tempQuestions.length);

    selectedQuestions.push(tempQuestions[randomIndex]);

    // Remove the random Index value from the array :-
    tempQuestions.splice(randomIndex, 1);
  }

  console.log('Printing the selectedQuestions ', selectedQuestions);
  return selectedQuestions;
};
