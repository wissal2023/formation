// pages/Login.jsx
import LoginLayout from "../layouts/LoginLayout";
import QrCode from "../forms/QrCodeDisplay";


const QrCodeVerification = () => {
   return (

      <LoginLayout pageTitle="chang password page">
         <QrCode />
      </LoginLayout>
   );
};

export default QrCodeVerification;