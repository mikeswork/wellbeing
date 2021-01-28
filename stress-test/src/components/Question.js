import React from "react";

const answerMax = 4;
// let number = 0;

export default function Question({ number, content, onselectCallback, isMissing }) {
	let radios = [];

	const clickRadio = (e, ans) => {
		console.log("clickRadio()");
		// Make sure radio element is checked
		if (e.target.checked) {
			onselectCallback(number, ans);
		}
	};

	for (let i = 0; i <= answerMax; i++) {
		radios.push(
			<input key={i} type="radio" name={`answer-${number}`} value={i} onClick={(e) => clickRadio(e, i)} />
		);
	}

	const currStyle = isMissing ? { color: "red" } : {};

	return (
		<li className="radio-question" style={currStyle}>
			<label htmlFor={`answer-${number}`}>
				{content}
				{radios}
			</label>
		</li>
	);
}
