import React, { useState } from 'react';
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createCourse } from '../../api';

function NewCourse(props) {
    const { refresh } = props;
    const [courseName, setCourseName] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCourse(courseName);
        refresh();
        setShowForm(false);
        toast("Success!");
    }

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add New Course</button>
            <ToastContainer />
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
