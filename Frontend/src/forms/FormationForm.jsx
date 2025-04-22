import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';
import axios from 'axios';
import { STATUS_ENUMS } from "../constants/statusFormation"; 
import { TYPE_FLAGS} from "../constants/typeFlag"; 


// Validation schema
const schema = yup.object({
  titre: yup.string().required("Le titre est requis"),
  thematique: yup.string().required("La thématique est requise"),
  typeFlag: yup.string().oneOf(TYPE_FLAGS, "Type invalide").required("Le type est requis"),
  status: yup.string().oneOf(STATUS_ENUMS, "Statut invalide").required("Le statut est requis"),
  description: yup.string().required("Description requise"),
  duree: yup.number().min(1, "Durée invalide").required("Durée requise"),
  plan: yup.string().required("Plan requis (au format JSON)")
}).required();

const FormationForm = ({ closeModal  }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/formations/AddFormation', {
        formationData: {
          titre: data.titre,
          thematique: data.thematique,
          typeFlag: data.typeFlag,
          status: data.status
        },
        detailsData: {
          description: data.description,
          duree: data.duree,
          plan: JSON.parse(data.plan)
        },
        createEmptyVideo: true
      }, {
        withCredentials: true
      });

      toast.success("Formation créée avec succès!", { position: 'top-center' });
      reset();
      // Close the modal after successful submission
      if (typeof closeModal === 'function') {
        closeModal();
      }

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
          <label htmlFor="typeFlag">Type</label>
          <select {...register("typeFlag")}>
            <option value="">-- Choisir le type --</option>
              {TYPE_FLAGS.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          <p className="form_error">{errors.typeFlag?.message}</p>
        </div>

        {/* Status */}
        <div className="form-grp select">
          <label htmlFor="status">Statut</label>
          <select {...register("status")}>
            <option value="">-- Choisir le statut --</option>
            {STATUS_ENUMS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <p className="form_error">{errors.status?.message}</p>
        </div>

        <hr />

        <h4>Détails de la Formation</h4>

        {/* Description */}
        <div className="form-grp">
          <label htmlFor="description">Description</label>
          <textarea {...register("description")} placeholder="Description de la formation" />
          <p className="form_error">{errors.description?.message}</p>
        </div>

        {/* Durée */}
        <div className="form-grp">
          <label htmlFor="duree">Durée (heures)</label>
          <input type="number" {...register("duree")} placeholder="Durée" />
          <p className="form_error">{errors.duree?.message}</p>
        </div>

        {/* Plan */}
        <div className="form-grp">
          <label htmlFor="plan">Plan (format JSON)</label>
          <textarea {...register("plan")} placeholder={`Ex: {"modules": ["Intro", "Chapitre 1"]}`} />
          <p className="form_error">{errors.plan?.message}</p>
        </div>

        <button type="submit" className="btn btn-two arrow-btn">
          Créer la formation <BtnArrow />
        </button>
      </form>
    </div>
  );
};

export default FormationForm;
