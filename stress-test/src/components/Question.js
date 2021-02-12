import React from "react";

const answerMax = 4;

export default function Question({ number, content, reversePoints, onselectCallback, checkIndex, highlight }) {
	let points = [];
    let radios = [];

	const changeRadio = (e, ans) => {
		console.log("changeRadio()");
		// Make sure radio element is checked
		if (e.target.checked) {
			onselectCallback(number, ans);
		}
	};

    for (let i = 0; i <= answerMax; i++) {
        points.push(i);
    }

    if (reversePoints) points.reverse();

	points.forEach(pnt => {
		radios.push(
			<input
				key={pnt}
				type="radio"
				name={`answer-${number}`}
				value={pnt}
				checked={checkIndex === pnt}
				onChange={(e) => changeRadio(e, pnt)}
			/>
		);
	})

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
