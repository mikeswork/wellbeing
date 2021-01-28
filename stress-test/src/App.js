import "./App.css";
import Test from "./components/Test";
import data from "./data/questions.json";

function App() {
	return (
		<div className="App">
			<Test instructions={data.instructions} questions={data.questions} />
		</div>
	);
}

export default App;
