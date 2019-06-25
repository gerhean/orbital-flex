const initialAuth = {
	token: '',
  error: "",
  isLoading: false,
  isAuthenticated: false
};

export default initialState = {
  auth: initialAuth,
  user: undefined,
  postedSchedules: [],
  bookedSchedules: [],
  screen: '',
};

const scheduleExample = {
	id: 1, // id in firestore database
	poster: publicUserInfo,
	booker: publicUserInfo,
	location: '',
	time: '',
	price: '',
	services: '',
	remarks: '',
}

const publicUserInfo = {
	uid: 'id',
	name: 'somebody',
	profilePic: 'image.com/image',
	contact: '',
}