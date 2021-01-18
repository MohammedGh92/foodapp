import React, {useCallback, useRef} from 'react';
import {AppButton} from '../../common';
import I18n from 'react-native-i18n';
import EvaluationModal from '../EvaluationModal';
const EvalTripBtn = ({trip_id, evaluees}) => {
  const evalationModalRef = useRef();
  const showEvalModal = useCallback(() => evalationModalRef.current.show(), []);

  return (
    <>
      <AppButton
        onPress={showEvalModal}
        stretch
        marginHorizontal={10}
        marginBottom={5}
        title={I18n.t('eva-trip')}
      />
      <EvaluationModal {...{evaluees}} ref={evalationModalRef} {...{trip_id}} />
    </>
  );
};

export default EvalTripBtn;
