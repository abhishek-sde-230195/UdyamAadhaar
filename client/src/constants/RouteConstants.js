export const authRoute = { 
    login: 'auth/Login/',
    signup: 'auth/Register/',
    verifyAccount: '/verifyaccount',
    verificationLink: 'auth/ConfirmEmail?userId={0}&token={1}',
    forgetPassword: 'auth/ForgetPassword?email={0}',
    resetPassword: 'auth/ResetPassword'
};

export const dashboardRoute = '/';

export const fullBackgroundLinks = ['/signin', '/signup', '/verifyaccount', '/forgotpassword', '/resetpassword'];