const Stats = require('./stats.js');
class PUBGProfile {
  constructor(content) {
    this.avatar = content.avatar;
    this.name = content.nickname;
    this.lastUpdated = content.lastUpdated;
    //this.stats = content.stats.map(stats => new PUBGProfileStats(stats));
  }
}
module.exports = PUBGProfile;
