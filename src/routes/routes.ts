
import { icon } from "../component/Image";
import TabNavigator from "../navigators/TabNavigator";
import Forgotpassword from "../screen/Auth/ResetOptions ";
import Login from "../screen/Auth/Login";
import ProfileDetails from "../screen/Auth/ProfileDetails";
import SignUp from "../screen/Auth/SignUp";
import Splash from "../screen/Auth/Splash";
import VerifyOtp from "../screen/Auth/VerifyOtp";
import Welcome from "../screen/Auth/Welcome";
import Booking from "../screen/BottamTab/Booking";
import Help from "../screen/BottamTab/Help";
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


  ],





  BOTTOM_TAB: [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component: Home,
      active: icon.home,
      logo: icon.home,
      lable: 'Home'
    },
    // {
    //   name: ScreenNameEnum.BOOKING_SCREEN,
    //   Component: Booking,
    //   active: icon.booking,
    //   logo: icon.booking,
    //   lable: 'Booking'
    // },
    {
      name: ScreenNameEnum.SUPPORT_SCREEN,
      Component: Help,
      active: icon.messages,
      logo: icon.messages,
      lable: 'Chat'
    },
    // {
    //   name: ScreenNameEnum.REWARD_SCREEN,
    //   Component: Reward,
    //   active: icon.reward,
    //   logo: icon.reward,
    //   lable: 'Reward'
    // },
    // {
    //   name: ScreenNameEnum.PROFILE_SCREEN,
    //   Component: Profile,
    //   active: icon.profile,
    //   logo: icon.profile,
    //   lable: 'Profile'
    // },



  ]
  ,


};

export default _routes;
