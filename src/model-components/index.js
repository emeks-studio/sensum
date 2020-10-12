
import React from 'react';
import Oracle from '../model/Oracle';
import Sensations from '../model/Sensations';

const ModelContext = React.createContext({
  Oracle: new Oracle(),
  Sensations: new Sensations()
});

// Hooks version
const useModel = () => React.useContext(ModelContext)

// Wrapper version
const withModel = ComponentToWrap => props => {
  const model = useModel();
  return <ComponentToWrap model={model} {...props} />;
};

export { useModel, withModel };
