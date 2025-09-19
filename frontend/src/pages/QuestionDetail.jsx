import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { NotFoundPage } from "../components/404";
import { Loader } from "../components/Loader";
import { DifficultyTag } from "../components/DifficultyTag";
import { useQuestionDetail } from "../hooks/useQuestionDetail";
import "highlight.js/styles/atom-one-dark.css";

export const QuestionDetail = () => {
  const { question, visible, setVisible, codeRef } = useQuestionDetail();

  if (!question) {
    return <Loader></Loader>;
  }

  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <div className="!mx-5 overflow-hidden flex bg-white rounded-3xl shadow-lg p-6 flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <DifficultyTag difficulty={question.difficulty}></DifficultyTag>
          <h3 className="font-bold text-7xl text-left">{question.title}</h3>
        </div>
        <div className="flex gap-3">
          {question.tags.map((tag) => (
            <div className="mt-4 flex flex-wrap gap-2" key={tag.id}>
              <span className="bg-[var(--primary-color)] text-white text-xs px-3 py-1 rounded-full">
                {tag.title}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleClick()}
          className="!font-medium !mr-auto !mt-5 text-[var(--faded-text-color)] no-underline hover:underline cursor-pointer"
        >
          {visible ? "Сховати відповідь" : "Показати відповідь"}
          {!visible && (
            <FontAwesomeIcon icon={faAngleDown} className="ml-0.5" />
          )}

          {visible && <FontAwesomeIcon icon={faAngleUp} className="ml-0.5" />}
        </button>
        {/* TODO: сделать подсветку разных языков */}
        {visible && (
          <div className="mt-5">
            <p>{question.answer.text}</p>
            {question.answer.code ? (
              <pre className="mt-5">
                <code ref={codeRef} className="language-javascript">
                  {question.answer.code}
                </code>
              </pre>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
