import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
    // State to store the list of courses
    // Removed 'name' property as per user request
    const [courses, setCourses] = useState([
        { id: 1, credits: 3, grade: 'A' } // Initial course without name
    ]);
    // State to store the calculated GPA
    const [gpa, setGpa] = useState(0.0);

    // useEffect hook to re-calculate GPA whenever courses change
    useEffect(() => {
        calculateGpa();
    }, [courses]);

    // Function to handle changes in course input fields
    const handleCourseChange = (id, field, value) => {
        setCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === id ? {...course, [field]: value } : course
            )
        );
    };

    // Function to add a new course
    const addCourse = () => {
        setCourses(prevCourses => [
            ...prevCourses,
            { id: prevCourses.length ? Math.max(...prevCourses.map(c => c.id)) + 1 : 1, credits: 3, grade: 'A' } // New course without name
        ]);
    };

    // Function to remove a course
    const removeCourse = (id) => {
        setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    };

    // Function to convert letter grade to grade points
    const getGradePoints = (grade) => {
        switch (grade) {
            case 'A':
                return 4.0;
            case 'A-':
                return 3.7;
            case 'B+':
                return 3.3;
            case 'B':
                return 3.0;
            case 'B-':
                return 2.7;
            case 'C+':
                return 2.3;
            case 'C':
                return 2.0;
            case 'C-':
                return 1.7;
            case 'D+':
                return 1.3;
            case 'D':
                return 1.0;
            case 'F':
                return 0.0;
            default:
                return 0.0;
        }
    };

    // Function to calculate the GPA
    const calculateGpa = () => {
        let totalGradePoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const credits = parseFloat(course.credits);
            const gradePoints = getGradePoints(course.grade);

            if (!isNaN(credits) && credits > 0) {
                totalGradePoints += credits * gradePoints;
                totalCredits += credits;
            }
        });

        if (totalCredits > 0) {
            setGpa((totalGradePoints / totalCredits).toFixed(2));
        } else {
            setGpa(0.0);
        }
    };

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 font-inter" >
        <
        div className = "bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-4xl border border-gray-200" >
        <
        h1 className = "text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight" > GPA Calculator < /h1>

        <
        div className = "space-y-4 mb-6" > {
            courses.map((course, index) => ( <
                div key = { course.id }
                className = "flex flex-col md:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100" > { /* Flex-grow div now has 2 columns instead of 3 as course name is removed */ } <
                div className = "flex-grow w-full md:w-auto grid grid-cols-1 md:grid-cols-2 gap-3" > { /* Credits Input */ } <
                div >
                <
                label htmlFor = { `credits-${course.id}` }
                className = "block text-sm font-medium text-gray-700 mb-1" > Credits < /label> <
                input type = "number"
                id = { `credits-${course.id}` }
                value = { course.credits }
                onChange = {
                    (e) => handleCourseChange(course.id, 'credits', parseFloat(e.target.value)) }
                min = "1"
                step = "0.5"
                className = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /
                >
                <
                /div> { /* Grade Select */ } <
                div >
                <
                label htmlFor = { `grade-${course.id}` }
                className = "block text-sm font-medium text-gray-700 mb-1" > Grade < /label> <
                select id = { `grade-${course.id}` }
                value = { course.grade }
                onChange = {
                    (e) => handleCourseChange(course.id, 'grade', e.target.value) }
                className = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" >
                <
                option value = "A" > A(4.0) < /option> <
                option value = "A-" > A - (3.7) < /option> <
                option value = "B+" > B + (3.3) < /option> <
                option value = "B" > B(3.0) < /option> <
                option value = "B-" > B - (2.7) < /option> <
                option value = "C+" > C + (2.3) < /option> <
                option value = "C" > C(2.0) < /option> <
                option value = "C-" > C - (1.7) < /option> <
                option value = "D+" > D + (1.3) < /option> <
                option value = "D" > D(1.0) < /option> <
                option value = "F" > F(0.0) < /option> <
                /select> <
                /div> <
                /div> { /* Remove Course Button */ } {
                    courses.length > 1 && ( <
                        button onClick = {
                            () => removeCourse(course.id) }
                        className = "mt-4 md:mt-0 md:ml-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
                        title = "Remove Course" >
                        <
                        svg className = "w-5 h-5"
                        fill = "none"
                        stroke = "currentColor"
                        viewBox = "0 0 24 24"
                        xmlns = "http://www.w3.org/2000/svg" >
                        <
                        path strokeLinecap = "round"
                        strokeLinejoin = "round"
                        strokeWidth = "2"
                        d = "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" > < /path> <
                        /svg> <
                        /button>
                    )
                } <
                /div>
            ))
        } <
        /div>

        { /* Add Course Button */ } <
        button onClick = { addCourse }
        className = "w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl mb-6" >
        <
        svg className = "w-5 h-5 mr-2"
        fill = "none"
        stroke = "currentColor"
        viewBox = "0 0 24 24"
        xmlns = "http://www.w3.org/2000/svg" >
        <
        path strokeLinecap = "round"
        strokeLinejoin = "round"
        strokeWidth = "2"
        d = "M12 6v6m0 0v6m0-6h6m-6 0H6" > < /path> <
        /svg>
        Add Course <
        /button>

        { /* GPA Display */ } <
        div className = "mt-8 pt-6 border-t-2 border-gray-200 text-center" >
        <
        p className = "text-2xl md:text-3xl font-semibold text-gray-700" > Your Current GPA: < /p> <
        p className = "text-5xl md:text-6xl font-extrabold text-blue-700 mt-2" > { gpa } <
        /p> <
        /div> <
        /div> { /* Tailwind CSS Script - For local development, this would be part of your build process */ } <
        script src = "https://cdn.tailwindcss.com" > < /script> <
        /div>
    );
};

export default App;