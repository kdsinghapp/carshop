// Defining endpoints
export const endpoint = {
  cities: '/cities/get-cities-by-country?country_id=101',
  register: '/register',
  login: '/login',
  sendotp: '/email/send-otp?email=',
  verifyotp: "/email/verify-otp?",
  setpassword: '/set-password',
  dashboard: '/get-home-api?',
  getuser: '/user/get-user-details?',
  getservicesbycategoryid: '/get-services-by-car-services-category-id?car_service_category_id=',
  getneaybycarservicestore: '/get-near-by-car-service-stores?',
  getcarservicestoreid: '/get-near-by-car-service-stores-by-id?car_service_store_id=',
  addstorereview: '/review/add-review',
  updatestorereview: '/review/update-review',
  deletereview: '/review/delete-review?',
  listaddress: '/address/list-address?user_id=',
  addaddress: '/address/add-address?',
  deleteaddress: '/address/delete-address?',
  updateaddress: '/address/update-address?',
  getbookmarkslist: '/bookmark/get-bookmarks-by-user-id?',
removebookmark: '/bookmark/delete-bookmark?',
addbookmark: '/bookmark/add-bookmark?',
chatuserlist:'/common/chat/get-chat-user-list?user_id=',
getuserchat:'/common/chat/chat-list?',
sendchatmessage:'/common/chat/send-message',


};
