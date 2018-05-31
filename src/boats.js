const SCALE = 60
const NETSCALE = 0.6

export default {
    rowboat:{
        name:"rowboat",
        cost: SCALE * 1,
        net: 1 * NETSCALE,
        },
    canoe:{
        name:"canoe",
        cost: SCALE * 10 * 0.9,
        net: 10 * NETSCALE,
        },
    bassboat:{
        name:"bassboat",
        cost: SCALE * 100 * 0.8,
        net: 100 * NETSCALE,
        },
    yacht:{
        name:"yacht",
        cost: SCALE * 2000 * 0.7,
        net: 2000 * NETSCALE,
        },
   trawler:{
        name:"trawler",
        cost: SCALE * 9000 * 0.6,
        net: 9000 * NETSCALE,
        },
    longliner:{
        name:"longliner",
        cost: SCALE * 2e5 * 0.5,
        net: 2e5 * NETSCALE,
        },
    factoryship:{
        name:"factoryship",
        cost: SCALE * 1e6 * 0.4,
        net: 1e6 * NETSCALE,
        },
}
