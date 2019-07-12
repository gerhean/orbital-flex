const initialAuth = {
  error: "",
  loading: true,
  isAuthenticated: false
};

export default initialState = () => ({
  auth: initialAuth,
  screen: 'Login',
  screenHistory: ["Home"],
  user: undefined,
  users: {},
  schedules: {},
  bookedSchedules: [],
  postedSchedules: [],
  user_rooms: [],
  current_room: {}
});

const mockUser = {
  username: "test",
  contact: "",
  about: "I'm just a random person",
  profilePic: "https://i.stack.imgur.com/l60Hf.png",
  gender: 0,
  bookedSchedules: {},
  postedSchedules: {},
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
  isBooked: 0, // -1 means posted, 0 means not booked, 1 means booked
}

const publicUserInfo = {
	uid: 'id',
	name: 'somebody',
	profilePic: 'image.com/image',
	contact: '',
}