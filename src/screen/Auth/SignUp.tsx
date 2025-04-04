import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from '../../component/Icon';
import { icon } from '../../component/Image';
import { Dropdown } from 'react-native-element-dropdown';
import { getcitylist, register } from '../../redux/Api/apiRequests';
import ScreenNameEnum from '../../routes/screenName.enum';

const SignUp: React.FC = ({navigation}) => {
    const [selectedType, setSelectedType] = useState<'Private' | 'Company'>('Private');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        tradeNumber: '',
        accountingEmail: ''
    });

    const [errors, setErrors] = useState<any>({}); // ✅ Store field-level errors
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [CityList, setCityList] = useState([]);



    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setErrors(prev => ({ ...prev, [key]: '' })); // ✅ Clear error on change
    };

    useEffect(() => {
        getListcity()
    }, [])

    const getListcity = async () => {
        const res = await getcitylist()

        if (res.success) {
            setCityList(res?.data)
        }
    }
    const prepareBody = () => {
        const {
            name,
            phone,
            email,
            password,
            confirmPassword,
            city,
            companyName,
            tradeNumber,
            accountingEmail
        } = formData;

        const nameParts = name.trim().split(' ');
        const first_name = nameParts[0];
        const last_name = nameParts.slice(1).join(' ') || '-';

        const body: any = {
            email,
            password,
            password_confirmation: confirmPassword,
            mobile: phone,
            city_id: value,
            phonecode: '91', // You can make it dynamic if needed

        };

        if (selectedType === 'Private') {
            body.first_name = first_name;
            body.last_name = last_name;
            body.trade_number = '';
            body.type = 'User'
        } else {
            body.first_name = companyName;
            body.last_name = companyName; // Optional or use owner name if needed
            body.trade_number = tradeNumber;
            body.email = accountingEmail;
            body.type = 'Company'
        }

        return body;
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (selectedType === 'Private') {
            if (!formData.name) newErrors.name = 'Name is required';
            if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
            if (!formData.city) newErrors.city = 'City is required';
            if (!formData.password || formData.password.length < 6) newErrors.password = 'Min 6 characters';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        } else {
            if (!formData.companyName) newErrors.companyName = 'Company Name is required';
            if (!formData.tradeNumber) newErrors.tradeNumber = 'Trade Number is required';
            if (!formData.accountingEmail || !/\S+@\S+\.\S+/.test(formData.accountingEmail)) newErrors.accountingEmail = 'Valid accounting email is required';
            if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
            if (!formData.city) newErrors.city = 'City is required';
            if (!formData.password || formData.password.length < 6) newErrors.password = 'Min 6 characters';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit =async () => {
        if (validateFields()) {
          
            const apiBody = prepareBody();
            console.log('Sending data to API:', apiBody);

            const res = await register(apiBody)

  if(res?.success){
    navigation.navigate(ScreenNameEnum.BOTTAM_TAB)
  }



        } else {
            Alert.alert('Error', 'Please correct the highlighted errors.');
        }
    };

    const renderError = (field: string) => errors[field] && (
        <Text style={{ color: 'red', fontSize: 12, marginBottom: 5, alignSelf: 'flex-start', marginTop: 10 }}>{errors[field]}</Text>
    );




    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.logo}>LOGO</Text>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Fill your information below or register with your social account</Text>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedType === 'Private' && styles.activeButton]}
                        onPress={() => setSelectedType('Private')}
                    >
                        <Text style={[styles.toggleText, selectedType === 'Private' && styles.activeText]}>Private</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedType === 'Company' && styles.activeButton]}
                        onPress={() => setSelectedType('Company')}
                    >
                        <Text style={[styles.toggleText, selectedType === 'Company' && styles.activeText]}>Company</Text>
                    </TouchableOpacity>
                </View>

                {/* Form Fields */}
                {selectedType === 'Private' ? (
                    <>
                        <Field icon={icon.profile} placeholder="Name" field="name" value={formData.name} onChange={handleInputChange} />
                        {renderError('name')}
                        <Field icon={icon.mobile} placeholder="Phone No." field="phone" value={formData.phone} onChange={handleInputChange} />
                        {renderError('phone')}
                        <Field icon={icon.email} placeholder="Email Address" field="email" value={formData.email} onChange={handleInputChange} />
                        {renderError('email')}

                        <View style={styles.inputContainer}>
                            <Icon source={icon.building4} size={20} style={{ tintColor: 'grey' }} />
                            <Dropdown
                                style={[styles.input, isFocus && { borderColor: 'blue' }]}
                                data={CityList.map(item => ({ ...item, id: String(item.id) }))}
                                search
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={!isFocus ? 'City' : '...'}
                                searchPlaceholder="Search..."
                                value={String(value)} 
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(String(item.id));  // Convert ID to string
                                    setIsFocus(false);
                                    handleInputChange('city', item.name);  // Store city name
                                }}
                            />
                        </View>
                        {renderError('city')}
                        <Field icon={icon.lock} placeholder="Password" field="password" value={formData.password} onChange={handleInputChange} secure />
                        {renderError('password')}
                        <Field icon={icon.lock} placeholder="Confirm Password" field="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} secure />
                        {renderError('confirmPassword')}
                    </>
                ) : (
                    <>
                        <Field icon={icon.profile} placeholder="Company Name" field="companyName" value={formData.companyName} onChange={handleInputChange} />
                        {renderError('companyName')}
                        <Field icon={icon.office} placeholder="Trade Number" field="tradeNumber" value={formData.tradeNumber} onChange={handleInputChange} />
                        {renderError('tradeNumber')}
                        <Field icon={icon.email} placeholder="Accounting Email" field="accountingEmail" value={formData.accountingEmail} onChange={handleInputChange} />
                        {renderError('accountingEmail')}
                        <Field icon={icon.mobile} placeholder="Phone No." field="phone" value={formData.phone} onChange={handleInputChange} />
                        {renderError('phone')}
                        <Field icon={icon.lock} placeholder="Password" field="password" value={formData.password} onChange={handleInputChange} secure />
                        {renderError('password')}
                        <Field icon={icon.lock} placeholder="Confirm Password" field="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} secure />
                        {renderError('confirmPassword')}
                        <View style={styles.inputContainer}>
                            <Icon source={icon.building4} size={20} style={{ tintColor: 'grey' }} />
                            <Dropdown
                                style={[styles.input, isFocus && { borderColor: 'blue' }]}
                                data={CityList.map(item => ({ ...item, id: String(item.id) }))}
                                search
                                maxHeight={300}
                                       labelField="name"
                                valueField="id"
                                placeholder={!isFocus ? 'City' : '...'}
                                searchPlaceholder="Search..."
                                value={String(value)} 
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(String(item.id));  // Convert ID to string
                                    setIsFocus(false);
                                    handleInputChange('city', item.name);  // Store city name
                                }}
                            />
                        </View>
                        {renderError('city')}
                    </>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.loginRedirect}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.loginLink}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ✅ Extract reusable input field
const Field = ({ icon, placeholder, field, value, onChange, secure = false }) => (
    <View style={styles.inputContainer}>
        <Icon source={icon} size={20} style={{ tintColor: 'grey' }} />
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secure}
            value={value}
            onChangeText={(text) => onChange(field, text)}
        />
    </View>
);

const styles = StyleSheet.create({
    // ... (Keep your existing styles as-is)
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 60,
        width: '100%',
        marginTop: 10
    },
    container: { flex: 1, backgroundColor: '#fff' },
    scrollView: { alignItems: 'center', padding: 20 },
    logo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    subtitle: { fontSize: 14, color: '#9DB2BF', textAlign: 'center', marginBottom: 20 },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: 15, borderRadius: 10, padding: 5
    },
    toggleButton: {
        flex: 1, backgroundColor: '#f0f0f0',
        alignItems: 'center', paddingVertical: 10, borderRadius: 30, marginRight: 5
    },
    activeButton: { backgroundColor: '#0063FF' },
    toggleText: { fontSize: 16, color: '#555' },
    activeText: { color: '#fff' },
    input: {
        width: '100%', padding: 12,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#0063FF',
        width: widthPercentageToDP(90),
        padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    loginRedirect: { flexDirection: 'row', marginTop: 15 },
    loginText: { color: '#909090' },
    loginLink: { color: '#0063FF', fontWeight: 'bold' }
});

export default SignUp;


// const styles = StyleSheet.create({
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#F7F8F8',
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         height: 60,
//         width: '100%',
//         marginTop: 10
//     },
//     container: { flex: 1, backgroundColor: '#fff' },
//     scrollView: { alignItems: 'center', padding: 20 },
//     logo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//     title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
//     subtitle: { fontSize: 14, color: '#9DB2BF', textAlign: 'center', marginBottom: 20 },
//     toggleContainer: {
//         flexDirection: 'row',
//         marginBottom: 15, borderRadius: 10, padding: 5
//     },
//     toggleButton: {
//         flex: 1, backgroundColor: '#f0f0f0',
//         alignItems: 'center', paddingVertical: 10, borderRadius: 30, marginRight: 5
//     },
//     activeButton: { backgroundColor: '#0063FF' },
//     toggleText: { fontSize: 16, color: '#555' },
//     activeText: { color: '#fff' },
//     input: {
//         width: '100%', padding: 12,

//         borderRadius: 8,
//     },
//     button: {
//         backgroundColor: '#0063FF',
//         width: widthPercentageToDP(90),
//         padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10
//     },
//     buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//     loginRedirect: { flexDirection: 'row', marginTop: 15 },
//     loginText: { color: '#909090' },
//     loginLink: { color: '#0063FF', fontWeight: 'bold' }
// });

