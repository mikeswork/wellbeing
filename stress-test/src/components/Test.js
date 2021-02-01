import React, { useState } from "react";
import Question from "./Question";

const blanks = (items) => {
    return items.map(() => undefined);
}

export default function Test({ instructions, questions }) {
	const [missing, setMissing] = useState();
	const [answers, setAnswers] = useState(blanks(questions));

	const selectAnswer = (num, answer) => {
		setAnswers((currAnswers) => {
            let newAnswers = [...currAnswers];
            newAnswers[num] = answer;

            return newAnswers;
		});
	};

	const submitAnswers = (e) => {
		e.preventDefault();

        if (answers.every(a => a !== undefined)) {
			setMissing(false);
			setAnswers(blanks(questions));
			console.info("All complete! Resetting.");
        } else {
            console.log(answers)
			setMissing(true);
		}
	};

	return (
		<div className="test-main">
			<form>
				{instructions && <h2>Instructions:</h2>}
				<p className="test-instructions">{instructions}</p>

				<ol>
					{answers.map((a, indx) => (
						<Question
							key={indx}
							number={indx}
							content={questions[indx].content}
                            onselectCallback={selectAnswer}
                            checkIndex={a}
							highlight={missing && a === undefined}
						/>
					))}
				</ol>

				<input type="submit" onClick={submitAnswers} />
			</form>
		</div>
	);
}
