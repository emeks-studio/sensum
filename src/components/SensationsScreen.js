import React from 'react';
import { observer } from 'mobx-react';
import { View, Linking, StyleSheet } from 'react-native';
import {
  Header,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';
import { ColorPalette } from '../../assets/styles/SensumTheme';
import { withModel } from '../model-components';
import SensationItem from './SensationItem';
import { TopBarTitle } from './ui';

@observer
class SensationsScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.refresh();
  }

  goToHome = () => {
    this.props.navigation.navigate('Home');
  }

  goToLore = () => {
    const url = "https://emeks.gitlab.io/sensum/lore/";
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  refresh = () => {
    console.debug('[SensationsScreen::refresh]');
    this.props.model.Sensations.reset();
    this.props.model.Sensations.getMoreSensations()
  }

  render () {
    return (
      <View style={styles.container} >
        <Header 
          style={styles.header}
          androidStatusBarColor={styles.header.backgroundColor}>
            <Left/>
            <TopBarTitle onPress={this.goToLore} />
            <Right>
              <Button transparent onPress={this.goToHome}>
                <Icon type='FontAwesome' name='times' />
              </Button>
            </Right>
        </Header>
        <SensationItem />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  'container': {
    flex: 1,
    backgroundColor: ColorPalette.dark
  },
  'header': {
    backgroundColor: ColorPalette.dark,
    elevation: 0
  }
});

SensationsScreen.navigationOptions = {
  header: null
};

export default withModel(SensationsScreen);
