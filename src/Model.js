//reference:
// https://www.maa.org/press/periodicals/loci/joma/an-introduction-to-population-ecology-harvesting-a-population-with-logistic-growth


import {gaussianRange} from './rand.js'


// Havesting a population with Logistic Growth
// dPop / time_delta = rate * ( 1 - (population/carrying_capacity)) - harvest


var million = 1000 * 1000
export default class LogisticModel {
    constructor() {
        this.cur_harvest = 0
        this.reproduction = 0.001
        this.carrying_capacity = 100 * million
        this.population = 80 * million
    }

    harvest(strength) {
        var ratio = (this.population / this.carrying_capacity)
        var harvested = strength * ratio * gaussianRange(0, 2)
        console.log(strength, ratio, harvested)
        harvested = Math.round(harvested)
        this.cur_harvest += harvested
        return harvested
    }

    tick() {
        var ratio = (this.population / this.carrying_capacity)
        // todo add variance
        var potential_reproduction = this.population * this.reproduction
        var dPop = potential_reproduction * (1 - ratio) - this.cur_harvest
        this.population = (this.population + dPop)
        this.cur_harvest = 0
    }
}
