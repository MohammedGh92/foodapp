import React, {useState, useCallback} from 'react';
import {AppView, AppText, AppSpinner, AppTextArea} from '../../common';
import I18n from 'react-native-i18n';
import MultipleImagesPicker from '../../common/multipleImagesPicker';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Form = ({injectFormProps, initialValue, isSubmitting, handleSubmit}) => {
  return (
    <AppView spaceBetween flex stretch>
      <AppTextArea
        {...injectFormProps('body')}
        placeholder={I18n.t('add-post-desc')}
        backgroundColor="#ECEFF063"
        borderWidth={0}
        height={80}
        stretch
      />

      <AppView
        center
        paddingHorizontal={9}
        height={10}
        backgroundColor="white"
        stretch
        row>
        <MultipleImagesPicker
          {...injectFormProps('images')}
          initialValue={initialValue}
        />
        <TouchableOpacity onPress={handleSubmit}>
          {isSubmitting ? (
            <AppSpinner color="primary" />
          ) : (
            <AppText size={8} color="primary">
              {I18n.t('publish')}
            </AppText>
          )}
        </TouchableOpacity>
      </AppView>
    </AppView>
  );
};

export default Form;
