import React from "react";

const answerMax = 4;

export default function Question({ number, content, onselectCallback, checkIndex, highlight }) {
	let radios = [];

	const changeRadio = (e, ans) => {
		console.log("changeRadio()");
		// Make sure radio element is checked
		if (e.target.checked) {
			onselectCallback(number, ans);
		}
	};

	for (let i = 0; i <= answerMax; i++) {
		radios.push(
			<input
				key={i}
				type="radio"
				name={`answer-${number}`}
				value={i}
				checked={checkIndex === i}
				onChange={(e) => changeRadio(e, i)}
			/>
		);
	}

	const currStyle = highlight ? { color: "red" } : {};

	return (
		<li className="radio-question" style={currStyle}>
			<label htmlFor={`answer-${number}`}>
				{content}
				{radios}
			</label>
		</li>
	);
}
