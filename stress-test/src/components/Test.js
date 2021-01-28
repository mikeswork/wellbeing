import React, { useState, useRef } from "react";
import Question from "./Question";

export default function Test({ instructions, questions }) {
	// const [ answers, setAnswers ] = useState({});
	const [missing, setMissing] = useState();
	const [answers, setAnswers] = useState({});
	const formRef = useRef();

	const selectAnswer = (num, answer) => {
		setAnswers((currAnswers) => {
			const newAnswers = {};
			newAnswers[num] = answer;
			return Object.assign({}, currAnswers, newAnswers);
		});
	};

	const submitAnswers = (e) => {
		e.preventDefault();

		if (Object.keys(answers).length === questions.length) {
			formRef.current.reset();
			setMissing(false);
			setAnswers({});
			alert("All complete");
		} else {
			setMissing(true);
		}
	};

	return (
		<div className="test-main">
			<form ref={formRef}>
				{instructions && <h2>Instructions:</h2>}
				<p className="test-instructions">{instructions}</p>

				<ol>
					{questions.map((q, indx) => (
						<Question
							key={indx}
							number={indx}
							content={q.content}
							onselectCallback={selectAnswer}
							isMissing={missing && answers[indx] === undefined}
						/>
					))}
				</ol>

				<input type="submit" onClick={submitAnswers} />
			</form>
		</div>
	);
}
