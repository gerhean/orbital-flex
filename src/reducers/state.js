const initialAuth = {
  error: "",
  isLoading: false,
  isAuthenticated: false
};

export default initialState = {
  auth: initialAuth,
  initializingApp: true,
  screen: 'Login',
  user: undefined,
  users: {},
  bookedSchedules: [],
  postedSchedules: [],
  editScheduleIndex: -1,
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
	poster: "some uid",
  posterName: "some person",
	bookers: {},
  image: '',
	location: '',
	day: 0,
  timeStart: 0,
  timeEnd: 0,
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