import React, { useState } from "react";
import Question from "./Question";

const blanks = (items) => {
	return items.map(() => undefined);
};

export default function Test({ instructions, questions }) {
	const [missing, setMissing] = useState();
	const [answers, setAnswers] = useState(blanks(questions));
	const [score, setScore] = useState();

	const selectAnswer = (num, answer) => {
		setAnswers((currAnswers) => {
			let newAnswers = [...currAnswers];
			newAnswers[num] = answer;

			return newAnswers;
		});
	};

	const submitAnswers = (e) => {
		e.preventDefault();

		if (answers.every((a) => a !== undefined)) {
			const score = answers.reduce((a, b) => a + b);
			console.info("All complete! Score is", score);

			setMissing(false);
            setScore(score);
		} else {
			console.log(answers);
			setMissing(true);
		}
	};

    let scoreString = "";
    if (score !== undefined) {
        if (score < 14) scoreString = "Scores ranging from 0-13 are considered low stress.";
        else if (score < 27) scoreString = "Scores ranging from 14-26 are considered moderate stress.";
        else scoreString = "Scores ranging from 27-40 are considered high perceived stress.";
    }

	return (
		<div className="test-main">
			{score || score === 0 ? (
				<>
                    <div>Your score is: {score}</div>
                    <div>{scoreString}</div>
                </>
			) : (
				<form>
					{instructions && <h2>Instructions:</h2>}
					<p className="test-instructions">{instructions}</p>

					<ol>
						{answers.map((a, indx) => (
							<Question
								key={indx}
								number={indx}
								content={questions[indx].content}
								reversePoints={questions[indx].reversePoints}
								onselectCallback={selectAnswer}
								checkIndex={a}
								highlight={missing && a === undefined}
							/>
						))}
					</ol>

					<input type="submit" onClick={submitAnswers} />
				</form>
			)}
		</div>
	);
}
