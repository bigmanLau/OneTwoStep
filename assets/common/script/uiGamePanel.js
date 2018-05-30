var mvs = require("Matchvs");
var GLB = require("Glb");
cc.Class({
    extends: require("uiPanel"),

    properties: {
        bgAudio: {
            default: null,
            url: cc.AudioClip
        },
        leadSpFrame: cc.SpriteFrame,
        backWardSpFrame: cc.SpriteFrame,
        stepSpTag: cc.Sprite,
        stepLb: cc.Label,
        stepThreshold: 0
    },

    onLoad() {
        this._super();
        this.bgmId = cc.audioEngine.play(this.bgAudio, true, 1);
        clientEvent.on(clientEvent.eventType.gameOver, this.gameOver, this);
    },

    gameOver() {
        cc.audioEngine.stop(this.bgmId);
    },

    update() {
        if (Game.GameManager.gameState === GameState.Play
            && Game.PlayerManager && Game.PlayerManager.player && Game.PlayerManager.rival) {
            var stepDif = Game.PlayerManager.player.jumpRecordId - Game.PlayerManager.rival.jumpRecordId;
            if (Math.abs(stepDif) > this.stepThreshold) {
                this.stepSpTag.node.active = true;
                if (stepDif < 0) {
                    this.stepSpTag.spriteFrame = this.backWardSpFrame;
                } else {
                    this.stepSpTag.spriteFrame = this.leadSpFrame;
                }
                this.stepLb.string = Math.abs(stepDif);
            } else {
                this.stepSpTag.node.active = false;
            }
        }
    },

    onDestroy() {
        clientEvent.off(clientEvent.eventType.gameOver, this.gameOver, this);
    }

});
