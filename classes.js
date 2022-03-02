class Skill {
    constructor(startingSpeed) {
        this.level = 0;
        this.exp = 0;
        this.maxexp = 100;
        this.speed = startingSpeed;
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
