function getSkillList() {
    var globalSkills = [];
    
    globalSkills["Attack"] = new Skill({
        name: "Attack",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:4,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.opponentId].damage(10);
        },
        arrowColor: "red",
        iconFill: {image: images["attack"]},
        extraHitDelay: 0,
        cooldown: 500,
    });

    globalSkills["Block"] = new Skill({
        name: "Block",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:6,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            caster.block();
        },
        extraHitDelay: 0,
        arrowColor: "yellow",
        iconFill: {image: images["defend"]},
        cooldown: 1000,
    });

    globalSkills["Heal"] = new Skill({
        name: "Heal",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:4,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.id].heal(10);
        },
        arrowColor: "white",
        iconFill: {image: images["heal"]},
        extraHitDelay: 0,
        cooldown: 500,
    });

    globalSkills["DoT"] = new Skill({
        name: "DoT",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:6,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.opponentId].dot(20, 10000, 10);
        },
        arrowColor: "green",
        iconFill: {image: images["dot"]},
        extraHitDelay: 0,
        cooldown: 1500,
    });

    globalSkills["HoT"] = new Skill({
        name: "HoT",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:6,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.id].hot(20, 5000, 5);
        },
        arrowColor: "magenta",
        iconFill: "white", //{image: images["hot"]},
        extraHitDelay: 0,
        cooldown: 1000,
    });

    globalSkills["QuickAttack"] = new Skill({
        name: "QuickAttack",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:2,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.opponentId].dot(5, 5000,5);
        },
        arrowColor: "blue",
        iconFill: "blue", //{image: images["attack"]},
        extraHitDelay: 0,
        cooldown: 300,
    });
    
    this.globalSkills = globalSkills;

    this.keys = []
    for (var x in globalSkills) {
        this.keys.push(x);
    }

    this.getRandom = function() {
        var rand = Math.floor(Math.random() * this.keys.length);
        return this.globalSkills[this.keys[rand]];
    }
}




function Skill(config) {
    var suffix = range(0,4);
    

    this.generateSequence = function(player, seqLength, difficulty) {

        if (!seqLength) seqLength = config.sequenceLength;
        if (!difficulty) difficulty = config.sequenceDifficulty;
        
        var seq = [];
        for (var i = 0; i < seqLength; i++) {
            seq[i] = suffix.splice(Math.floor(Math.random()*suffix.length), 1);
                if (suffix.length == 0) {
                    suffix = range(0, 4);
                }
        }

        // generates a sequence
        return seq;
    }

    this.hitDelay = 1000 / PLAYER_SPRITE_FPS * PlayerSpriteAnimations["attack"].length +
            config.extraHitDelay;
    this.arrowColor = config.arrowColor;
    this.iconFill = config.iconFill;
    this.activate = config.activate;
    this.animate = config.animate;
    this.cooldown = config.cooldown;
}
