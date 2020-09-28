import React from "react";
import { observer } from "mobx-react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Text, Container, Content, Spinner } from "native-base";
import GestureRecognizer from "react-native-swipe-gestures";

import { ColorPalette, Typography } from "../../assets/styles/SensumTheme";

import { AnimatedSensation } from "./AnimatedSensation";
import { showToast } from "./ui";
import { calculateMessageText } from "../util/styleHelpers";
import { withModel } from "../model-components";

const SensationItemComponent = ({ model: { Sensations } }) => {
  const vote = function(item, vote) {
    Sensations.vote(item, vote)
      .then(success => {
        let text;
        if (success) text = vote ? "Ionizando [+++]" : "Ionizando [---]";
        else text = "¡Sobrecargas en el núcleo!";
        showToast({ text });
        // Sensations.next();
      })
      .catch(err => {
        console.debug(`[SensationItem::vote] Error: ${err}`);
        showToast({ text: "El Oráculo está ocupado balanceando el núcleo" });
      });
  };

  const renderLoading = () => {
    return (
      <GestureRecognizer style={styles.rootContainer}>
        <Container style={styles.container}>
          <Content bordered style={styles.sensationContent}>
            <View style={styles.singleView}>
              <Spinner style={styles.spinner} color={ColorPalette.light} />
            </View>
          </Content>
          <Container style={styles.authorContainer}>
            <Text adjustsFontSizeToFit numberOfLines={2} style={styles.author}>
              {" "}
              ???{" "}
            </Text>
          </Container>
          <Container style={styles.footerContainer}>
            <Container style={styles.voteLeftContainer}>
              <Button block transparent>
                <Icon
                  type="FontAwesome"
                  name="minus"
                  style={styles.customIcon(ColorPalette.secondary)}
                />
                <Text style={styles.voteCount(ColorPalette.secondary)}>0</Text>
              </Button>
            </Container>
            <Container style={styles.voteRightContainer}>
              <Button block transparent>
                <Icon
                  type="FontAwesome"
                  name="plus"
                  style={styles.customIcon()}
                />
                <Text style={styles.voteCount()}>0</Text>
              </Button>
            </Container>
            <Container style={styles.buttonsSeparatorContainer}></Container>
            <Container style={styles.backButtonContainer}>
              <Button block transparent>
                <Icon
                  type="FontAwesome"
                  name="chevron-left"
                  style={styles.customIcon()}
                />
              </Button>
            </Container>
            <Container style={styles.nextButtonContainer}>
              <Button block transparent>
                <Icon
                  type="FontAwesome"
                  name="chevron-right"
                  style={styles.customIcon()}
                />
              </Button>
            </Container>
          </Container>
        </Container>
      </GestureRecognizer>
    );
  };

  const renderEmpty = () => {
    return (
      <GestureRecognizer
        onSwipeRight={() => Sensations.getMoreSensations()}
        onSwipeLeft={() => Sensations.getMoreSensations()}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 50
        }}
        style={styles.rootContainer}
      >
        <Container style={styles.container}>
          <Content bordered style={styles.sensationContent}>
            <View style={styles.singleView}>
              <Text
                multiline
                textBreakStrategy="balanced"
                allowFontScaling
                includeFontPadding={false}
                maxFontSizeMultiplier={2}
                adjustsFontSizeToFit
                style={styles.message(3)}
              >
                {" "}
                జ్ఞ‌ా
              </Text>
            </View>
          </Content>
          <Container style={styles.authorContainer}>
            <Text adjustsFontSizeToFit numberOfLines={2} style={styles.author}>
              {" "}
              ???{" "}
            </Text>
          </Container>
          <Container style={styles.footerContainer}>
            <Container style={styles.voteLeftContainer}>
              <Button block transparent>
                <Icon
                  type="FontAwesome"
                  name="minus"
                  style={styles.customIcon(ColorPalette.secondary)}
                />
                <Text style={styles.voteCount(ColorPalette.secondary)}>0</Text>
              </Button>
            </Container>
            <Container style={styles.voteRightContainer}>
              <Button block transparent>
                <Icon
                  type="FontAwesome"
                  name="plus"
                  style={styles.customIcon()}
                />
                <Text style={styles.voteCount()}>0</Text>
              </Button>
            </Container>
            <Container style={styles.buttonsSeparatorContainer}></Container>
            <Container style={styles.backButtonContainer}>
              <Button
                block
                transparent
                onPress={() => Sensations.getMoreSensations()}
              >
                <Icon
                  type="FontAwesome"
                  name="chevron-left"
                  style={styles.customIcon()}
                />
              </Button>
            </Container>
            <Container style={styles.nextButtonContainer}>
              <Button
                block
                transparent
                onPress={() => Sensations.getMoreSensations()}
              >
                <Icon
                  type="FontAwesome"
                  name="chevron-right"
                  style={styles.customIcon()}
                />
              </Button>
            </Container>
          </Container>
        </Container>
      </GestureRecognizer>
    );
  };

  const renderSensationItem = () => {
    console.debug(
      Sensations.current.message,
      Sensations.current.message.length
    );
    console.debug(Sensations.current.author, Sensations.current.author.length);
    return (
      <GestureRecognizer
        onSwipeRight={() => Sensations.back()}
        onSwipeLeft={() => Sensations.next()}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 50
        }}
        style={styles.rootContainer}
      >
        <Container style={styles.container}>
          <Content bordered style={styles.sensationContent}>
            <View style={styles.sensationView}>
              {isTrending(Sensations.current) && <AnimatedSensation />}
              {!isTrending(Sensations.current) && (
                <Text
                  multiline
                  textBreakStrategy="balanced"
                  allowFontScaling
                  includeFontPadding={false}
                  maxFontSizeMultiplier={2}
                  adjustsFontSizeToFit
                  style={styles.message(
                    Sensations.current.message.length,
                    shouldBeDenied(Sensations.current),
                    isTrending(Sensations.current)
                  )}
                >
                  {" "}
                  {Sensations.current.message}
                </Text>
              )}
            </View>
          </Content>
          <Container style={styles.authorContainer}>
            <Text adjustsFontSizeToFit numberOfLines={2} style={styles.author}>
              {" "}
              ~ {Sensations.current.author}{" "}
            </Text>
          </Container>
          <Container style={styles.footerContainer}>
            <Container style={styles.voteLeftContainer}>
              <Button
                block
                transparent
                onPress={() => vote(Sensations.current, false)}
              >
                <Icon
                  type="FontAwesome"
                  name="minus"
                  style={styles.customIcon(ColorPalette.secondary)}
                />
                <Text style={styles.voteCount(ColorPalette.secondary)}>
                  {Sensations.current.dislikes}
                </Text>
              </Button>
            </Container>
            <Container style={styles.voteRightContainer}>
              <Button
                block
                transparent
                onPress={() => vote(Sensations.current, true)}
              >
                <Icon
                  type="FontAwesome"
                  name="plus"
                  style={styles.customIcon(ColorPalette.light)}
                />
                <Text style={styles.voteCount(ColorPalette.light)}>
                  {Sensations.current.likes}
                </Text>
              </Button>
            </Container>
            <Container style={styles.buttonsSeparatorContainer}></Container>
            <Container style={styles.backButtonContainer}>
              <Button block transparent onPress={() => Sensations.back()}>
                <Icon
                  type="FontAwesome"
                  name="chevron-left"
                  style={styles.customIcon()}
                />
              </Button>
            </Container>
            <Container style={styles.nextButtonContainer}>
              <Button block transparent onPress={() => Sensations.next()}>
                <Icon
                  type="FontAwesome"
                  name="chevron-right"
                  style={styles.customIcon()}
                />
              </Button>
            </Container>
          </Container>
        </Container>
      </GestureRecognizer>
    );
  };

  if (Sensations.loading) {
    return renderLoading();
  } else {
    if (Sensations.error || Sensations.length === 0) {
      showToast({ text: "😴  El Oráculo duerme un sueño imposible" });
      return renderEmpty();
    }
    return renderSensationItem();
  }
};

function isTrending(sensation) {
  const dislikes = sensation.dislikes === 0 ? 1 : sensation.dislikes;
  return sensation.likes >= dislikes * 5;
}

function shouldBeDenied(sensation) {
  return sensation.dislikes > sensation.likes;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  container: {
    backgroundColor: ColorPalette.dark
  },
  sensationContent: {
    marginTop: "15%",
    flexGrow: 3,
    flexDirection: "column",
    backgroundColor: ColorPalette.dark,
    borderTopColor: ColorPalette.info,
    borderTopWidth: 1,
    borderBottomColor: ColorPalette.info,
    borderBottomWidth: 1
  },
  sensationView: {
    margin: "5%"
  },
  message: (length, denied = false, trending = false) => ({
    marginTop: calculateMessageText(length),
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 23,
    fontFamily: Typography.fontFamilyLight,
    color: denied ? ColorPalette.secondary : ColorPalette.light,
    flexGrow: 1,
    textDecorationLine: denied ? "line-through" : "none"
  }),
  authorContainer: {
    flexGrow: 1,
    margin: "5%",
    backgroundColor: ColorPalette.dark
  },
  author: {
    fontFamily: Typography.fontFamilyLight,
    fontSize: 18,
    color: ColorPalette.light,
    flexGrow: 1,
    textAlign: "right"
  },
  footerContainer: {
    flexGrow: 1,
    alignSelf: "flex-start",
    backgroundColor: ColorPalette.dark,
    flexWrap: "nowrap",
    flexDirection: "row"
  },
  voteLeftContainer: {
    backgroundColor: ColorPalette.dark,
    flexGrow: 1
  },
  voteRightContainer: {
    backgroundColor: ColorPalette.dark,
    flexGrow: 1
  },
  buttonsSeparatorContainer: {
    backgroundColor: ColorPalette.dark,
    flexGrow: 2
  },
  nextButtonContainer: {
    backgroundColor: ColorPalette.dark,
    flexGrow: 1
  },
  backButtonContainer: {
    backgroundColor: ColorPalette.dark,
    flexGrow: 1
  },
  customIcon: (color = ColorPalette.light, size = 18) => ({
    fontSize: size,
    color
  }),
  voteCount: (color = ColorPalette.light, size = 18) => ({
    fontSize: size,
    fontFamily: Typography.fontFamilyBold,
    color,
    paddingRight: "2%",
    paddingLeft: "1%"
  }),
  singleView: {
    margin: "15%"
  },
  spinner: {
    margin: "15%"
  }
});

const SensationItem = withModel(observer(SensationItemComponent));

export { SensationItem };
