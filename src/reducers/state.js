const initialAuth = {
  error: "",
  isLoading: false,
  isAuthenticated: false
};

export default initialState = {
  auth: initialAuth,
  lastUpdateTime: 0,
  screen: 'Login',
  user: undefined,
  bookedSchedules: [],
  postedSchedules: [],
};

const mockUser = {
  username: "test",
  contact: "",
  about: "I'm just a random person",
  profilePic: "https://i.stack.imgur.com/l60Hf.png",
  gender: 0,
  bookedScheduleIds: {},
  postedScheduleIds: {},
};

const scheduleExample = {
	id: 1, // id in firestore database
	poster: publicUserInfo,
	booker: {},
	location: '',
	time: '',
	price: '',
	services: '',
	remarks: '',
  timeCreated: '',
}

const publicUserInfo = {
	uid: 'id',
	name: 'somebody',
	profilePic: 'image.com/image',
	contact: '',
}