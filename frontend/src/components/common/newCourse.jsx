import React, { useState } from 'react';
import axios from 'axios';
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';

function NewCourse(props) {
    const { refresh } = props;
    const [courseName, setCourseName] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8000/courses/', {
            course_name: courseName,
        });
        refresh();
        setShowForm(false);
    }

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add New Course</button>
            {showForm && (
                <ReactDialogBox
                    closeBox={() => { setShowForm(false); setCourseName(''); }}
                    modalWidth='60%'
                    headerBackgroundColor='red'
                    headerTextColor='white'
                    headerHeight='65'
                    closeButtonColor='white'
                    bodyBackgroundColor='white'
                    bodyTextColor='black'
                    bodyHeight='200px'
                    headerText='New Course'
                >
                    <form onSubmit={handleSubmit}>
                        <label>
                            Course Name:
                            <input type="text" value={courseName} onChange={(event) => setCourseName(event.target.value)} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </ReactDialogBox>
            )
            }
        </div >
    );
}

export default NewCourse;
