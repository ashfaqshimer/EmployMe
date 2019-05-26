const generateLookup = () =>{

	
	//============================BACHELORS==============================
	let values = [
		{ value: 'Business', label: 'Business' },
		{ value: 'Health', label: 'Health professions and related programs' },
		{ value: 'Social Sciences', label: 'Social sciences and history' },
		{ value: 'Psychology', label: 'Psychology' },
		{ value: 'Biology', label: 'Biological and biomedical sciences' },
		{ value: 'Engineering', label: 'Engineering' },
		{ value: 'Performing Arts', label: 'Visual and performing arts' },
		{ value: 'Education', label: 'Education' },
		{ value: 'Communication', label: 'Communication, journalism, and related programs' },
		{ value: 'HomelandSecurity', label: 'Homeland security, law enforcement, and firefighting' },
		{ value: 'IT', label: 'Computer and information sciences' }
	];
	const bachelorsLookup = new Lookup({ type: 'bachelors', values: values });
	bachelorsLookup.save();
	
	//=====================PHD================================
	
	values = [
		{ value: 'Business', label: 'Business' },
		{ value: 'Health', label: 'Health professions and related programs' },
		{ value: 'Social Sciences', label: 'Social sciences and history' },
		{ value: 'Psychology', label: 'Psychology' },
		{ value: 'Biology', label: 'Biological and biomedical sciences' },
		{ value: 'Engineering', label: 'Engineering' },
		{ value: 'Performing Arts', label: 'Visual and performing arts' },
		{ value: 'Education', label: 'Education' },
		{ value: 'Communication', label: 'Communication, journalism, and related programs' },
		{ value: 'HomelandSecurity', label: 'Homeland security, law enforcement, and firefighting' },
		{ value: 'IT', label: 'Computer and information sciences' }
	];
	const phdLookup = new Lookup({ type: 'phd', values: values });
	phdLookup.save();
	
	//=========================MASTERS===================================
	
	values = [
		{ value: 'Business', label: 'Business' },
		{ value: 'Health', label: 'Health professions and related programs' },
		{ value: 'Social Sciences', label: 'Social sciences and history' },
		{ value: 'Psychology', label: 'Psychology' },
		{ value: 'Biology', label: 'Biological and biomedical sciences' },
		{ value: 'Engineering', label: 'Engineering' },
		{ value: 'Performing Arts', label: 'Visual and performing arts' },
		{ value: 'Education', label: 'Education' },
		{ value: 'Communication', label: 'Communication, journalism, and related programs' },
		{ value: 'HomelandSecurity', label: 'Homeland security, law enforcement, and firefighting' },
		{ value: 'IT', label: 'Computer and information sciences' }
	];
	const mastersLookup = new Lookup({ type: 'masters', values: values });
	mastersLookup.save();
	
	//=============================JOB SECTOR====================
	values = [
		{ value: 'Accountancy', label: 'Accountancy' },
		{ value: 'Business', label: 'Business' },
		{ value: 'Charity', label: 'Charity' },
		{ value: 'Arts', label: 'Creative arts and design.' },
		{ value: 'Energy', label: 'Energy and utilities.' },
		{ value: 'Engineering', label: 'Engineering and manufacturing.' },
		{ value: 'Environment', label: 'Environment and agriculture.' },
		{ value: 'Healthcare', label: 'Healthcare' },
		{ value: 'IT', label: 'Information Technology.' },
	];
	const jobSectorLookup = new Lookup({ type: 'jobSector', values: values });
	jobSectorLookup.save();
	
	//==========================EDUCATION LEVEL====================
	
	values = [
		{ value: '1', label: 'Junior School' },
		{ value: '2', label: 'High School' },
		{ value: '3', label: 'Diploma' },
		{ value: '4', label: 'Undergratuate Degree' },
		{ value: '5', label: 'Masters' },
		{ value: '6', label: 'Ph.D' },
	];
	const ecuationLookup = new Lookup({ type: 'educationLevel', values: values });
	ecuationLookup.save();
	
	//=========================ALSTREAM==========================
	values = [
		{ value: 'Science', label: 'Science' },
		{ value: 'Commerce', label: 'Commerce' },
		{ value: 'Arts', label: 'Arts' },
	];
	const alStreamLookup = new Lookup({ type: 'alStream', values: values });
	alStreamLookup.save();
	
	
	//===============================DIPLOMA======================
	
	values = [
		{ value: 'Business', label: 'Business Studies' },
		{ value: 'Management', label: 'Management Studies' },
		{ value: 'Tech', label: 'Technology Studies' },
		{ value: 'Design', label: 'Design Studies' },
		{ value: 'Economics', label: 'Economic Studies' },
		{ value: 'Tourism', label: 'Tourism and Hospitality ' },
		{ value: 'Arts', label: 'Art Studies' },
		{ value: 'Food', label: 'Food and Beverage Studies' },
		{ value: 'ComputerSc', label: 'Computer Science' },
		{ value: 'Entrepreneurship', label: 'Entrepreneurship' },
		{ value: 'Engineering', label: 'Engineering Studies' },
		{ value: 'Journalism', label: 'Journalism and Mass Communication' },
		{ value: 'Administration', label: 'Administration Studies' },
		{ value: 'Marketing', label: 'Marketing Studies' },
	];
	const diplomaLookup = new Lookup({ type: 'diploma', values: values });
	diplomaLookup.save();
	
	//=======================PROFESSIONAL QUALIFICATIONS===================
	
	values = [
		{ value: 'ACCA', label: 'Association of Chartered Certified Accountants (ACCA)' },
		{ value: 'BCS', label: 'BCS - The Chartered Institute for IT' },
		{ value: 'CIPD', label: 'Chartered Institute of Personnel and Development (CIPD)' },
		{ value: 'ICE', label: 'Institution of Civil Engineers (ICE)' },
		{ value: 'RICS', label: 'Royal Institution of Chartered Surveyors (RICS).' },
		
	];
	const proffesionalLookup = new Lookup({ type: 'professional', values: values });
	professionalLookup.save();
}
	
module.exports = generateLookup;	
	