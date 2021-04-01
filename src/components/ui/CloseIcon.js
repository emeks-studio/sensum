import React from 'react';
import { observer } from "mobx-react";
import { withTheming } from "../../util/theming";
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import Icon from '../../assets/svgs/close.svg'

const CloseIconComponent = ({theming}) => {
  const styles = stylesByTheme[theming.theme.id];
  return (
    <Icon style={styles.closeButton} fill={styles.closeButton.color}/>
  )
}

const stylesByTheme = ThemeSheet.create(theme => ({
  closeButton: {
    color: theme.colorPalette.light,
    height: 32,
    width: 32,
  }
}))

const CloseIcon = withTheming(observer(CloseIconComponent));

// TODO: Export it an used it in other places!
export {
  CloseIcon
}