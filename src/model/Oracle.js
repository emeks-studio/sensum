import AsyncStorage from '@react-native-community/async-storage';
import { observable, computed, action, runInAction } from "mobx";
import SensumApi from '../api/SensumApi';

const totemKeyLabel = '@Oracle:totem';
const chapterStatusKeyLabel = '@Oracle:chapterStatus';
const CHOSEN_ONE_FACE = '◕‿◕';
const ERROR_FACE = 'x . x';

class Oracle {
  @observable totem;
  @observable chapterStatus;
  @observable chapterContent;
  @observable chapterLineIndex = -1;
  @observable chapterLineFace;
  @observable networkFace;
  @observable chosenOneFace;  

  @computed get userIsTheChosenOne() {
    return !!this.totem;
  }
  
  @computed get getFace() {
    if (this.chosenOneFace) {
      return this.chosenOneFace;
    };
    return this.chapterLineFace || this.networkFace || ERROR_FACE;
  }
  
  @computed get getLine() {
    if (this.chosenOneFace) {
      return 'Eres el elegido! utiliza este orbe para comunicarte';
    }
    if (this.chapterContent) {
      if (this.chapterLineIndex >= 0 && this.chapterLineIndex < this.chapterContent.length) {
        return this.chapterContent[this.chapterLineIndex].line;
      } else {
        return null;
      }
    } 
    return 'zzzZZZ...';
  }

  praiseTheSun = () => {
    return SensumApi.oracle.rightInTheFeels()
    .then(result => {
      runInAction(() => {
        this.networkFace = result.mood;
      });
      return result.line;
    });
  }

  @action.bound setTotem(totem) {
    return AsyncStorage.setItem(totemKeyLabel, totem)
    .then(() => {
      runInAction(() => {
        console.debug('[Oracle::setTotem] set totem:', totem);
        this.totem = totem;
        this.chosenOneFace = CHOSEN_ONE_FACE;
      });
      return true;
    });
  }
  
  @action.bound advanceLine() {
    if (!this.chosenOneFace) {
      this.chapterLineIndex = this.chapterLineIndex + 1;
      if (this.chapterContent) {
        this.chapterLineFace =
          this.chapterLineIndex < this.chapterContent.length ? this.chapterContent[this.chapterLineIndex].mood : null;
        if (this.chapterLineIndex == this.chapterContent.length) {
          this.readChapter();
        };
      };
    };
  }
  
  @action.bound readChapter() {
    AsyncStorage.setItem(
      chapterStatusKeyLabel,
      JSON.stringify({
        current: this.chapterStatus.current,
        read: true
      })
    )
    .then(() => {
      runInAction(() => {
        console.debug(`[Oracle::read] chapter was read!`);
        this.chapterStatus = {
          current: this.chapterStatus.current,
          read: true
        }
        this.chapterLineIndex = -1;
      });
    });
  }
  
  @action.bound init() {
    Promise.all([
      AsyncStorage.getItem(totemKeyLabel),
      AsyncStorage.getItem(chapterStatusKeyLabel)
    ])
    .then(([totem, chapterStatus])=> {
      const updatedChapterStatus = chapterStatus ? JSON.parse(chapterStatus) : {
          current: 0,
          read: false
      };
      runInAction(() => {
        this.totem = totem;
        this.chapterStatus = updatedChapterStatus;
      });
      if (updatedChapterStatus.read) {
         return SensumApi.oracle.lorewalker({chapter: updatedChapterStatus.current + 1});
      } else {
         return SensumApi.oracle.lorewalker({chapter: updatedChapterStatus.current}); 
      }
    })
    .then(result => {
      console.debug('[Oracle::init] latest chapter', result.number);
      runInAction(() => {
        if (result.number > this.chapterStatus.current) {
          this.chapterStatus = {
            current: result.number,
            read: false
          };
        }
        this.chapterContent = result.content;
      });
    });
  }
  
  @action.bound newSensation({author, message}) {
    return SensumApi.sensations.newSensation({
      message,
      author, 
      totem: this.totem
    })
    .then(() => {
      return AsyncStorage.removeItem(totemKeyLabel);
    })
    .then(() => {
      runInAction(() => {
        console.debug('[Oracle::newSensation] remove totem');
        this.totem = null;
        this.chosenOneFace = null;
      })
      return true;
    })
  }
}

export default new Oracle();
