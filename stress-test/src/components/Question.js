import React from "react";

const answerMax = 4;
// let number = 0;

export default function Question({ number, content, onselectCallback, isMissing }) {
	let radios = [];

	const changeRadio = (e, ans) => {
		console.log("changeRadio()");
		// Make sure change was not some kind of reset
		if (e.target.checked) {
			onselectCallback(number, ans);
		}
	};

	for (let i = 0; i <= answerMax; i++) {
		radios.push(
			<input key={i} type="radio" name={`answer-${number}`} value={i} onChange={(e) => changeRadio(e, i)} />
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
