import React from 'react';
import FormBuilder from './FormBuilder';
// import { saveTemplate } from '../services/api';
const CreateTemplate = () => (
  <FormBuilder
    onUse={()=>{}}
    // onSave={tpl=>saveTemplate(tpl).then(t=>alert(`Saved ${t.name}`))}
  />
);
export default CreateTemplate;