import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm, useFieldArray} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';
import axios from 'axios';


// Validation schema
const schema = yup.object({
  description: yup.string().required("required description"),
  duree: yup.string().required("required duration"),
  plan: yup.array().of(yup.string().required("Empty line in plan")).min(1, "Plan is required"),
}).required();

const FormationDetails= ({ formationId, onNext, onPrev,  }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plan"
  });

  const onSubmit = async (data) => {
    console.log("📤 FormationDetails submission started");
    console.log("🔍 Data to submit:", data);
    console.log("🔗 formationId received from props:", formationId);
  
    if (!formationId) {
      toast.error("❌ Formation ID is missing. Please restart the process.");
      console.error("❌ formationId is null or undefined");
      return;
    }
    
    try {
      const payload = { ...data, formationId };
      console.log("📦 Payload being sent to API:", payload);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/module/addDetail`, payload, {
        withCredentials: true
      });

      console.log("✅ Response from backend:", response.data);

    toast.success("Formation créée avec succès!", { position: 'top-center' });
    
    const createdFormationDetailsId = response.data.formationDetails?.id;
    onNext(createdFormationDetailsId);

  } catch (error) {
    console.error("❌ Axios error:", error.response?.data || error.message);
    toast.error("Erreur lors de la création de la formation", { position: 'top-center' });
  }
};
  

  return (
    <div className="instructor__profile-form-wrap">
      <form onSubmit={handleSubmit(onSubmit)} className="instructor__profile-form">
        
        {/* description */}
        <div className="form-grp ol-md-4">
          <label htmlFor="description">Description</label>
          <textarea type="textArea" {...register("description")} placeholder="Description or obejctive of the formation" />
          <p className="form_error">{errors.description?.message}</p>
        </div>

        {/* duree */}
        <div className="form-grp col-md-2">
          <label htmlFor="duree">duree</label>
          <input type="time" {...register("duree")} placeholder="duration of the formation will take" />
          <p className="form_error">{errors.duree?.message}</p>
        </div>

        {/* plan: a collaction of line */}
        <div className="form-grp">
          <label>Module Plan (each line will be a point)</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center col-md-4">
              <input type="text" {...register(`plan.${index}`)} placeholder={`Plan module  ${index + 1}`}/>
              <button type="button" onClick={() => remove(index)} className="btn btn-small">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => append("")} className="btn btn-small">Add a the chapter of the module</button>
          <p className="form_error">{errors.plan?.message}</p>
        </div>

        <button type="submit" className="btn btn-two arrow-btn">
         Next <BtnArrow />
        </button>
      </form>
    </div>
  );
};

export default FormationDetails;
