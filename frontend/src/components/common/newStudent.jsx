import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';

function NewCourse(props) {
    const { refresh } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [maxBirthDate, setMaxBirthDate] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8000/students', {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            email_address: email,
        });
        refresh();
        setShowForm(false);
    };

    useEffect(() => {
        // Student must be atleast 10 years old
        let earlierDate = new Date();
        earlierDate.setFullYear(earlierDate.getFullYear() - 10);
        setMaxBirthDate(earlierDate.toISOString().slice(0, 10));
    }, []);

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add New Student</button>
            {showForm && (
                <ReactDialogBox
                    closeBox={() => { setShowForm(false); setFirstName(''); }}
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
                        <div>
                            <label>
                                First Name:
                                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Family Name:
                                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Date of Births:
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(event) => setDateOfBirth(event.target.value)}
                                    required
                                    max={maxBirthDate}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Email:
                                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                            </label>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </ReactDialogBox>
            )
            }
        </div >
    );
}

export default NewCourse;
