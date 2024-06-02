export class Player {
    public name: string;
    public difficulty: string;
    public score: number;
    constructor(name: string,difficulty:string,score:number) {
        this.name = name;
        this.difficulty = difficulty;
        this.score = score;
    }
    
    // get getName():string {
    //     return this.name;
    // }
    // get getDifficulty():number {
    //     return this.difficulty;
    // }
    // get getScore():number {
    //     return this.score;
    // }
    
    // set setName(name: string) {
    //     this.name = name;
    // }
    // set setDifficulty(difficulty: number) {
    //     this.difficulty = difficulty;
    // }
    // set setScore(score: number) {
    //     this.score = score;
    // }
}