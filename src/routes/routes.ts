
import images, { icon } from "../component/Image";
import TabNavigator from "../navigators/TabNavigator";
import Forgotpassword from "../screen/Auth/ResetOptions ";
import Login from "../screen/Auth/Login";
import ProfileDetails from "../screen/Auth/ProfileDetails";
import SignUp from "../screen/Auth/SignUp";
import Splash from "../screen/Auth/Splash";
import VerifyOtp from "../screen/Auth/VerifyOtp";
import Welcome from "../screen/Auth/Welcome";
import Booking from "../screen/BottamTab/Booking";
import Help from "../screen/BottamTab/ChatScreen";
import Home from "../screen/BottamTab/Home";
import Profile from "../screen/BottamTab/Profile";
import Reward from "../screen/BottamTab/Reward";
import ScreenNameEnum from "./screenName.enum";
import ResetOptions from "../screen/Auth/ResetOptions ";
import CreatePassword from "../screen/Auth/CreatePassword";
import LocationAccessScreen from "../screen/Auth/LocationAccessScreen";
import LocationPicker from "../screen/Auth/LocationPicker";
import AllServices from "../screen/Feature/AllServices";
import NearByShops from "../screen/Feature/NearByShops";
import GarageDetails from "../screen/Feature/GarageDetails";
import CarBodyTypeScreen from "../screen/Feature/CarBodyTypeScreen";
import AddVehicleScreen from "../screen/Feature/AddVehicleScreen";
import CarList from "../screen/Feature/CarList";
import BookServiceScreen from "../screen/Feature/BookServiceScreen";
import PickUpAddress from "../screen/Feature/PickUpAddress";
import PaymentMethod from "../screen/Feature/PaymentMethod";
import PaymentSummary from "../screen/Feature/PaymentSummary";
import Congratulation from "../screen/Feature/Congratulation";
import FilterScreen from "../screen/Feature/FilterScreen";
import Explore from "../screen/BottamTab/Explore";
import Bookmark from "../screen/BottamTab/Bookmark";
import ChatList from "../screen/BottamTab/ChatList";
import ChatScreen from "../screen/BottamTab/ChatScreen";
import PriceGuide from "../screen/BottamTab/PriceGuide";
import BookingList from "../component/BookingList";
import MyBookings from "../screen/profile/MyBookings";
import BookingDetails from "../screen/Feature/BookingDetails";
import LeaveReview from "../screen/Feature/LeaveReview";
import HelpCenter from "../screen/profile/HelpCenter";
import Wallet from "../screen/profile/Wallet";
import EditProfile from "../screen/profile/EditProfile";
import ManageAddress from "../screen/profile/ManageAddress";
import ChangePassword from "../screen/profile/ChangePassword";
import PaymentMethods from "../screen/profile/PaymentMethods";
import Privacy from "../screen/profile/Privacy";
import LoginOption from "../screen/Auth/LoginOption";
import CompanyLogin from "../screen/Auth/CompanyLogin";
import CompanyHome from "../screen/company/CompanyHome";
import JobDetailsScreen from "../screen/company/JobDetailsScreen";
import NotificationScreen from "../screen/company/NotificationScreen";
import CompanyProfile from "../screen/company/CompanyProfile";
import ProfileScreen from "../screen/company/ProfileScreen";
import NotificationSetting from "../screen/company/NotificationSetting";
import SupportScreen from "../screen/company/SupportScreen";
import Aboutus from "../screen/company/Aboutus";
import AdminDashboard from "../screen/profile/AdminDashboard";
import OvertimeHours from "../screen/Feature/OvertimeHours";
import OvertimeEmploye from "../screen/Feature/OvertimeEmploye";
import EmployeeTasks from "../screen/Feature/EmployeeTasks";
import TotallyTask from "../screen/Feature/TotallyTask";
import AdminProjects from "../screen/Feature/AdminProjects";
import HRMenu from "../screen/Feature/HRMenu";
import EmployeeList from "../screen/Feature/hr/EmployeeList";
import EmployeeProfile from "../screen/Feature/hr/EmployeeProfile";
import AddEmployeeForm from "../screen/Feature/hr/AddEmployeeForm";
import EmployeeGrid from "../screen/Feature/hr/EmployeeGrid";
import HrProjects from "../screen/Feature/hr/HrProjects";
import AddProjectForm from "../screen/Feature/hr/AddProjectForm";
import HrTask from "../screen/Feature/hr/HrTask";
import AddTaskForm from "../screen/Feature/hr/AddTaskForm";
import EmployeeAttendance from "../screen/Feature/hr/EmployeeAttendance";
import HrLeave from "../screen/Feature/hr/HrLeave";
import AddLeaveScreen from "../screen/Feature/hr/AddLeaveScreen";
import ShirftSchedule from "../screen/Feature/hr/ShirftSchedule";
import AddNewShiftScreen from "../screen/Feature/hr/AddNewShiftScreen";
import OverTime from "../screen/Feature/hr/OverTime";
import AddOvertimeScreen from "../screen/Feature/hr/AddOvertimeScreen";
import HolidayListScreen from "../screen/Feature/hr/HolidayListScreen";
import AddHolidayForm from "../screen/Feature/hr/AddHolidayForm";
import RequestLeave from "../screen/Feature/hr/RequestLeave";
import AddLeaveRequestForm from "../screen/Feature/hr/AddLeaveRequestForm";
import SelectLocation from "../component/SelectLocation";

const _routes = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
    {
      name: ScreenNameEnum.LoginOption,
      Component: LoginOption,
    },
    {
      name: ScreenNameEnum.WELCOME_SCREEN,
      Component: Welcome,
    },
    {
      name: ScreenNameEnum.LOGIN_SCREEN,
      Component: Login,
    },
    {
      name: ScreenNameEnum.COMPANY_LOGIN,
      Component: CompanyLogin,
    },
    {
      name: ScreenNameEnum.SIGNUP_SCREEN,
      Component: SignUp,
    },
    {
      name: ScreenNameEnum.OTP_SCREEN,
      Component: VerifyOtp,
    },
    {
      name: ScreenNameEnum.FORGOT_PASSWORD,
      Component: ResetOptions,
    },
    {
      name: ScreenNameEnum.CREATE_PASSWORD,
      Component: CreatePassword,
    },
    {
      name: ScreenNameEnum.LocationAccessScreen,
      Component: LocationAccessScreen,
    },
    {
      name: ScreenNameEnum.LocationPicker,
      Component: LocationPicker,
    },
    {
      name: ScreenNameEnum.BOTTAM_TAB,
      Component: TabNavigator,
    },
    {
      name: ScreenNameEnum.ALL_SERVICES,
      Component: AllServices,
    },
    {
      name: ScreenNameEnum.NEARBY_SHOPS,
      Component: NearByShops,
    },
    {
      name: ScreenNameEnum.GARAGE_DETAILS,
      Component: GarageDetails,
    },
    {
      name: ScreenNameEnum.CarBodyTypeScreen,
      Component: CarBodyTypeScreen,
    },
    {
      name: ScreenNameEnum.AddVehicleScreen,
      Component: AddVehicleScreen,
    },
    {
      name: ScreenNameEnum.CarList,
      Component: CarList,
    },
    {
      name: ScreenNameEnum.BookServiceScreen,
      Component: BookServiceScreen,
    },
    {
      name: ScreenNameEnum.PickUpAddress,
      Component: PickUpAddress,
    },
    {
      name: ScreenNameEnum.PaymentMethod,
      Component: PaymentMethod,
    },
    {
      name: ScreenNameEnum.PaymentSummary,
      Component: PaymentSummary,
    },
    {
      name: ScreenNameEnum.Congratulation,
      Component: Congratulation,
    },
    {
      name: ScreenNameEnum.FilterScreen,
      Component: FilterScreen,
    },
    {
      name: ScreenNameEnum.ChatScreen,
      Component: ChatScreen,
    },
    {
      name: ScreenNameEnum.MyBookings,
      Component: MyBookings,
    },
    {
      name: ScreenNameEnum.BookingDetails,
      Component: BookingDetails,
    },
    {
      name: ScreenNameEnum.LeaveReview,
      Component: LeaveReview,
    },
    {
      name: ScreenNameEnum.HelpCenter,
      Component: HelpCenter,
    },
    {
      name: ScreenNameEnum.Reward,
      Component: Reward,
    },
    {
      name: ScreenNameEnum.Wallet,
      Component: Wallet,
    },
    {
      name: ScreenNameEnum.EDIT_PROFILE,
      Component: EditProfile,
    },
    {
      name: ScreenNameEnum.ManageAddress,
      Component: ManageAddress,
    },
    {
      name: ScreenNameEnum.CHANGE_PASSWORD,
      Component: ChangePassword,
    },
    {
      name: ScreenNameEnum.PaymentMethods,
      Component: PaymentMethods,
    },
    {
      name: ScreenNameEnum.PRIVACY_POLICY,
      Component: Privacy,
    },
    {
      name: ScreenNameEnum.JobDetailsScreen,
      Component: JobDetailsScreen,
    },
    {
      name: ScreenNameEnum.NotificationScreen,
      Component: NotificationScreen,
    },
    {
      name: ScreenNameEnum.ProfileScreen,
      Component: ProfileScreen,
    },
    {
      name: ScreenNameEnum.NotificationSetting,
      Component: NotificationSetting,
    },
    {
      name: ScreenNameEnum.SupportScreen,
      Component: SupportScreen,
    },
    {
      name: ScreenNameEnum.Aboutus,
      Component: Aboutus,
    },
    {
      name: ScreenNameEnum.AdminDashboard,
      Component: AdminDashboard,
    },
    {
      name: ScreenNameEnum.OvertimeHours,
      Component: OvertimeHours,
    },
    {
      name: ScreenNameEnum.OvertimeEmploye,
      Component: OvertimeEmploye,
    },
    {
      name: ScreenNameEnum.EmployeeTasks,
      Component: EmployeeTasks,
    },
    {
      name: ScreenNameEnum.TotallyTask,
      Component: TotallyTask,
    },

    {
      name: ScreenNameEnum.AdminProjects,
      Component: AdminProjects,
    },
    {
      name: ScreenNameEnum.HRMenu,
      Component: HRMenu,
    },
    {
      name: ScreenNameEnum.EmployeeList,
      Component: EmployeeList,
    },
    {
      name: ScreenNameEnum.EmployeeProfile,
      Component: EmployeeProfile,
    },
    {
      name: ScreenNameEnum.AddEmployeeForm,
      Component: AddEmployeeForm,
    },
    {
      name: ScreenNameEnum.EmployeeGrid,
      Component: EmployeeGrid,
    },
    {
      name: ScreenNameEnum.HrProjects,
      Component: HrProjects,
    },
    {
      name: ScreenNameEnum.AddProjectForm,
      Component: AddProjectForm,
    },
    {
      name: ScreenNameEnum.HrTask,
      Component: HrTask,
    },
    {
      name: ScreenNameEnum.AddTaskForm,
      Component: AddTaskForm,
    },
    {
      name: ScreenNameEnum.EmployeeAttendance,
      Component: EmployeeAttendance,
    },
    {
      name: ScreenNameEnum.HrLeave,
      Component: HrLeave,
    },
    {
      name: ScreenNameEnum.AddLeaveScreen,
      Component: AddLeaveScreen,
    },
    {
      name: ScreenNameEnum.ShirftSchedule,
      Component: ShirftSchedule,
    },
    {
      name: ScreenNameEnum.AddNewShiftScreen,
      Component: AddNewShiftScreen,
    },
    {
      name: ScreenNameEnum.OverTime,
      Component: OverTime,
    },
    {
      name: ScreenNameEnum.AddOvertimeScreen,
      Component: AddOvertimeScreen,
    },
    {
      name: ScreenNameEnum.HolidayListScreen,
      Component: HolidayListScreen,
    },
    {
      name: ScreenNameEnum.AddHolidayForm,
      Component: AddHolidayForm,
    },
    {
      name: ScreenNameEnum.RequestLeave,
      Component: RequestLeave,
    },
    {
      name: ScreenNameEnum.AddLeaveRequestForm,
      Component: AddLeaveRequestForm,
    },

    {
      name: ScreenNameEnum.CHAT_SCREEN,
      Component: ChatList,

    },
    {
      name: ScreenNameEnum.PROFILE_SCREEN,
      Component: Profile,
    },
    {
      name: ScreenNameEnum.SelectLocation,
      Component: SelectLocation,
    },


  ],





  BOTTOM_TAB: [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component: Home,
      active: icon.home,
      logo: icon.home,
      lable: 'Home'
    },
    {
      name: ScreenNameEnum.EXPLORE_SCREEN,
      Component: Explore,
      active: icon.pin,
      logo: icon.pin,
      lable: 'Explore'
    },
 
    {
      name: ScreenNameEnum.BOOKMARK_SCREEN,
      Component: Bookmark,
      active: images.bookmark,
      logo: images.bookmark,
      lable: 'Bookmark'
    },
 
    {
      name: ScreenNameEnum.PriceGuide,
      Component: PriceGuide,
      active: icon.PriceGuide,
      logo: icon.PriceGuide,
      lable: 'PriceGuide'
    },



  ]
  ,

  COMPANY_TAB:[
    {
      name: ScreenNameEnum.COMPANYHOME_SCREEN,
      Component: CompanyHome,
      active: icon.home,
      logo: icon.home,
      lable: 'Home'
    },
    {
      name: ScreenNameEnum.CHAT_SCREEN,
      Component: ChatList,
      active: icon.messages,
      logo: icon.messages,
      lable: 'Chat'
    },
    {
      name: ScreenNameEnum.COMPANYPROFILE_SCREEN,
      Component: CompanyProfile,
      active: icon.user,
      logo: icon.user,
      lable: 'Profile'
    },
  ]


};

export default _routes;
