import { Routes, Route } from "react-router-dom";
import Courses from "./pages/courses";
import Students from "./pages/students";
import CourseResults from "./pages/courseResults";
import Home from "./pages/home";
import "./app.css";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/students" element={<Students />} />
				<Route path="/course-results" element={<CourseResults />} />
				<Route path="/courses" element={<Courses />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
