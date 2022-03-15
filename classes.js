class Skill {
    constructor(startingSpeed, level = 0, exp = 0, maxexp = 100, bonus = 1) {
        this.level = level;
        this.exp = exp;
        this.maxexp = maxexp;
        this.generationBonus = bonus;
        this.speed = startingSpeed*this.generationBonus*Math.pow(1.05, this.level);
        this.startingSpeed = startingSpeed;
    }

    toJSON() {
        return {
                $type: 'classes.Skill',
                level: this.level,
                exp: this.exp,
                maxexp: this.maxexp,
                generationBonus: this.generationBonus,
                startingSpeed: this.startingSpeed
        };
    }

    static fromJSON(data) {
        return new Skill(data.startingSpeed, data.level, data.exp, data.maxexp,
            data.generationBonus);
    }

    incExp() {
        this.exp += 1;
        if (this.exp >= this.maxexp) {
            var extra = this.exp - this.maxexp;
            while (extra > 0) {
                this.level += 1;
                this.speed = this.speed*1.05;
                this.maxexp = this.maxexp*1.1;
                extra -= this.maxexp;
            }
            this.exp = this.maxexp + extra

        }
    }
}
