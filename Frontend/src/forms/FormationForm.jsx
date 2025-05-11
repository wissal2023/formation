import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';
import axios from 'axios';
import { TYPE_FLAGS} from "../constants/typeFlag"; 
import './style.css';

// Validation schema
const schema = yup.object({
  titre: yup.string().required("Le titre est requis"),
  thematique: yup.string().required("La thématique est requise"),
  typeFlag: yup.string().oneOf(TYPE_FLAGS, "Type invalide").required("Le type est requis"),
}).required();

const FormationForm = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/formations/AddFormation`, {
          titre: data.titre,
          thematique: data.thematique,
          typeFlag: data.typeFlag
      }, {
        withCredentials: true
      });
  
      const formationId = response.data.formation.id;
      toast.success("Formation créée avec succès!", { position: 'top-center' });
      onNext(formationId); // <-- we'll pass this callback from Stepper
      //reset();
      
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de la formation", { position: 'top-center' });
    }
  };
  

  return (
    <div className="instructor__profile-form-wrap">
      <form onSubmit={handleSubmit(onSubmit)} className="instructor__profile-form">
        
        {/* Titre */}
        <div className="form-grp">
          <label htmlFor="titre">Titre</label>
          <input type="text" {...register("titre")} placeholder="Titre de la formation" />
          <p className="form_error">{errors.titre?.message}</p>
        </div>

        {/* Thematique */}
        <div className="form-grp">
          <label htmlFor="thematique">Thématique</label>
          <input type="text" {...register("thematique")} placeholder="Thématique" />
          <p className="form_error">{errors.thematique?.message}</p>
        </div>

        {/* TypeFlag */}
        <div className="form-grp select">
          <label htmlFor="typeFlag">Type de formation</label>
          <select {...register("typeFlag")}>
            <option value="">-- Choisir le type --</option>
              {TYPE_FLAGS.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          <p className="form_error">{errors.typeFlag?.message}</p>
        </div>
        <button type="submit" className="pill-button">
         Next <BtnArrow />
        </button>
      </form>
    </div>
  );
};

export default FormationForm;
