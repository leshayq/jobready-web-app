import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { findOneQuestion } from "../api/questions/questions";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

export const useQuestionDetail = () => {
  const [question, setQuestion] = useState(null);
  const [visible, setVisible] = useState(false);
  const { questionId } = useParams();
  const codeRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const found = await findOneQuestion(questionId);

      if (found) {
        setQuestion(found.data.data);
      }
    };

    load();
  }, [questionId]);

  useEffect(() => {
    if (visible && codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [visible, question]);

  return { question, visible, setVisible, codeRef };
};
