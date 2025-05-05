import Stepper from "../dashboard/instructor-dashboard/instructor-setting/stepper";
import DashboardLayout from "../layouts/DashboardLayout";
import { useParams  } from "react-router-dom";


const AddFormation = () => {
     
      const { id } = useParams(); 

   return (
      <DashboardLayout pageTitle="ADD formation">
         <Stepper userId={id} style={true}  />
      </DashboardLayout>

   );
};

export default AddFormation;