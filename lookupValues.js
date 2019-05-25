const values = [
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
const lookup = new Lookup({ type: 'bachelors', values: values });
lookup.save();

const values = [
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
const lookup = new Lookup({ type: 'phd', values: values });
lookup.save();