
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

const _routes = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
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
      name: ScreenNameEnum.CHAT_SCREEN,
      Component: ChatList,
      active: icon.messages,
      logo: icon.messages,
      lable: 'Chat'
    },
    {
      name: ScreenNameEnum.PriceGuide,
      Component: PriceGuide,
      active: icon.PriceGuide,
      logo: icon.PriceGuide,
      lable: 'PriceGuide'
    },
    {
      name: ScreenNameEnum.PROFILE_SCREEN,
      Component: Profile,
      active: icon.user,
      logo: icon.user,
      lable: 'Profile'
    },



  ]
  ,


};

export default _routes;
