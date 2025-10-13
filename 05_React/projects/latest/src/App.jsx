import React, { useState, useEffect } from 'react';

export default function App() {
  const [konsa_page, setKonsa_page] = useState('home');
  const [saray_questions, setSaray_questions] = useState([]);
  const [current_question_number, setCurrent_question_number] = useState(0);
  const [selected_jawab, setSelected_jawab] = useState(null);
  const [total_score, setTotal_score] = useState(0);
  const [loading_chal_rahi_hai, setLoading_chal_rahi_hai] = useState(false);

  const questions_ko_fetch_karo = async () => {
    setLoading_chal_rahi_hai(true);
    const api_ka_response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
    const api_ka_data = await api_ka_response.json();
    
    const tayyar_questions = api_ka_data.results.map(sawal => {
      const saray_jawabat = [...sawal.incorrect_answers, sawal.correct_answer].sort(() => Math.random() - 0.5);
      return {
        question: sawal.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&'),
        answers: saray_jawabat,
        correct: saray_jawabat.indexOf(sawal.correct_answer)
      };
    });
    
    setSaray_questions(tayyar_questions);
    setLoading_chal_rahi_hai(false);
    setKonsa_page('quiz');
  };

  const jawab_select_karo = (index) => {
    setSelected_jawab(index);
  };

  const agla_question = () => {
    if (selected_jawab === saray_questions[current_question_number].correct) {
      setTotal_score(total_score + 1);
    }
    
    if (current_question_number < saray_questions.length - 1) {
      setCurrent_question_number(current_question_number + 1);
      setSelected_jawab(null);
    } else {
      setKonsa_page('result');
    }
  };

  const dubara_start_karo = () => {
    setKonsa_page('home');
    setCurrent_question_number(0);
    setSelected_jawab(null);
    setTotal_score(0);
    setSaray_questions([]);
  };

  // HOME PAGE
  if (konsa_page === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center transform hover:scale-105 transition-transform">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🧠</span>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Noobs ka Quiz App
          </h1>
          <p className="text-gray-600 text-lg mb-8">Apni knowledge test karo 10 sawalon ke saath!</p>
          <button 
            onClick={questions_ko_fetch_karo}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-purple-600 hover:to-pink-600 w-full transform hover:scale-105 transition-all shadow-lg"
          >
             Quiz Shuru Karo
          </button>
        </div>
      </div>
    );
  }

  // LOADING
  if (loading_chal_rahi_hai) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-white text-3xl font-bold">Questions load ho rahe hain...</div>
        </div>
      </div>
    );
  }

  // RESULT PAGE
  if (konsa_page === 'result') {
    const percentage = (total_score / saray_questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center transform hover:scale-105 transition-transform">
          <div className="text-8xl mb-6">{percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Quiz Khatam!</h2>
          <p className="text-gray-600 text-lg mb-6">
            {percentage >= 70 ? 'Zabardast! Bohat ache!' : percentage >= 50 ? 'Acha hai, or behtar kar sakte ho!' : 'Koi nahi, dobara try karo!'}
          </p>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-8">
            <div className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {total_score} / {saray_questions.length}
            </div>
            <div className="text-3xl font-bold text-gray-700">{percentage.toFixed(0)}%</div>
          </div>
          <button 
            onClick={dubara_start_karo}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-teal-600 w-full transform hover:scale-105 transition-all shadow-lg"
          >
             Dobara Try Karo
          </button>
        </div>
      </div>
    );
  }

  // QUIZ PAGE
  const current_question_ka_data = saray_questions[current_question_number];
  const progress_percentage = ((current_question_number + 1) / saray_questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
              Sawal {current_question_number + 1} / {saray_questions.length}
            </span>
            <span className="text-sm font-bold text-gray-600">
              Score: {total_score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress_percentage}%` }}
            ></div>
          </div>
        </div>

        <h3 
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: current_question_ka_data.question }}
        ></h3>
        
        <div className="space-y-4 mb-8">
          {current_question_ka_data.answers.map((jawab, index) => (
            <button
              key={index}
              onClick={() => jawab_select_karo(index)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all transform hover:scale-102 ${
                selected_jawab === index 
                  ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-102' 
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-all ${
                  selected_jawab === index 
                    ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'border-gray-300'
                }`}>
                  {selected_jawab === index && (
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-800 font-medium text-lg">{jawab}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={agla_question}
          disabled={selected_jawab === null}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
            selected_jawab !== null 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {current_question_number === saray_questions.length - 1 ? ' Khatam Karo' : '➡️ Agla Sawal'}
        </button>
      </div>
    </div>
  );
}