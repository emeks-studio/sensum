import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Right,
  Button,
  Left,
} from 'native-base'
import { showToast, TopBarTitle, AnimatedFadeingIcon } from './ui';
import { Tamagochi } from './Tamagochi';
import SensumLogo from '../../assets/img/sensum_logo.svg';
import { 
  ColorPalette,
  Typography
} from '../../assets/styles/SensumTheme';
import Oracle from '../model/Oracle';
import User from '../model/User';

@observer
class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }
  
  constructor(props) {
    super(props);
    Oracle.init();
  }

  goToPulse = () => {
    this.props.navigation.push('Sensations');
  }
  
  goToTransmisionRoom = () => {
    this.props.navigation.push('NewSensation');
  }
  
  showNetwork = () => {
    User.tryGatherAcolytes().then(n => {
      if (n) 
        showToast({text: `${n} electrones en órbita`})
      else 
        showToast({text: `sin conexión`})
    })
  }
  
  render() {
    return (
      <Container>
        <Header 
          style={styles.header}
          androidStatusBarColor={styles.header.backgroundColor}>
            <Left />
            <TopBarTitle  onPress={this.showNetwork} />
            <Right>
              <Button transparent onPress={this.goToPulse}>
                <AnimatedFadeingIcon name="pulse" />     
              </Button>
            </Right>
        </Header>
        <Container style={styles.container}>
         <Tamagochi />
         {Oracle.userIsTheChosenOne &&
           <Button
             style={styles.transmissionButton}
             rounded
             bordered
             onPress={this.goToTransmisionRoom}>
             <SensumLogo />
           </Button>
          }
        </Container>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: ColorPalette.dark,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    elevation: 0
  },
  headerText: {
    color: ColorPalette.light,
    fontFamily: Typography.fontFamilyLight,
    alignSelf: 'flex-end'    
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.dark
  },
  transmissionButton: {
    position: 'relative',
    height: 45  ,
    width: 45,
    marginTop: 20,
    backgroundColor: ColorPalette.dark,
    borderColor: 'transparent',
    alignSelf: 'center',
    left: '15%',
    shadowOpacity: 0.8,
    elevation: 3
  },
  icon: {
    color: ColorPalette.light,
  }
});

export default HomeScreen;
