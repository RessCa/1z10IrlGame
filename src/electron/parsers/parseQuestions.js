export function parseQuestions(json) {
  if (!Array.isArray(json)) throw new Error("Nieprawidłowa struktura JSON (pytania)");

  return json.map((item, idx) => {
    if (!item.category || !item.question || !item.answer) {
      throw new Error(`Brakuje podstawowych pól w pytaniu nr ${idx + 1}`);
    }

    return {
      category: item.category,
      question: item.question,
      answer: item.answer,
      answerA: item.answerA || null,
      answerB: item.answerB || null,
      answerC: item.answerC || null,
      answerD: item.answerD || null,
    };
  });
}
