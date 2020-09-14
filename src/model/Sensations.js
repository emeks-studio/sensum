import { observable, computed, action, runInAction } from "mobx";
import User from './User';
import SensumApi from '../api/SensumApi';

class Sensations {
  @observable loading;
  @observable error;
  @observable isEndReached;
  
  limit;
  @observable offset;
  @observable currentIndex;

  @observable sensations;
  // This is because mobx observable arrays doesn't have "concat" method.
  plainSensations;

  @action.bound
  reset() {
    this.loading = true;
    this.error = false;
    this.isEndReached = false;
    this.sensations = [];
    this.plainSensations = [];
    this.limit = 50;
    this.offset = 0;
    this.currentIndex = 0;
  }

  @action.bound
  getMoreSensations() {
    this.loading = true;
    this.error = false;
    return SensumApi.sensations.getSensations({
      offset: this.offset,
      limit: this.limit
    })
    .then((newSensations) => {
      this.plainSensations = this.plainSensations.concat(newSensations);
      return runInAction(() => {
        this.sensations = this.plainSensations;
        if (newSensations.length < this.limit) {
          this.isEndReached = true;
        }
        this.offset = this.offset + newSensations.length;
        this.loading = false;  
      })
    })
    .catch(() => {
       return runInAction(() => {
        this.loading = false;
        this.error = true;
      })
    })
  }
  
  @action.bound
  next() {
    const nextIndex = this.currentIndex + 1;
    const totalIndex = this.offset;
    if (nextIndex === totalIndex) {
      this.getMoreSensations();
    }
    this.currentIndex = nextIndex;
  }
  
  @action.bound
  back() {
    const backIndex = this.currentIndex - 1;
    if (backIndex >= 0) {
      this.currentIndex = backIndex;
    }
  }

  vote = (sensation, vote) => {
    return SensumApi.sensations.chargeSensation({
      pushNotificationId: User.id,
      sensationId: sensation.id,
      vote,
    })
    .then( ({validVote}) => {
      const sensationUpdate = this.sensations.find(s => (s.id == sensation.id));
      if(validVote){
        runInAction( () => {
          if(vote) sensationUpdate.likes++;
          else sensationUpdate.dislikes++;
        });
      }
      return validVote;
    })
  }

  constructor() {
    this.reset();
  }
  
  @computed get current() {
    return this.sensations[this.currentIndex];
  }
  
  @computed get length() {
    this.sensations.length;
  }

  @computed get id() {
    return this.sensations;
  }
}

export default new Sensations();
