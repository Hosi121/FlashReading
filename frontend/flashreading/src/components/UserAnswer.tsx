import React, { useState } from "react";
import "./UserAnswer.css";
interface UserAnswerProps {
  correctWords: string[]; // 赤く表示する単語群　　App.tsxからpropsとしてもらう
}
const UserAnswer: React.FC<UserAnswerProps> = ({ correctWords }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const highlightText = (text: string, word: string) => {
    const regex = new RegExp(`(${word})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      word.toLowerCase() === part.toLowerCase() ? (
        <span key={index} style={{ color: "red" }}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };
  //const 関数名 = (引数) => {関数の処理;};
  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
  };
  // correctWords の全てが使われたらコンポーネントを非表示にする
  if (currentWordIndex >= correctWords.length) {
    return null;
  }

  return (
    <div className="container-column">
      <div className="big-background">
        <div className="big-squares">
          <div className="big-square">
            {highlightText("This is a banana.", correctWords[currentWordIndex])}
          </div>
        </div>
      </div>
      <div className="small-background">
        <div className="small-squares">
          <button className="small-square" onClick={handleNextWord}>
            りんご
          </button>
          <button className="small-square" onClick={handleNextWord}>
            ブドウ
          </button>
          <button className="small-square" onClick={handleNextWord}>
            みかん
          </button>
          <button className="small-square" onClick={handleNextWord}>
            いちご
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAnswer;

//残りの実装する機能
//correctwordsをchatgptに渡し，問題文と選択肢を作ってもらう（他の人が作ったコンポーネントからもらうかも）
//赤い単語の前に空白を正しく入れる
//このファイルに書くことじゃないが，App.tcxでpropsとして入力単語をもらえるようにする
//ボタンが押された時，正解だったかどうかを保存する
//問題が終了した後，解答ページに移る（正解だったかどうかの情報を渡す）
