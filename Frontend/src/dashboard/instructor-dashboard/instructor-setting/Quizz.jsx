import { useState } from 'react';
import MatchForm from './MatchForm';
import ReorganizeForm from './ReorganizeForm';
import MultipleChoiceForm from './MultipleChoiceForm';
import SingleChoiceForm from './SingleChoiceForm';
import { OPTION_TYPE } from '../../../constants/optionType';

// Helper to display user-friendly labels
const getLabelFromType = (type) => {
  switch (type) {
    case 'Multiple_choice':
      return 'Choix multiple';
    case 'single_choice':
      return 'Choix unique';
    case 'match':
      return 'Appariement';
    case 'reorganize':
      return 'Réorganiser';
    case 'drag_drop':
      return 'Glisser-déposer';
    default:
      return type;
  }
};

const Quizz = ({ formationDetailsId, onPrev, onNext }) => {
  const [optionType, setOptionType] = useState('Multiple_choice');
  const [tentatives, setTentatives] = useState(1);
  const [difficulty, setDifficulty] = useState('Facile');

  const renderQuestionForm = () => {
    switch (optionType) {
      case 'Multiple_choice':
        return <MultipleChoiceForm />;
      case 'Single_choice':
        return <SingleChoiceForm />;
      case 'match':
        return <MatchForm />;
      case 'reorganize':
        return <ReorganizeForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
       
        <div className="mt-4">{renderQuestionForm()}</div>

        <div className="mt-4">
          <button onClick={onPrev} className="btn btn-secondary">
            Précédent
          </button>
        </div>
         <form className="customer__form-wrap">
          <span className="title">create question</span>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-grp">
                <label>Nombre de tentatives autorisées</label>
                <input type="number" min="1" value={tentatives}
                  onChange={(e) => setTentatives(parseInt(e.target.value))}/>
              </div>
            </div>
            


          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-grp">
                <label>Type de question</label>
                <select value={optionType} onChange={(e) => setOptionType(e.target.value)}>
                  {OPTION_TYPE.map((type) => (
                    <option key={type} value={type}>
                      {getLabelFromType(type)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-grp">
                <label>Difficulté</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="Facile">Facile</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Difficile">Difficile</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-grp">
            {renderQuestionForm()}
          </div>
          <div className="form-grp select-grp">
            <label htmlFor="country-name">Country / Region *</label>
            <select id="country-name" name="country-name" className="country-name">
              <option value="United Kingdom (UK)">United Kingdom (UK)</option>
              <option value="United States (US)">United States (US)</option>
              <option value="Turkey">Turkey</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Portugal">Portugal</option>
            </select>
          </div>
          <div className="form-grp">
            <label htmlFor="street-address">Street address *</label>
            <input type="text" id="street-address" placeholder="House number and street name" />
          </div>
          <div className="form-grp">
            <input type="text" id="street-address-two" placeholder="Apartment, suite, unit, etc. (optional)" />
          </div>
          <div className="form-grp">
            <label htmlFor="town-name">Town / City *</label>
            <input type="text" id="town-name" />
          </div>
          <div className="form-grp select-grp">
            <label htmlFor="district-name">District *</label>
            <select id="district-name" name="district-name" className="district-name">
              <option value="Alabama">Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="California">California</option>
              <option value="New York">New York</option>
            </select>
          </div>
          <div className="form-grp">
            <label htmlFor="zip-code">ZIP Code *</label>
            <input type="text" id="zip-code" />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="phone">Phone *</label>
                <input type="number" id="phone" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="email">Email address *</label>
                <input type="email" id="email" />
              </div>
            </div>
          </div>
          <span className="title title-two">Additional Information</span>
          <div className="form-grp">
            <label htmlFor="note">Order notes (optional)</label>
            <textarea id="note" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
          </div>
        </form>
      </div>
    </>
  );
};

export default Quizz;
