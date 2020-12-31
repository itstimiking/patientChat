import axios from 'axios';

  
export const loginPatient = async (payload) => {//--------------------------- LOGIN ROOT USER -------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/auth/patients/login", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: payload.email,
			password: payload.password
	 	})
	});

    const user = await res.json()
	
	return user;
}



export const passwordReset = async (email) => {// ----------------------- PASSWORD RESET REQUEST ----------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/root/requestpasswordreset", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email
	 	})
	});

    const passwordResetStatus = await res.json();
	return passwordResetStatus;
}


export const passwordResetWithKey = async (payload) => {// ----------------------- PASSWORD RESET ----------------

    const res = await fetch(`http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/root/resetpasword/${payload.key}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			password: payload.password
	 	})
	});

    const passwordResetStatus = await res.json();
	return passwordResetStatus;
}


export const getPractice = async (token) => {// ----------------------- PASSWORD RESET ----------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/practices",{
    	method: 'GET',
    	headers: {"Authorization": token}
	});
	
	const data = await res.json();
	return data;
}

export const approvePractice = async (url, token) => {// ----------------------- APPROVE PRACTICE PATCH ----------------
	
    const res = await fetch(url, { 
    	method: 'PATCH',
  		headers: [["Authorization", token], ["Content-Type", "application/json"] ],
  		body: JSON.stringify({ approvalStatus: "approved" })
  	});


    const data = await res.json();
	return data;
}

export const rejectPractice = async (url, token) => {// ----------------------- REJECT PRACTICE PATCH ----------------

    const res = await fetch(url,{
    	method: 'PATCH',
    	headers: [["Authorization", token], ["Content-Type", "application/json"] ],
    	body:JSON.stringify({
			approvalStatus: "rejected"
		})
    });

    const data = await res.json();
	return data;
}















export const loginPractice = async (payload) => {//--------------------------- LOGIN PRACTICE -------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/auth/practices/login", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: payload.email,
			password: payload.password
	 	})
	});

    const user = await res.json();
	return user;
}


export const practicePasswordReset = async (email) => {// ----------------------- PRACTICE PASSWORD RESET REQUEST ----------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/practices/requestpasswordreset", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email
	 	})
	});

    const passwordResetStatus = await res.json();
	return passwordResetStatus;
}


export const practicePasswordResetWithKey = async (payload) => {// ----------------------- PRACTICE PASSWORD RESET ----------------

    const res = await fetch(`http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/practices/resetpassword/${payload.key}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			password: payload.password
	 	})
	});

    const passwordResetStatus = await res.json();
	return passwordResetStatus;
}


export const practiceAddStaff = async ({email, designation, token}) => {//----------------------- ADD STAFF ACCOUNT BY PRACTICE ------


	const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/practices/staffs", {
		method: 'POST',
		headers: [['Authorization', token], ["Content-Type", "application/json"] ],
		body: JSON.stringify({
			email,
			designation
	 	})
	});

    const message = await res.json();
	return message;
}








/*------------------------------USER API CALLS --------------------------------------------*/


export const loginStaffUser = async (payload) => {//--------------------------- LOGIN USER -------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/auth/practices/staffs/login", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: payload.email,
			password: payload.password
	 	})
	});

    const user = await res.json();
	return user;
}



export const userPasswordReset = async (email) => {// ----------------------- USER PASSWORD RESET REQUEST ----------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/practices/staffs/requestpasswordreset", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email
	 	})
	});

    const passwordResetStatus = await res.json();
	return passwordResetStatus;
}

export const userPasswordResetWithKey = async (payload) => {// ----------------------- USER PASSWORD RESET ----------------

    const res = await fetch(`http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/practices/staffs/resetpassword/${payload.key}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			password: payload.password
	 	})
	});

    const passwordResetStatus = await res.json();
	return passwordResetStatus;
}


















export const validateRootToken = async (token) => {//--------------------------VALIDATE TOKEN ---------------------

    const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/root/checktoken",
    {
		method: 'GET',
		headers: { 'Authorization': token }
	});

    const user = await res.json();
	return user;
}
